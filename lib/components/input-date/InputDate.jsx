import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

import 'react-datepicker/dist/react-datepicker.css';

export default class InputDate extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  static defaultProps = {
    dateFormat: 'DD/MM/YYYY'
  };

  constructor(props) {
    super(props, { startDate: props.value });
  }

  getValue() {
    return this.state.value ? this.state.value.format(this.props.dateFormat) : undefined;
  }

  renderViewMode(baseClassName: string) {
    const className = classnames(
        bem(baseClassName, 'input-date') + ' ' + bem('input-date', ['view']),
        this.props.className
    );

    return (
      <div className={className}>{this.state.value.format(this.props.dateFormat)}</div>
    );
  }

  renderEditMode(baseClassName: string) {
    const className = classnames(
        bem(baseClassName, 'input-date') + ' ' + bem('input-date', ['edit', !this.isValid() ? 'error' : '']),
        this.props.className
    );

    return (
      <DatePicker {...this.props}
          selected={this.state.startDate}
          onChange={this.onChangeBound}
          onBlur={(date) => this.props.validationMode === ValidationMode.OnBlur ? this.onBlur(date) : undefined} />
    );
  }

  onChange(date) {
    this.setState({ startDate: date });

    this.change(
        date,
        this.props.validationMode === ValidationMode.OnChange
    );
  }

  onBlur(date) {
    this.change(date.currentTarget.value, true);
  }

  change(date, mustValidate) {
      this.setValidationMessages([]);

      let errors = this.validate(date);
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

      this.setState({ value: date });

      if (errors.length === 0 && this.props.onChange) {
          this.props.onChange(date);
      }
  }
}
