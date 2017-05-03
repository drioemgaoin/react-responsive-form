import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { assign, isEmpty } from 'lodash';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

export default class Input extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  static defaultProps = {
    validationMode: ValidationMode.OnSubmit
  };

  constructor(props) {
    super(props);

    this.state = assign({}, this.state, { value: this.props.value });
  }

  isValid() {
    return !this.hasValidationMessages();
  }

  getValue() {
    return this.state.value;
  }

  renderEditMode(baseClassName: string) {
      const className = classnames(
          bem(baseClassName, 'Input__Edit'),
          this.props.className
      );
      return (
        <input className={className}
              ref={(el) => { this.element = el; }}
              type='text'
              value={this.state.value || ''}
              name={this.name}
              placeholder={this.props.placeholder}
              onChange={this.onChangeBound}
              onBlur={this.onBlurBound} />
      );
  }

  renderViewMode(baseClassName: string) {
      return (
          <div className={bem(baseClassName, 'Input__View')}>
              {this.props.value}
          </div>
      );
  }

  validate(value: string) {
      let errors: Array<string> = [];

      if (this.props.isRequired && isEmpty(value)) {
          errors.push(this.props.label + ' is required');
      }

      if (this.props.validate) {
          this.props.validate(value).push((error: string) => errors.push(error));
      }

      return errors;
  }

  onChange(event: React.SyntheticEvent<HTMLInputElement>) {
    this.change(
        event.currentTarget.value,
        this.props.validationMode === ValidationMode.OnChange
    );
  }

  onBlur(event: React.SyntheticEvent<HTMLInputElement>) {
      this.change(
          event.currentTarget.value,
          this.props.validationMode === ValidationMode.OnBlur
      );
  }

  change(enteredValue: string, mustValidate: boolean) {
      event.preventDefault();
      this.setValidationMessages([]);

      let errors = [];
      if (mustValidate) {
          errors = this.validate(enteredValue);
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
