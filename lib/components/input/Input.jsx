import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

import './input.scss';

export default class Input extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  static defaultProps = {
    type: 'text',
    value: ''
  };

  renderEditMode(baseClassName) {
      const className = classnames(
          bem(baseClassName, 'input') + ' ' + bem('input', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );

      return (
        <div className={className}>
          {
            React.createElement('input', {
                type: this.props.type,
                name: this.props.name,
                ref: this.props.ref,
                placeholder: this.props.placeholder,
                onChange: this.onChangeBound,
                onBlur: this.onBlurBound,
                value: this.state.value
            })
          }
        </div>
      );
  }

  renderViewMode(baseClassName) {
      return (
          <div className={bem(baseClassName, 'input') + ' ' + bem('input', ['view'])}>
              {this.state.value}
          </div>
      );
  }

  onChange(event) {
    this.change(
        event.currentTarget.value,
        this.props.validationMode === ValidationMode.OnChange
    );
  }

  onBlur(event) {
      this.change(
          event.currentTarget.value,
          this.props.validationMode === ValidationMode.OnBlur
      );
  }

  change(enteredValue, mustValidate) {
      event.preventDefault();

      this.setValidationMessages([]);

      let errors = this.validate(enteredValue);
      if (errors.includes(false)) {
        // Validation returning boolean prevent input
        // -> Not error message displayed
        return;
      }

      if (mustValidate) {
        errors = errors.filter(error => typeof error !== 'boolean');
        if (errors.length > 0) {
            this.setValidationMessages(errors);
        }
      }

      this.setState({ value: enteredValue });

      if (errors.length === 0 && this.props.onChange) {
          this.props.onChange(enteredValue);
      }
  }
}
