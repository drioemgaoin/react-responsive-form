import React from 'react';
import classnames from 'classnames';

export default class TimePicker extends React.Component {
  render() {
      const className = classnames('TimePicker', this.props.className);
      return (
        <div className={className}>
          I'm a panel
        </div>
      );
  }
}
