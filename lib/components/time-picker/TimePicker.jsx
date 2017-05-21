import React from 'react';
import classnames from 'classnames';

import Input from '../input/Input';
import TimePickerPanel from './TimePickerPanel';

import FieldComponent from '../FieldComponent';

export default class TimePicker extends FieldComponent {
  getValue() {
    return this.refs[this.name].getValue();
  }

  onFocus(event) {
    this.setState({ showPanel: true });
  }

  setValidationMessages(messages: string[]) {
    this.refs[this.name].setValidationMessages(messages);
  }

  render() {
      const className = classnames('TimePicker', this.props.className);
      return (
        <div>
          <Input className={className}
                 ref={this.name}
                 type='time'
                 {...this.props}
                 onFocus={this.onFocus.bind(this)}/>
          {
            this.state.showPanel &&
            (<TimePickerPanel />)
          }
        </div>


      );
  }
}
