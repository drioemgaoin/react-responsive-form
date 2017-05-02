import React from 'react';
import { assign, isEmpty, trim } from 'lodash';
import classnames from 'classnames';
import bem from 'bem-classname';

import isValidValueEntered from './validations';
import FieldComponent from '../FieldComponent';

export default class InputEmail extends FieldComponent {
  onChangeBound = this.onChange.bind(this);

  constructor(props) {
    super(props);

    this.state = assign({}, this.state, { value: props.value });
  }

  renderViewMode(baseClassName: string) {
      return (
          <div className={bem(baseClassName, 'InputEmail__View')}>
              {this.props.value}
          </div>
      );
  }

  renderEditMode(baseClassName: string) {
      const className = classnames(
          bem(baseClassName, 'InputEmail__Edit', { error: !this.isValid() }),
          this.props.className
      );
      return (
        <input className={className}
              ref={(el) => this.element = el}
              type='email'
              value={this.state.value}
              name={this.name}
              placeholder={this.props.placeholder}
              onChange={this.onChangeBound}
              autoComplete={'off'} />
      );
  }

  getValue() {
    return this.state.value;
  }

  isValid() {
    return true;
  }

  onChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    this.setState({ value: value });

    if (this.props.onChange) {
        this.props.onChange(value);
    }
  }
}
