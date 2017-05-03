import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { assign, isEmpty } from 'lodash';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

export default class Input extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  constructor(props) {
    super(props);
  }

  renderEditMode(baseClassName: string) {
      const className = classnames(
          bem(baseClassName, 'input') + ' ' + bem('input', ['edit']),
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
          <div className={bem(baseClassName, 'input') + ' ' + bem('input', ['view'])}>
              {this.props.value}
          </div>
      );
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
