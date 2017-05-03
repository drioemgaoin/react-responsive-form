import React from 'react';

import {FormMode} from './components/constants';
import Form from './components/form/Form';
import Input from './components/input/Input';
import InputNumber from './components/input-number/InputNumber';
import InputEmail from './components/input-email/InputEmail';

export default class ResponsiveForm extends React.Component {
  firstname: React.SyntheticEvent<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.state = { values: {} };
  }

  onSubmit(values) {
    this.setState({ values });
  }

  render() {
    return (
      <div>
        <h2>Default Form</h2>
        <Form mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)}>
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
        <div id='default-form'>
          <pre>{JSON.stringify(this.state.values, (key, value) => value ? value : null, 2)}</pre>
        </div>
        <hr />
        <h2>Default Form ReadOnly</h2>
        <Form mode={FormMode.View}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                mode={FormMode.Edit}
                isRequired={true}
                value='Romain Diegoni' />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                mode={FormMode.Edit}
                isRequired={true}
                value={1000} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                mode={FormMode.Edit}
                isRequired={true}
                value='custom@domain.com' />
        </Form>
      </div>
    );
  }
}
