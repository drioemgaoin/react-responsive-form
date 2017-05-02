import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import {forEach, isEmpty, assign} from 'lodash';

import FieldComponent from '../FieldComponent';
import { FormMode } from '../constants';

import './form.scss';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  onComponentValueChange(value: any, element: any) {
    this.renderedComponents[element.props.name].setValidationMessage('');

    if (element.onChange) {
        element.onChange(value);
    }
  }

  renderComponents() {
    this.renderedComponents = {};

    return this.props.children.map(c => {
        const component = React.createElement(
            c.type,
            assign(
                {
                    key: c.props.name,
                    label: c.props.label,
                    className: c.props.className,
                    isRequired: c.props.isRequired
                },
                c.componentProps,
                {
                    mode: this.props.mode,
                    ref: (el: FieldComponent) => {
                        if (el) {
                            this.renderedComponents[c.props.name] = el;
                        }
                    },
                    onChange: (value: any) => {
                        this.onComponentValueChange(value, c);
                    }
                }
            )
        );

        return component;
    });
  }

  renderButtons() {
      return (
          <div className='Form__Buttons'>
              {this.props.mode === FormMode.Edit ? this.renderSaveButton() : null}
              {this.renderCancelButton()}
          </div>
      );
  }

  renderSaveButton() {
      const defaultSaveButtonProps = {
          label: 'Save',
          className: 'Form__Buttons__Button'
      };
      const saveButtonProps = this.prepareButtonProps(
          defaultSaveButtonProps,
            assign(this.props.saveButtonProps, {
                onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => {
                    if (this.props.saveButtonProps && this.props.saveButtonProps.onClick) {
                        this.props.saveButtonProps.onClick(e);
                    }

                    this.onSaveButtonClick();
                }
            })
      );

      return (
          <button {...saveButtonProps}>Save</button>
      );
  }

  renderCancelButton() {
        const defaultCancelButtonProps = {
            label: 'Cancel',
            className: 'Form__Buttons__Button'
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
          <form className={bem('Form')} onSubmit={this.onSubmit.bind(this)}>
              {this.renderComponents()}
              {this.renderButtons()}
          </form>
      );
  }

  prepareButtonProps(defaultProps: any, customProps: any) {
    const custmClassName = customProps ? customProps.className : {};
    return assign(
        {},
        defaultProps,
        customProps,
        {
            className: classnames(defaultProps.className, custmClassName),
            onClick: customProps ? customProps.onClick : null
        }
    );
  }

  onSaveButtonClick() {
    const formValues = this.getFormValues();
    let errors: Map = {};

    if (this.props.validate) {
        forEach(this.renderedComponents, (component) => {
            component.setValidationMessage('');
        });

        errors = this.props.validate(formValues);

        if (!isEmpty(errors)) {
            forEach(errors, (error, fieldName) => {
                this.renderedComponents[fieldName].setValidationMessage(error);
            });
        }
    }

    if (isEmpty(errors)) {
        this.props.onFormSubmit && this.props.onFormSubmit(formValues);
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
