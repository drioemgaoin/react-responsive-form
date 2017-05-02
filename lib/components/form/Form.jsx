import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import {assign} from 'lodash';

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

  onComponentValueChange(value: any, componentConfig: any) {
    this.renderedComponents[componentConfig.fieldName].setValidationMessage('');

    if (componentConfig.componentProps['onChange']) {
        componentConfig.componentProps['onChange'](value);
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
                            this.renderedComponents[c.fieldName] = el;
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
          this.props.saveButtonProps
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
}
