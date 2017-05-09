import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find, forEach } from 'lodash';

import ListItem from './ListItem';
import FieldComponent from '../FieldComponent';
import { recursivelyMapChildren } from '../util';

import './list-group.scss';

export default class ListGroup extends FieldComponent {
  onClickBound = this.onClick.bind(this);

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
                      selected: c.props.value && this.props.value === c.props.value,
                      onClick: this.onClickBound,
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
      const components = React.Children.toArray(this.props.children);
      const component = find(components, (item, fieldName) => item.props.value === this.props.value);
      return (
          <div className={bem(baseClassName, 'list-group') + ' ' + bem('list-group', ['view'])}>
              {component}
          </div>
      );
  }

  onClick(item: any) {
      forEach(this.renderedComponents, (component, fieldName) => {
          if (component.getValue() !== item.getValue()) {
              component.unselect();
          }
      })

      const enteredValue = item.getValue();

      this.setState({ value: enteredValue });

      if (this.props.onChange) {
          this.props.onChange(enteredValue);
      }
  }
}
