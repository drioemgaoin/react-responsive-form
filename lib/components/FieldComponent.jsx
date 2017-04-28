import React from 'react';
import bem from 'bem-classname';

import { FormMode } from './constants';

export default class FieldComponent extends React.Component {
    constructor(props, name) {
      super(props);

      this.className = bem.bind(null, name);

      this.state = { validationMessage: '' };
    }

    render() {
      return (
        <div className={this.className('Group', { required: this.props.isRequired })}>
            <label htmlFor={this.name} className={this.className('Group__Label', { error: !this.isValid() || this.hasValidationMessage() })}>
                {this.props.label}
            </label>
            {this.props.mode === 'Edit' ? this.renderEditMode() : this.renderViewMode()}
            {this.hasValidationMessage() ? this.renderValidationMessage() : null }
        </div>
      );
    }

    hasValidationMessage() {
      return false;
    }

    renderValidationMessage() {
      return (
            <div className={this.className('Group__Element--error')}>
                {this.state.validationMessage}
            </div>
        );
    }
}
