import React from 'react';
import classnames from 'classnames';
import bem from 'bem-classname';

import validate from './validations';
import Input from '../input/Input';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

import './input-email.scss';

export default class InputEmail extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  renderViewMode(baseClassName) {
      return (
          <div className={bem(baseClassName, 'input-email') + ' ' + bem('input-email', ['view'])}>
              {this.state.value}
          </div>
      );
  }

  renderEditMode(baseClassName) {
    const className = classnames(
          bem(baseClassName, 'input-email') + ' ' + bem('input-email', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );

      return (
        <div className={className}>
          {
            React.createElement('input', {
                type: 'text',
                name: this.props.name,
                ref: this.props.ref,
                min: this.props.min,
                placeholder: this.props.placeholder,
                onChange: this.onChangeBound,
                onBlur: this.onBlurBound,
                value: this.state.value
            })
          }
        </div>
      );
  }

  onChange(event) {
    this.change(
        event.currentTarget.value,
        this.props.validationMode === ValidationMode.OnChange
    );
  }

  validate(value) {
    let errors = FieldComponent.prototype.validate.call(this, value);
    errors = errors.concat(validate(value));
    return errors;
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
