import React from 'react';
import classnames from 'classnames';

import validate from './validations';
import Input from '../input/Input';

import FieldComponent from '../FieldComponent';

export default class InputEmail extends FieldComponent {
  static defaultProps = {
      validate: validate
  };

  getValue() {
    return this.refs[this.name].getValue();
  }

  setValidationMessages(messages: string[]) {
    this.refs[this.name].setValidationMessages(messages);
  }

  render() {
      const className = classnames('InputEmail', this.props.className);
      return (
        <Input className={className}
               ref={this.name}
               {...this.props}
               validate={(value) => validate(value, this.props.maxDecimalPlaces, this.props.min)} />
      );
  }
}
