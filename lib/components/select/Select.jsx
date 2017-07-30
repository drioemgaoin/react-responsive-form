import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find } from 'lodash';

import FieldComponent from '../FieldComponent';
import {FormMode, ValidationMode} from '../constants';

import './select.scss';

export default class Select extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  constructor(props) {
    super(props, { value: props.value || 0 });
  }

  isEmpty(value) {
    return !value || +value === 0;
  }

  renderItems() {
      let options = [];
      if (this.props.mode === FormMode.Edit && this.props.selectOptionLabel) {
        options.push(
            <option
                key={0}
                value={0}
                label={this.props.selectOptionLabel}>
                {this.props.selectOptionLabel}
            </option>
        );
      }

      this.props.options.forEach((option) => {
          options.push(
              <option
                  key={option.id}
                  value={option.id}
                  label={option.label}>
                  {option.label}
              </option>);
      });

      return options;
  }

  renderEditMode(baseClassName) {
      const className = classnames(
          bem(baseClassName, 'select') + ' ' + bem('select', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );

      return (
        <div className={className}>
            <select
                ref={(el) => this.element = el}
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChangeBound}
                onBlur={this.onBlurBound}>
                {this.renderItems()}
            </select>
        </div>
      );
  }

  renderViewMode(baseClassName) {
      const option = find(this.props.options, i => i.id === this.state.value);
      return (
          <div className={bem(baseClassName, 'select') + ' ' + bem('select', ['view'])}>
              {option ? option.label : ''}
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
