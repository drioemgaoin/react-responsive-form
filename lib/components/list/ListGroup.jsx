import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find, forEach } from 'lodash';

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
      this.renderedComponents = {};

      const className = classnames(
          bem(baseClassName , 'list-group') + ' ' + bem('list-group', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );

      const components = React.Children.toArray(this.props.children);
      return (
        <ul className={className}>
            {
              recursivelyMapChildren(components, (c) => {
                  if (c.type === ListItem) {
                    return {
                      selectedValue: this.state.value,
                      onClick: this.onClickBound,
                      mode: c.props.mode !== undefined ? c.props.mode : this.props.mode,
                      validationMode: c.props.validationMode !== undefined ? c.props.validationMode : this.props.validationMode,
                      ...c.props,
                      ref: (el) => {
                          if (el) {
                              this.renderedComponents[c.props.value] = el;
                          }

                          return c.ref ? c.ref(el) : undefined;
                      }
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

      const enteredValue = event.target.value;

      this.setState({ value: enteredValue });

      if (this.props.onChange) {
          this.props.onChange(enteredValue);
      }
  }
}
