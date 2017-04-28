import React from 'react';
import bem from 'bem-classname';
import { isNaN, isFinite, isEmpty, trim, parseInt } from 'lodash';

import FieldComponent from '../FieldComponent';

export default class InputNumber extends FieldComponent {
  onBlurBound = this.onBlur.bind(this);
  onChangeBound = this.onChange.bind(this);

  constructor(props) {
    super(props, 'Input');

    this.state = {
        value: this.props.value
    };
  }

  isValid() {
    return this.isEmtpy() || this.getParsedState() !== null;
  }

  isEmtpy() {
    return isEmpty(trim(this.state.value));
  }

  renderEditMode() {
      return (
        <input className={this.className({ error: !this.isValid()})}
              ref={(el) => this.element = el}
              type='text'
              value={this.state.value}
              name={this.name}
              placeholder={this.props.placeholder}
              onChange={this.onChangeBound}
              onBlur={this.onBlurBound}
              autoComplete={'off'} />
      );
  }

  renderViewMode() {
      return (
          <div>
              {this.props.value}
          </div>
      );
  }

  getParsedState(): number {
      const value = new Number(this.state.value).valueOf();

      if (!isEmpty(trim(this.state.value)) && !isNaN(value)) {
          if (this.state.value.indexOf(this.numberDecimalPartSeparatorChar) > -1) {
              return parseFloat(this.state.value);
          } else {
              return parseInt(this.state.value);
          }
      }

      return null;
  }

  onChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const enteredValue = event.currentTarget.value;

    if (!this.isValidValueEntered(enteredValue)) {
      event.preventDefault();
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onBlur(event: React.SyntheticEvent<HTMLInputElement>) {
      const parsedState = this.getParsedState();

      if (parsedState !== null) {
          this.setState({ value: parsedState.toString() });
      }
  }

  isValidValueEntered(enteredValue: string) {
    if (this.hasInvalidDecimalSeparator(enteredValue)) {
        return false;
    }

    if (this.hasValidDecimalSeparatorChar(enteredValue)) {
        return true;
    }

    if (this.hasValidNumber(enteredValue)) {
        return true;
    }

    if (this.hasValidEmptyString(enteredValue)) {
        return true;
    }

    if (this.hasValidNegativeSign(enteredValue)) {
        return true;
    }

    return false;
    }

    hasInvalidDecimalSeparator(enteredValue: string) {
      const maxDecimalPlaces = isFinite(this.props.maxDecimalPlaces) ? this.props.maxDecimalPlaces : 0;

      return maxDecimalPlaces === 0 && enteredValue.indexOf(this.numberDecimalPartSeparatorChar) > -1;
    }

    hasValidDecimalSeparatorChar(value: string) {
      const maxDecimalPlaces = isFinite(this.props.maxDecimalPlaces) ? this.props.maxDecimalPlaces : 0;

      if (maxDecimalPlaces > 0 && value === this.numberDecimalPartSeparatorChar) {
          return true;
      }

      return false;
    }

    hasValidNumber(value: string) {
      let enteredNumber = new Number(value).valueOf();

      if (!isNaN(enteredNumber)) {
          return true;
      }

      return false;
    }

    hasValidEmptyString(value: string) {
      return isEmpty(trim(value));
    }

    hasValidNegativeSign(value: string) {
      return !(value !== '-' || (this.props.min !== null && value === '-' && this.props.min >= 0));
    }
}
