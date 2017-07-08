import React from 'react';
import moment from 'moment';

import {Form, Input, InputEmail, InputDate, InputNumber, Textarea, FormMode, ValidationMode, ListGroup, ListItem, Select} from './index';
import {Accordion, Panel} from 'react-bootstrap';

import './react-responsive-form.scss';

export default class ResponsiveForm extends React.Component {
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
            <Select ref={(el) => this.gender = el}
                name='gender'
                label='Gender'
                placeholder='Gender'
                isRequired={true}
                selectOptionLabel='Select Gender'
                options={[{id: 1, label: 'Male'}, {id: 2, label: 'Female'}]} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note'
                isRequired={true} />
            <Input ref={(el) => this.note = el}
                type='time'
                name='time'
                label='Time'
                placeholder='Time'
                isRequired={true}
                step={300} />
            <InputDate ref={(el) => this.startDate = el}
                name='startDate'
                label='Start Date'
                placeholder='Start Date'
                isRequired={true} />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
              <Accordion>
                <Panel header='Category 1' eventKey='1'>
                    <ListItem value={0}>
                        Service 1
                    </ListItem>
                    <ListItem value={1}>
                        Service 2
                    </ListItem>
                </Panel>
                <Panel header='Category 2' eventKey='2'>
                    <ListItem value={2}>
                        Service 3
                    </ListItem>
                    <ListItem value={3}>
                        Service 4
                    </ListItem>
                </Panel>
              </Accordion>
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
            <Select ref={(el) => this.gender = el}
                name='gender'
                label='Gender'
                placeholder='Gender'
                isRequired={true}
                selectOptionLabel='Select Gender'
                options={[{id: 1, label: 'Male'}, {id: 2, label: 'Female'}]} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <Input ref={(el) => this.note = el}
                type='time'
                name='time'
                label='Time'
                placeholder='Time'
                isRequired={true}
                step={300} />
            <InputDate ref={(el) => this.startDate = el}
                name='startDate'
                label='Start Date'
                placeholder='Start Date'
                isRequired={true} />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
              <Accordion>
                <Panel header='Category 1' eventKey='1'>
                    <ListItem value={0}>
                        Service 1
                    </ListItem>
                    <ListItem value={1}>
                        Service 2
                    </ListItem>
                </Panel>
                <Panel header='Category 2' eventKey='2'>
                    <ListItem value={2}>
                        Service 3
                    </ListItem>
                    <ListItem value={3}>
                        Service 4
                    </ListItem>
                </Panel>
              </Accordion>
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
            <Select ref={(el) => this.gender = el}
                name='gender'
                label='Gender'
                placeholder='Gender'
                isRequired={true}
                selectOptionLabel='Select Gender'
                options={[{id: 1, label: 'Male'}, {id: 2, label: 'Female'}]} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <Input ref={(el) => this.note = el}
                type='time'
                name='time'
                label='Time'
                placeholder='Time'
                isRequired={true}
                step={300} />
            <InputDate ref={(el) => this.startDate = el}
                name='startDate'
                label='Start Date'
                placeholder='Start Date'
                isRequired={true} />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
              <Accordion>
                <Panel header='Category 1' eventKey='1'>
                    <ListItem value={0}>
                        Service 1
                    </ListItem>
                    <ListItem value={1}>
                        Service 2
                    </ListItem>
                </Panel>
                <Panel header='Category 2' eventKey='2'>
                    <ListItem value={2}>
                        Service 3
                    </ListItem>
                    <ListItem value={3}>
                        Service 4
                    </ListItem>
                </Panel>
              </Accordion>
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
                value='Romain Diegoni' />
            <InputNumber ref={(el) => this.quantity = el}
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                value={1000} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                value='custom@domain.com' />
            <Select ref={(el) => this.gender = el}
                name='gender'
                label='Gender'
                placeholder='Gender'
                selectOptionLabel='Select Gender'
                options={[{id: 1, label: 'Male'}, {id: 2, label: 'Female'}]}
                value={2} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note'
                value='It is a note\nA multi-line one' />
            <Input ref={(el) => this.note = el}
                type='time'
                name='time'
                label='Time'
                placeholder='Time'
                step={300}
                value={moment().format('HH:mm')} />
            <InputDate ref={(el) => this.startDate = el}
                name='startDate'
                label='Start Date'
                placeholder='Start Date'
                value={moment()} />
            <ListGroup name='service'
                label='Services'
                value={2}>
              <Accordion>
                <Panel header='Category 1' eventKey='1'>
                    <ListItem value={0}>
                        Service 1
                    </ListItem>
                    <ListItem value={1}>
                        Service 2
                    </ListItem>
                </Panel>
                <Panel header='Category 2' eventKey='2'>
                    <ListItem value={2}>
                        Service 3
                    </ListItem>
                    <ListItem value={3}>
                        Service 4
                    </ListItem>
                </Panel>
              </Accordion>
            </ListGroup>
        </Form>
        <hr />

