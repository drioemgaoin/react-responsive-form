import React from 'react';

import {FormMode} from './components/constants';
import Form from './components/form/Form';
import Input from './components/input/Input';
import InputNumber from './components/input-number/InputNumber';

export default class ResponsiveForm extends React.Component {
  render() {
    return (
      <div>
        <h2>My responsive form</h2>
        <Form mode={FormMode.Edit}>
            <Input name='firstname' label='First Name' placeholder='First Name' mode='Edit' isRequired={true}></Input>
            <InputNumber name='quantity' label='Quantity' placeholder='Quantity' mode='Edit' isRequired={true}></InputNumber>
        </Form>
      </div>
    );
  }
}
