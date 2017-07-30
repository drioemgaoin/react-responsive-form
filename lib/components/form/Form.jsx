import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import {every, forEach, isEmpty, assign} from 'lodash';

import FieldComponent from '../FieldComponent';
import { FormMode } from '../constants';
import { recursivelyMapChildren } from '../util';

import './form.scss';

export default class Form extends React.Component {
  onSubmitBound = this.onSubmit.bind(this);

  componentWillReceiveProps(nextProps) {
      if (nextProps.messages) {
          forEach(Object.keys(nextProps.messages), key => {
              const component = this.renderedComponents[key];
              if (component) {
                  if (component.setValidationMessages) {
                      const messages = Array.isArray(nextProps.messages[key]) ? nextProps.messages[key] : [nextProps.messages[key]];
                      component.setValidationMessages(messages);
                  }
              }
          });
      }
  }

  renderComponents() {
    this.renderedComponents = {};

    const components = React.Children.toArray(this.props.children);
    return recursivelyMapChildren(components, (c) => {
        if (c.type.prototype instanceof FieldComponent && c.props.name) {
            return {
                mode: c.props.mode !== undefined ? c.props.mode : this.props.mode,
                validationMode: c.props.validationMode !== undefined ? c.props.validationMode : this.props.validationMode,
                ref: (el) => {
                    if (el) {
                        this.renderedComponents[c.props.name] = el;
                    }

                    return c.ref ? c.ref(el) : undefined;
                }
            };
        }

        return {};
    });
  }

  renderButtons() {
      return (
          <div className={bem('form', 'buttons')}>
              {this.props.mode === FormMode.Edit ? this.renderSaveButton() : null}
              {this.renderCancelButton()}
          </div>
      );
  }

  renderSaveButton() {
      const defaultSaveButtonProps = {
          label: 'Save',
          className: bem('form__buttons', 'button')
      };
      const saveButtonProps = this.prepareButtonProps(
          defaultSaveButtonProps,
          this.props.saveButtonProps
      );

      return (
          <button type='submit' {...saveButtonProps}>Save</button>
      );
  }

  renderCancelButton() {
        const defaultCancelButtonProps = {
            label: 'Cancel',
            className: bem('form__buttons', 'button')
        };
        const cancelButtonProps = this.prepareButtonProps(
            defaultCancelButtonProps,
            this.props.cancelButtonProps
        );

        return (
            <button {...cancelButtonProps}>Cancel</button>
        );
    }

  render() {
      return (
          <form className={classnames('form', this.props.className)} onSubmit={this.onSubmit.bind(this)}>
              {this.renderComponents()}
              {this.renderButtons()}
          </form>
      );
  }

  prepareButtonProps(defaultProps, customProps) {
    const customClassName = customProps ? customProps.className : {};
    return assign(
        {},
        defaultProps,
        customProps,
        {
            className: classnames(defaultProps.className, customClassName),
            onClick: customProps ? customProps.onClick : null
        }
    );
  }

  onSubmit(e) {
    e.preventDefault();

    const formValues = this.getFormValues();
    let isValid = true;

    forEach(this.renderedComponents, (component) => {
        const errors = component.validate(formValues[component.name]);
        isValid = isValid && errors.length === 0;
        component.setValidationMessages(errors);
    });

    if (this.props.validate) {
        forEach(this.props.validate(formValues), (errors, fieldName) => {
            const currentErrors = this.renderedComponents[fieldName].getValidationMessages();
            isValid = isValid && currentErrors.length === 0;

            this.renderedComponents[fieldName].setValidationMessage(currentErrors.concat(errors));
        });
    }

    if (isValid) {
        if (this.props.onFormSubmit) {
            this.props.onFormSubmit(formValues);
        }
    }
  }

  getFormValues() {
    let values = {};

    forEach(this.renderedComponents, component => {
        const value = component.getValue();

        if (values[component.name]) {
            values[component.name] = [values[component.name], value];
        } else {
            values[component.name] = value;
        }
    });

    return values;
  }
}
