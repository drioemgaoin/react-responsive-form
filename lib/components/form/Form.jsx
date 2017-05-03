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
                    ...c.props
                },
                c.componentProps,
                {
                    mode: this.props.mode,
                    ref: (el: FieldComponent) => {
                        if (el) {
                            this.renderedComponents[c.props.name] = el;
                        }

                        return c.ref(el);
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
          <form className='form' onSubmit={this.onSubmit.bind(this)}>
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

    forEach(this.renderedComponents, (component, fieldName) => {
        component.setValidationMessages([]);

        if (component.validate) {
            component.setValidationMessages(component.validate(formValues[fieldName]));
        }
    });

    if (this.props.validate) {
        forEach(this.props.validate(formValues), (errors, fieldName) => {
            const currentErrors = this.renderedComponents[fieldName].getValidationMessages();
            this.renderedComponents[fieldName].setValidationMessage(currentErrors.concat(errors));
        });
    }

    const isValid = every(this.renderedComponents, (component, fieldName) => component.isValid());
    if (isValid) {
        console.log(formValues);

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