        <h2>Default Form Edit</h2>
        <Form mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)}>
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
                maxDecimalPlaces={2}
                value={1000} />
            <InputEmail ref={(el) => this.email = el}
                name='email'
                label='Email'
                placeholder='example@domain.com'
                isRequired={true}
                value='custom@domain.com' />
            <Select ref={(el) => this.gender = el}
                name='gender'
                label='Gender'
                placeholder='Gender'
                isRequired={true}
                selectOptionLabel='Select Gender'
                options={[{id: 1, label: 'Male'}, {id: 2, label: 'Female'}]}
                value={2} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note'
                isRequired={true}
                value='It is a note\nA multi-line one' />
            <Input ref={(el) => this.note = el}
                type='time'
                name='time'
                label='Time'
                placeholder='Time'
                step={300}
                isRequired={true}
                value={moment().format('HH:mm')} />
            <InputDate ref={(el) => this.startDate = el}
                name='startDate'
                label='Start Date'
                placeholder='Start Date'
                isRequired={true}
                value={moment()} />
            <ListGroup name='service'
                label='Services'
                isRequired={true}
                value={2}>
              <Accordion>
                <Panel header='Category 1' eventKey='1'>
                    <ListItem value={0}>
                        Service 1
                    </ListItem>
                    <ListItem value={1}>
                        Service 2
                    </ListItem>
                </Panel>
                <Panel header='Category 2' eventKey='2'>
                    <ListItem value={2}>
                        Service 3
                    </ListItem>
                    <ListItem value={3}>
                        Service 4
                    </ListItem>
                </Panel>
              </Accordion>
            </ListGroup>
        </Form>
        <div id='default-form'>
          <pre>{JSON.stringify(this.state.values, (key, value) => value ? value : null, 2)}</pre>
        </div>
        <hr />

        <h2>Custom Form validation on submit</h2>
        <Form className='react-responsive-form' mode={FormMode.Edit} onFormSubmit={this.onSubmit.bind(this)}>
            <Input ref={(el) => this.firstname = el}
                name='firstname'
                label='First Name'
                placeholder='First Name'
                isRequired={false} />
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
            <Select ref={(el) => this.gender = el}
                name='gender'
                label='Gender'
                placeholder='Gender'
                isRequired={true}
                selectOptionLabel='Select Gender'
                options={[{id: 1, label: 'Male'}, {id: 2, label: 'Female'}]} />
            <Textarea ref={(el) => this.note = el}
                name='note'
                label='Note'
                placeholder='Note' />
            <Input ref={(el) => this.note = el}
                type='time'
                name='time'
                label='Time'
                placeholder='Time'
                step={300} />
            <ListGroup name='service'
                label='Services'
                isRequired={true}>
              <Accordion>
                <Panel header='Category 1' eventKey='1'>
                    <ListItem value={0}>
                        Service 1
                    </ListItem>
                    <ListItem value={1}>
                        Service 2
                    </ListItem>
                </Panel>
                <Panel header='Category 2' eventKey='2'>
                    <ListItem value={2}>
                        Service 3
                    </ListItem>
                    <ListItem value={3}>
                        Service 4
                    </ListItem>
                </Panel>
              </Accordion>
            </ListGroup>
        </Form>
        <div id='default-form'>
          <pre>{JSON.stringify(this.state.values, (key, value) => value ? value : null, 2)}</pre>
        </div>
      </div>
    );
  }
}
