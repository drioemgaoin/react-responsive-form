import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find, forEach } from 'lodash';

import FieldComponent from '../FieldComponent';

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
                components.map(c => {
                    return React.createElement(c.type,
                        {
                            key: c.props.name,
                            selected: c.props.value && this.props.value === c.props.value,
                            onClick: this.onClickBound,
                            ...c.props,
                            ref: (el) => {
                                if (el) {
                                    this.renderedComponents[c.props.name] = el;
                                }

                                return c.ref ? c.ref(el) : undefined;
                            }
                        },
                        c.props.children);
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
          if (component.props.name !== item.props.name) {
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
