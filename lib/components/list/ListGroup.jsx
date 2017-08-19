import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find, forEach, includes, filter, isEqual } from 'lodash';

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
                      isSelected: this.isSelected(c.props.value),
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
      let components = getChildren(React.Children.toArray(this.props.children), ListItem);
      components = filter(components, (item, fieldName) => this.isSelected(item.props.value));
      return (
          <ul className={bem(baseClassName, 'list-group') + ' ' + bem('list-group', ['view'])}>
              {components}
          </ul>
      );
  }

  isSelected(value) {
      return this.props.multipleChoices
        ? find(this.state.value, x => isEqual(x, value))
        : isEqual(this.state.value, value);
  }

  onClick(enteredValue) {
      let value = enteredValue;

      if (this.props.multipleChoices) {
          const existing = find(this.state.value, x => isEqual(x, value));
          if (existing) {
            value = filter(this.state.value, x => !isEqual(x, existing));
          } else {
            value = this.state.value.concat([value])
          }
      }

      this.setState({ value });

      if (this.props.onChange) {
          this.props.onChange(value);
      }
  }
}
