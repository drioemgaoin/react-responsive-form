import React from 'react';

import moment from 'moment';
import classnames from 'classnames';

export default class DatePicker extends FieldComponent {
  constructor (props) {
    super(props)
    this.state = {
      date: this.localizeMoment(this.getDateInView()),
      selectingDate: null
    }
  }

  localizeMoment(date) {
    return date.clone().locale(this.props.locale || moment.locale());
  }

  renderPreviousMonthButton() {
    if (!this.props.forceShowMonthNavigation && allDaysDisabledBefore(this.state.date, 'month', this.props)) {
      return null;
    }

    return <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth} />
  }

  renderPreviousMonthButton() {
    if (!this.props.forceShowMonthNavigation && allDaysDisabledBefore(this.state.date, 'month', this.props)) {
      return null;
    }

    return <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth} />
  }

  render () {
    const classNam = classnames('datepicker', this.props.className);
    return (
      <div className={classnames('datepicker', this.props.className)}>
        <div className="datepicker__triangle" />
        {this.renderPreviousMonthButton()}
        {this.renderNextMonthButton()}
      </div>
    )
  }
}
