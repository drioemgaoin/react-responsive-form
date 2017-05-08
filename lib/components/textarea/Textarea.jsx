import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { assign, isEmpty, split } from 'lodash';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

import './textarea.scss';

export default class Textarea extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  constructor(props) {
    super(props);
  }

  renderEditMode(baseClassName: string) {
      const className = classnames(
          bem(baseClassName, 'textarea') + ' ' + bem('textarea', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );
      return (
        <textarea className={className}
              ref={(el) => { this.element = el; }}
              value={this.state.value ? this.state.value.replace('\\n', '\n') : ''}
              name={this.name}
              placeholder={this.props.placeholder}
              onChange={this.onChangeBound}
              onBlur={this.onBlurBound} />
      );
  }

  renderViewMode(baseClassName: string) {
      return (
          <div className={bem(baseClassName, 'textarea') + ' ' + bem('textarea', ['view'])}>
              {
                split(this.props.value, '\\n')
                  .map((value, index) => <div key={'note' + (index+1)}>{value}</div>)
              }
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
