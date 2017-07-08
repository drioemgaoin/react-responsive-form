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

  renderEditMode(baseClassName) {
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

  renderViewMode(baseClassName) {
      const components = getChildren(React.Children.toArray(this.props.children), ListItem);
      const component = find(components, (item, fieldName) => item.props.value === this.props.value);
      return (
          <div className={bem(baseClassName, 'list-group') + ' ' + bem('list-group', ['view'])}>
              {component}
          </div>
      );
  }

  onClick(event) {
      event.preventDefault();

      const enteredValue = event.currentTarget.value;

      let value = enteredValue;
      if (Array.isArray(this.state.value)) {
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