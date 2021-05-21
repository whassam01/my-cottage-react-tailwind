import React, { Component } from "react";
import moment from "moment";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export class DateRangeFilter extends Component {
  render() {
    const { onDateChange, startTime, endTime } = this.props;
    return (
      <div>
        <RangePicker
          onChange={onDateChange}
          defaultValue={[moment(startTime), moment(endTime)]}
          placeholder={["From", "To"]}
        />
      </div>
    );
  }
}
