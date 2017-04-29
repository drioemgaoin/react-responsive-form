import React from 'react';
import bem from 'bem-classname';
import { isNaN, isFinite, isEmpty, trim, parseInt } from 'lodash';

import FieldComponent from '../FieldComponent';
import './input-number.scss';

export default class InputNumber extends FieldComponent {
  onBlurBound = this.onBlur.bind(this);
  onChangeBound = this.onChange.bind(this);

  constructor(props) {
    super(props, 'Input');

    this.validateProps(props);

    this.state = Object.assign({}, this.state, { value: isFinite(props.value) ? props.value.toString() : ''});
  }

  componentWillReceiveProps(nextProps: any) {
    this.validateProps(nextProps);
  }

  isValid() {
    return this.isEmpty() || this.getParsedState() !== null;
  }

  isEmpty() {
    return isEmpty(trim(this.state.value));
  }

  renderEditMode(baseClassName: string) {
      return (
        <input className={bem(baseClassName, 'InputNumber__Edit', { error: !this.isValid()})}
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

  renderViewMode(baseClassName: string) {
      return (
          <div className={bem(baseClassName, 'InputNumber__View')}>
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
    let value = null;

    if (!this.isValidValueEntered(enteredValue)) {
      event.preventDefault();
      return;
    }

    if (isEmpty(trim(enteredValue))) {
        this.setState({ value: '' });
    } else {
      const truncatedEnteredValue = this.truncateToDecimalPlaces(enteredValue);

      let enteredNumber = new Number(truncatedEnteredValue).valueOf();
      let hasValueBeenScaled = false;

      if (isFinite(this.props.min) && enteredNumber < this.props.min) {
          enteredNumber = this.props.min;
          hasValueBeenScaled = true;
      }
      if (isFinite(this.props.max) && enteredNumber > this.props.max) {
          enteredNumber = this.props.max;
          hasValueBeenScaled = true;
      }

      this.setState({
          value: hasValueBeenScaled ? enteredNumber.toString() : truncatedEnteredValue
      });
      value = enteredNumber;
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

  truncateToDecimalPlaces(value: string) {
    const maxDecimalPlaces = isFinite(this.props.maxDecimalPlaces) ? this.props.maxDecimalPlaces : 0;

    if (this.countDecimals(value) > maxDecimalPlaces) {
        let numberComponents = value.toString().split(this.numberDecimalPartSeparatorChar);
        let decimalPlaces = numberComponents[1].substr(0, maxDecimalPlaces);

        return numberComponents[0] + this.numberDecimalPartSeparatorChar + decimalPlaces;
    }

    return value;
  }

  countDecimals(value: string) {
    const numberParts = value.split(this.numberDecimalPartSeparatorChar);
    return numberParts.length <= 1 ? 0 : numberParts[1].length || 0;
  }

  validateProps(props: any) {
    if (isFinite(props.min) && isFinite(props.max) && props.max < props.min) {
        console.error('Unable to set properties when max < min');
    }

    if (isFinite(props.maxDecimalPlaces) && props.maxDecimalPlaces < 0) {
        console.error('Unable to set property maxDecimalPlaces with a negative value');
    }

    if (isFinite(props.maxDecimalPlaces) && props.maxDecimalPlaces > 15) {
        console.error('Unable to set property maxDecimalPlaces greater than 15');
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
