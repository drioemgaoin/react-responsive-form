import React from 'react';
import bem from 'bem-classname';

import { FormMode } from './constants';
import { replace, isEqual } from 'lodash';
import { isEmpty } from './util';

import '../../node_modules/font-awesome/scss/font-awesome.scss';
import './fieldcomponent.scss';

export default class FieldComponent extends React.Component {
    constructor(props, state) {
      super(props);

      this.name = replace(props.label, /\W+/g, '');

      this.state = Object.assign({
        validationMessages: [],
        value: this.props.value
      }, state ? state : {});
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }
    }

    componentDidUpdate(prevProps: any, prevState: any, prevContext: any) {
      if (this.state.validationMessages === prevState.validationMessages &&
          this.state.validationMessages.length > 0 &&
          !isEqual(this.state.value, prevState.value)) {
          this.setValidationMessages([]);
      }
    }

    renderEditMode() {
      return null;
    }

    renderViewMode() {
      return null;
    }

    render() {
      return (
        <div className={bem('form-field', { required: this.props.mode === FormMode.Edit && this.props.isRequired })}>
            <label htmlFor={this.name} className={bem('form-field', 'label', { error: this.hasValidationMessages() })}>
                {this.props.label}
            </label>
            <div className={bem('form-field', 'value')}>
              {this.props.mode === FormMode.Edit ? this.renderEditMode('field') : this.renderViewMode('field')}
              {this.hasValidationMessages() ? this.renderValidationGlyphicon() : null }
            </div>
            {this.hasValidationMessages() ? this.renderValidationMessages() : null }
        </div>
      );
    }

    getValue() {
      return this.state.value;
    }

    isValid() {
      return !this.hasValidationMessages();
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

    renderValidationGlyphicon() {
      return (
          <span className={bem('form-field', 'glyphicon')}></span>
      );
    }

    renderValidationMessages() {
      return (
            <div className={bem('form-field', 'feedback')}>
                {this.state.validationMessages.map((message: string) => {
                    return <span key={this.state.validationMessages.indexOf(message)}>{message}</span>;
                })}
            </div>
        );
    }

    validate(value: string) {
        let errors: Array<string> = [];

        if (this.props.isRequired && isEmpty(value)) {
            errors.push(this.props.label + ' is required');
        }

        if (this.props.validate) {
            errors = errors.concat(this.props.validate(value));
        }

        return errors;
    }
}
