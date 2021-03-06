import React from 'react';
import bem from 'bem-classname';

import { FormMode, ValidationMode } from './constants';
import { replace, isEqual } from 'lodash';
import { isEmpty } from './util';

import '../../node_modules/font-awesome/scss/font-awesome.scss';
import './fieldcomponent.scss';

export default class FieldComponent extends React.Component {
    static defaultProps = {
        validationMode: ValidationMode.OnChange
    };

    constructor(props, state) {
      super(props);

      this.name = replace(props.label, /\W+/g, '');

      this.state = Object.assign({
        validationMessages: this.props.messages || [],
        value: this.props.value
      }, state ? state : {});
    }

    componentWillReceiveProps(nextProps) {
      if (this.state.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }

      if (this.state.mode !== nextProps.mode) {
        this.setState({ mode: nextProps.mode });
      }

      if (this.state.messages !== nextProps.messages) {
        const validationMessages = nextProps.messages
            ? Array.isArray(nextProps.messages) ? nextProps.messages : [nextProps.messages]
            : [];
        this.setState({ validationMessages });
      }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
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
            {
                this.props.label &&
                (
                    <label htmlFor={this.name} className={bem('form-field', 'label', { error: this.hasValidationMessages() })}>
                        {this.props.label}
                    </label>
                )
            }
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

    isEmpty(value) {
      return isEmpty(value);
    }

    setValidationMessages(messages) {
        const validationMessages = messages
            ? Array.isArray(messages) ? messages : [message]
            : [];
        this.setState({ validationMessages });
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
                <ul>
                {this.state.validationMessages.map((message) => {
                    return <li key={this.state.validationMessages.indexOf(message)}>{message}</li>;
                })}
                </ul>
            </div>
        );
    }

    validate(value) {
        let errors = [];

        if (this.props.isRequired && this.isEmpty(value)) {
            errors.push(this.props.label + ' is required');
        }

        if (this.props.validate) {
            errors = errors.concat(this.props.validate(value));
        }

        return errors;
    }
}
