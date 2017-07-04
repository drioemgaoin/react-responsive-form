import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find, forEach, includes, filter } from 'lodash';

import ListItem from './ListItem';
import FieldComponent from '../FieldComponent';
import { recursivelyMapChildren, getChildren } from '../util';

import './list-group.scss';

export default class ListGroup extends FieldComponent {
    onClickBound = this.onClick.bind(this);

    isEmpty(value) {
        return !value || +value === 0;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    }

    renderValidationGlyphicon() {
        return null;
    }

    renderEditMode(baseClassName: string) {
        const className = classnames(
            bem(baseClassName , 'list-group') + ' ' + bem('list-group', ['edit', !this.isValid() ? 'error' : '']),
            this.props.className
        );

        const components = React.Children.toArray(this.props.children);
        return (
            <ul className={className}>
                {
                    recursivelyMapChildren(components, (component) => {
                        if (component.type === ListItem) {
                            return {
                                isSelected: this.props.multipleChoices
                                    ? this.state.value.includes(component.props.value)
                                    : component.props.value === this.state.value,
                                onClick: this.onClickBound
                            };
                        }

                        return {};
                    })
                }
            </ul>
        );
    }

    renderViewMode(baseClassName: string) {
        const components = getChildren(React.Children.toArray(this.props.children), ListItem);
        const component = find(components, (item, fieldName) => item.props.value === this.props.value);
        return (
            <div className={bem(baseClassName, 'list-group') + ' ' + bem('list-group', ['view'])}>
                {component}
            </div>
        );
    }

    onClick(event: any) {
        event.preventDefault();

        const enteredValue = event.currentTarget.value;

        let value = enteredValue;
        if (this.props.multipleChoices) {
            if (includes(this.state.value, enteredValue)) {
                value = filter(this.state.value, x => x !== enteredValue);
            } else {
                value = this.state.value.concat([enteredValue])
            }
        }

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
}
