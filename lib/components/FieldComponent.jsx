import React from 'react';
import bem from 'bem-classname';

import { FormMode } from './constants';
import { replace, isEqual } from 'lodash';

import './fieldcomponent.scss';

export default class FieldComponent extends React.Component {
    constructor(props) {
      super(props);

      this.name = replace(props.label, /\W+/g, '');

      this.state = { validationMessages: [] };
    }

    componentDidUpdate(prevProps: any, prevState: any, prevContext: any) {
      if (this.state.validationMessages === prevState.validationMessages &&
          this.state.validationMessages.length > 0 &&
          !isEqual(this.state.value, prevState.value)) {
          this.setValidationMessages([]);
      }
    }

    render() {
      return (
        <div className={bem('Group', { required: this.props.isRequired })}>
            <label htmlFor={this.name} className={bem('Group__Label', { error: this.hasValidationMessages() })}>
                {this.props.label}
            </label>
            {this.props.mode === FormMode.Edit ? this.renderEditMode('Group') : this.renderViewMode('Group')}
            {this.hasValidationMessages() ? this.renderValidationMessages() : null }
        </div>
      );
    }

    setValidationMessages(messages: string[]) {
        this.setState({ validationMessages: messages });
    }

    hasValidationMessages() {
      return this.state.validationMessages.length > 0;
    }

    getValidationMessages() {
        return this.state.validationMessages;
    }

    renderValidationMessages() {
      return (
            <div className={bem('Group__Element--feedback')}>
                {this.state.validationMessages.map((message: string) => {
                    return <span key={this.state.validationMessages.indexOf(message)}>{message}</span>;
                })}
            </div>
        );
    }
}
