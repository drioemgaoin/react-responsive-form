import React from 'react';

import {Form, Input, InputEmail, InputNumber, Textarea, FormMode, ValidationMode, ListGroup, ListItem, Select} from './index';
import {Accordion, Panel} from 'react-bootstrap';

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
      </div>
    );
  }
}
