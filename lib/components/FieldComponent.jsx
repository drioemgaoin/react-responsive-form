import React from 'react';
import bem from 'bem-classname';

import { FormMode } from './constants';
import { trim, isEmpty, isEqual } from 'lodash';

import './fieldcomponent.scss';

export default class FieldComponent extends React.Component {
    constructor(props, name) {
      super(props);

      this.state = { validationMessage: '' };
    }

    componentDidUpdate(prevProps: any, prevState: any, prevContext: any) {
      if (this.state.validationMessage === prevState.validationMessage &&
          !isEmpty(this.state.validationMessage) &&
          !isEqual(this.state.value, prevState.value)) {
          this.setValidationMessage('');
      }
    }

    render() {
      return (
        <div className={bem('Group', { required: this.props.isRequired })}>
            <label htmlFor={this.name} className={bem('Group__Label', { error: !this.isValid() || this.hasValidationMessage() })}>
                {this.props.label}
            </label>
            {this.props.mode === 'Edit' ? this.renderEditMode('Group') : this.renderViewMode('Group')}
            {this.hasValidationMessage() ? this.renderValidationMessage() : null }
        </div>
      );
    }

    setValidationMessage(message: string) {
        this.setState({ validationMessage: message });
    }

    hasValidationMessage() {
      return !isEmpty(trim(this.state.validationMessage));
    }

    renderValidationMessage() {
      return (
            <div className={bem('Group__Element--feedback')}>
                {this.state.validationMessage}
            </div>
        );
    }
}
