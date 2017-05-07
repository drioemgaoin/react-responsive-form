import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import {every, forEach, isEmpty, assign} from 'lodash';

import FieldComponent from '../FieldComponent';
import { FormMode } from '../constants';

import './form.scss';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    this.onSaveButtonClick();
  }

  renderComponents() {
    this.renderedComponents = {};

    const components = React.Children.toArray(this.props.children);
    return components.map(c => {
        return React.createElement(
            c.type,
            assign(
                {
                    key: c.props.name,
                },
                c.props,
                {
                    mode: c.props.mode !== undefined ? c.props.mode : this.props.mode,
                    validationMode: c.props.validationMode !== undefined ? c.props.validationMode : this.props.validationMode,
                    ref: (el: FieldComponent) => {
                        if (el) {
                            this.renderedComponents[c.props.name] = el;
                        }

                        return c.ref ? c.ref(el) : undefined;
                    }
                }
            )
        );
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

  prepareButtonProps(defaultProps: any, customProps: any) {
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

  onSaveButtonClick() {
    const formValues = this.getFormValues();
    let isValid = true;

    forEach(this.renderedComponents, (component, fieldName) => {
        const errors = component.validate(formValues[fieldName]);
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
    let values: Map = {};
    forEach(this.renderedComponents, (component, fieldName) => {
        values[fieldName] = component.getValue();
    });

    return values;
  }
}
