import React from 'react';

import {FormMode} from './components/constants';
import Form from './components/form/Form';
import Input from './components/input/Input';
import InputNumber from './components/input-number/InputNumber';
import InputEmail from './components/input-email/InputEmail';

export default class ResponsiveForm extends React.Component {
  firstname: React.SyntheticEvent<HTMLInputElement>;

  render() {
    return (
      <div>
        <h2>My responsive form</h2>
        <Form mode={FormMode.Edit}>
            <Input ref={(el) => this.firstname = el}
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
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                mode={FormMode.Edit}
                isRequired={true} />
        </Form>
      </div>
    );
  }
}
