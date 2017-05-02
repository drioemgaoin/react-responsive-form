import React from 'react';
import bem from 'bem-classname';
import { isFinite, isEmpty, trim } from 'lodash';

import isValidValueEntered from './validations';
import {getParsedState, truncateToDecimalPlaces} from './util';
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
    return this.isEmpty() || getParsedState(this.state.value) !== null;
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

  onChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const enteredValue = event.currentTarget.value;
    let value = null;

    if (!isValidValueEntered(
            enteredValue,
            this.props.maxDecimalPlaces,
            this.props.min)) {
      event.preventDefault();
      return;
    }

    if (isEmpty(trim(enteredValue))) {
        this.setState({ value: '' });
    } else {
      const truncatedEnteredValue = truncateToDecimalPlaces(enteredValue, this.props.maxDecimalPlaces);

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
      const parsedState = getParsedState(this.state.value);

      if (parsedState !== null) {
          this.setState({ value: parsedState.toString() });
      }
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
}
