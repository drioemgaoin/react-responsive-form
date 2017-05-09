import React from 'react';

import {Form, Input, InputEmail, InputNumber, Textarea, FormMode, ValidationMode, ListGroup, ListItem} from './index';

import './react-responsive-form.scss';

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
        <h2>Default Form validation on submit</h2>
        <Form mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                isRequired={true} />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                isRequired={true} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <ListGroup name='service'
                label='Category 1'
                isRequired={true}>
                <ListItem name='service-1' value='0'>
                    Service 1
                </ListItem>
                <ListItem name='service-2' value='1'>
                    Service 2
                </ListItem>
            </ListGroup>
        </Form>
        <div id='default-form'>
          <pre>{JSON.stringify(this.state.values, (key, value) => value ? value : null, 2)}</pre>
        </div>
        <hr />

        <h2>Default Form validation on change</h2>
        <Form mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)} validationMode={ValidationMode.OnChange}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                isRequired={true} />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                isRequired={true} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
                <ListItem name='service-1' value='0'>
                    Service 1
                </ListItem>
                <ListItem name='service-2' value='1'>
                    Service 2
                </ListItem>
            </ListGroup>
        </Form>
        <div id='default-form'>
          <pre>{JSON.stringify(this.state.values, (key, value) => value ? value : null, 2)}</pre>
        </div>
        <hr />

        <h2>Default Form validation on blur</h2>
        <Form mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)} validationMode={ValidationMode.OnBlur}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                isRequired={true} />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                isRequired={true} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
                <ListItem name='service-1' value='0'>
                    Service 1
                </ListItem>
                <ListItem name='service-2' value='1'>
                    Service 2
                </ListItem>
            </ListGroup>
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
                isRequired={true}
                value='Romain Diegoni' />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                isRequired={true}
                value={1000} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true}
                value='custom@domain.com' />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note'
                isRequired={true}
                value='It is a note\nA multi-line one' />
                <ListGroup name='service'
                    label='Services'
                    value='1'>
                <ListItem name='service-1' value='0'>
                    Service 1
                </ListItem>
                <ListItem name='service-2' value='1'>
                    Service 2
                </ListItem>
            </ListGroup>
        </Form>
        <hr />

        <h2>Default Form Edit</h2>
        <Form mode={FormMode.Edit}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                isRequired={true}
                value='Romain Diegoni' />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                isRequired={true}
                value={1000} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true}
                value='custom@domain.com' />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note'
                isRequired={true}
                value='It is a note\nA multi-line one' />
                <ListGroup name='service'
                    label='Services'
                    value='1'>
                <ListItem name='service-1' value='0'>
                    Service 1
                </ListItem>
                <ListItem name='service-2' value='1'>
                    Service 2
                </ListItem>
            </ListGroup>
        </Form>
        <hr />

        <h2>Custom Form validation on submit</h2>
        <Form className='react-responsive-form' mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                isRequired={true} />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                isRequired={true} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
                <ListItem name='service-1' value='0'>
                    Service 1
                </ListItem>
                <ListItem name='service-2' value='1'>
                    Service 2
                </ListItem>
            </ListGroup>
        </Form>
        <div id='default-form'>
          <pre>{JSON.stringify(this.state.values, (key, value) => value ? value : null, 2)}</pre>
        </div>
      </div>
    );
  }
}
