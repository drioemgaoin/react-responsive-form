import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { isEmpty } from 'lodash';

import FieldComponent from '../FieldComponent';

export default class Input extends FieldComponent {
  onChangeBound = this.onChange.bind(this);

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      isDirty: false
    };
  }

  isValid() {
    return !this.props.isRequired || !this.state.isDirty || !isEmpty(this.state.value);
  }

  getValue() {
    return this.state.value;
  }

  renderEditMode(baseClassName: string) {
      const className = classnames(
          bem(baseClassName, 'Input__Edit', { error: !this.isValid() }),
          this.props.className
      );
      return (
        <input className={className}
              ref={(el) => { this.element = el; }}
              type='text'
              value={this.state.value || ''}
              name={this.name}
              placeholder={this.props.placeholder}
              onChange={this.onChangeBound} />
      );
  }

  renderViewMode(baseClassName: string) {
      return (
          <div className={bem(baseClassName, 'Input__View')}>
              {this.props.value}
          </div>
      );
  }

  onChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const enteredValue = event.currentTarget.value;

    this.setState({ value: enteredValue, isDirty: true });

    if (this.props.isRequired && isEmpty(enteredValue)) {
      event.preventDefault();
      this.setValidationMessage(this.props.label + ' is required');
      return;
    }


    if (this.props.onChange) {
        this.props.onChange(enteredValue);
    }
  }
}
