import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { assign, isFinite, isEmpty, trim } from 'lodash';

import validate from './validations';
import {parse, truncateToDecimalPlaces} from './util';
import {ValidationMode} from '../constants';

import Input from '../input/Input';
import FieldComponent from '../FieldComponent';

import './input-number.scss';

export default class InputNumber extends FieldComponent {
  static defaultProps = {
    validationMode: ValidationMode.OnChange,
    maxDecimalPlaces: 0,
    min: 0
  };

  constructor(props) {
    super(props);

    this.validateProps(props);
  }

  componentWillReceiveProps(nextProps: any) {
    this.validateProps(nextProps);
  }

  getValue() {
    return parse(this.refs[this.name].getValue());
  }

  setValidationMessages(messages: string[]) {
    this.refs[this.name].setValidationMessages(messages);
  }

  render() {
      const className = classnames('InputNumber', this.props.className);
      return (
        <Input className={className}
               ref={this.name}
               {...this.props}
               value={isFinite(this.props.value) ? this.props.value.toString() : ''}
               validate={(value) => validate(value, this.props.maxDecimalPlaces, this.props.min)} />
      );
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
