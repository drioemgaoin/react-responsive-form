import React from 'react';

import {FormMode} from './components/constants';
import Form from './components/form/Form';
import Input from './components/input/Input';
import InputNumber from './components/input-number/InputNumber';
import {IMap} from './interfaces';


export default class ResponsiveForm extends React.Component {
  firstname: React.SyntheticEvent<HTMLInputElement>;
  validate() {
    let errors: IMap<string> = {};
    console.log(this);
    if (!this.firstname.isValid()) {
        errors['firstname'] = this.firstname.getValidationMessage();
    }

    if (!this.quantity.isValid()) {
        errors['quantity'] = this.quantity.getValidationMessage();
    }

    return errors;
  }

  render() {
    return (
      <div>
        <h2>My responsive form</h2>
        <Form mode={FormMode.Edit} validate={() => this.validate()}>
            <Input ref={(el) => { this.firstname = el; }}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                mode={FormMode.Edit}
                isRequired={true} />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                mode={FormMode.Edit}
                isRequired={true} />
        </Form>
      </div>
    );
  }
}
