import React from 'react';
import classnames from 'classnames';

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: 1,
      minute: 0,
      second: 0
    }
  }

  onHourUp(e) {
    e.preventDefault();

    this.setState({ hour:  this.state.hour === 24 ? 0 : (this.state.hour + 1) });
  }

  onHourDown(e) {
    e.preventDefault();

    this.setState({ hour: this.state.hour === 0 ? 24 : (this.state.hour - 1) });
  }

  onMinuteUp(e) {
    e.preventDefault();

    this.setState({ minute: this.state.minute === 59 ? 0 : (this.state.minute + 1) });
  }

  onMinuteDown(e) {
    e.preventDefault();

    this.setState({ minute: this.state.minute === 0 ? 59 : (this.state.minute - 1) });
  }

  onSecondUp(e) {
    e.preventDefault();

    this.setState({ second: this.state.second === 59 ? 0 : (this.state.second + 1) });
  }

  onSecondDown(e) {
    e.preventDefault();

    this.setState({ second: this.state.second === 0 ? 59 : (this.state.second - 1) });
  }

  render() {
      return (
        <div className={this.props.className + '__Panel'}>
          <div className={this.props.className + '__Panel__Hour'}>
            <button onClick={(e) => this.onHourUp(e)}></button>
            <label>{this.state.hour}</label>
            <button onClick={(e) => this.onHourDown(e)}></button>
          </div>:
          <div className={this.props.className + '__Panel__Minute'}>
            <button onClick={(e) => this.onMinuteUp(e)}></button>
            <label>{this.state.minute}</label>
            <button onClick={(e) => this.onMinuteDown(e)}></button>
          </div>:
          <div className={this.props.className + '__Panel__Second'}>
            <button onClick={(e) => this.onSecondUp(e)}></button>
            <label>{this.state.second}</label>
              <button onClick={(e) => this.onSecondDown(e)}></button>
          </div>
        </div>
      );
  }
}
