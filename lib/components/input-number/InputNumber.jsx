import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { assign, isFinite, isEmpty, trim, isNaN } from 'lodash';

import validate from './validations';
import {parse, truncateToDecimalPlaces} from './util';
import {ValidationMode} from '../constants';

import Input from '../input/Input';
import FieldComponent from '../FieldComponent';

import './input-number.scss';

export default class InputNumber extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  static defaultProps = {
    maxDecimalPlaces: 0,
    min: 0,
    value: 0
  };

  constructor(props) {
    super(props, { value: +props.value });
  }

  isEmpty(value) {
    return value === 0;
  }

  renderViewMode(baseClassName) {
      return (
          <div className={bem(baseClassName, 'input-number') + ' ' + bem('input-number', ['view'])}>
              {this.state.value}
          </div>
      );
  }

  renderEditMode(baseClassName) {
    const className = classnames(
          bem(baseClassName, 'input-number') + ' ' + bem('input-number', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );

      return (
        <div className={className}>
          {
            React.createElement('input', {
                type: 'number',
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
