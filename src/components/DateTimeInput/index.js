import React from 'react';
import pad from 'pad';

export class DateTimeInput extends React.Component {
  state = {
    date: '',
    time: '',
  };

  setDate = ({ target: { value: date }}) => {
    const { time } = this.state;
    this.setValue(date, time);
  }

  setTime = ({ target: { value: time }}) => {
    const { date } = this.state;
    this.setValue(date, time);
  }

  setValue(date, time) {
    const { onChange } = this.props;
    const value = new Date(`${date} ${time}`);
    onChange(value);
  }

  render () {
    const { initialValue } = this.props;
    const { setDate, setTime } = this;

    const date = initialValue
      ? `${initialValue.getFullYear()}-${pad(2, initialValue.getMonth(), '0')}-${pad(2, initialValue.getDate(), '0')}`
      : '';
    const time = initialValue
      ? `${pad(2, initialValue.getHours(), '0')}:${pad(2, initialValue.getMinutes(), '0')}:${pad(2, initialValue.getSeconds(), '0')}`
      : '';

    return (
      <span>
        <input
          type="date"
          defaultValue={date}
          onChange={setDate} />
        <input
          type="time"
          defaultValue={time}
          onChange={setTime} />
      </span>
    );
  }
}

export default DateTimeInput;