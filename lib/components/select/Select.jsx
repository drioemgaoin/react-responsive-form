import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import { find, isEmpty } from 'lodash';

import FieldComponent from '../FieldComponent';
import {ValidationMode} from '../constants';

import './select.scss';

export default class Select extends FieldComponent {
  onChangeBound = this.onChange.bind(this);
  onBlurBound = this.onBlur.bind(this);

  constructor(props) {
    super(props, {value: props.value ? props.value : props.selectOptionLabel ? undefined : props.options[0].id });
  }

  isEmpty(value) {
    return !value || +value === 0;
  }

  renderItems(): any {
      let options: any[] = [];
      if (this.props.selectOptionLabel) {
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

  renderEditMode(baseClassName: string) {
      const className = classnames(
          bem(baseClassName, 'input') + ' ' + bem('input', ['edit', !this.isValid() ? 'error' : '']),
          this.props.className
      );

      return (
        <select
            ref={(el) => this.element = el}
            name={this.props.name}
            className={className}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.onChangeBound}
            onBlur={this.onBlurBound}>
            {this.renderItems()}
        </select>
      );
  }

  renderViewMode(baseClassName: string) {
      const option = find(this.props.options, i => i.id === this.state.value);
      return (
          <div className={bem(baseClassName, 'input') + ' ' + bem('input', ['view'])}>
              {option ? option.label : ''}
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
