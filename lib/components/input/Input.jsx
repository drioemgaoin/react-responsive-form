import React from 'react';
import bem from 'bem-classname';

import FieldComponent from '../FieldComponent';

export default class Input extends FieldComponent {
  constructor(props) {
    super(props, 'Input');


    this.state = {
        value: this.props.value
    };
  }

  isValid() {
    return true;
  }

  renderEditMode() {
      return (
        <input className={this.className({ error: !this.isValid()})}
              ref={(el) => this.element = el}
              type='text'
              value={this.state.value || ''}
              name={this.name}
              placeholder={this.props.placeholder}
              onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.onInputChange(e.currentTarget.value)} />
      );
  }

  renderViewMode() {
      return (
          <div>
              {this.props.value}
          </div>
      );
  }

  onInputChange(value: string) {
    this.setState({ value });

    if (this.props.onChange) {
        this.props.onChange(value);
    }
  }
}
