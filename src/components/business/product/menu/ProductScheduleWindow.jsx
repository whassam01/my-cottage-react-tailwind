import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

//styles
import "./ProductScheduleWindow.scss";

class ProductScheduleWindow extends Component {
  state = {
    filter: [],
  };
  isInTheFuture = (time) => {
    const today = new Date();
    return time > today.getTime();
  };
  render() {
    const { dateRange, showIcons } = this.props;
    const dateFormat = "MMM DD";
    return (
      <div
        className={`product-schedule-window-wrapper ${
          this.props.className ? this.props.className : ""
        }`}>
        <div className="product-schedule-window">
          <div className="pagination-wrapper">
            <div
              onClick={() => {
                if (this.isInTheFuture(dateRange.start)) {
                  this.props.getPreviousWeek();
                }
              }}
              className={`product-schedule-previous-button ${
                this.isInTheFuture(dateRange.start)
                  ? `product-schedule-active-button`
                  : `product-schedule-inactive-button`
              }`}>
              {showIcons ? (
                <span
                  className={`product-schedule-icon ${
                    this.isInTheFuture(dateRange.start) ? `` : `product-schedule-icon-past`
                  }`}>
                  <CaretLeftOutlined />
                </span>
              ) : (
                <button>Previous</button>
              )}
            </div>
            <div className="product-schedule-week-range">
              <span>
                {moment(dateRange.start).format(dateFormat)} -{" "}
                {moment(dateRange.end).format(dateFormat)}
              </span>
            </div>
            <div
              onClick={this.props.getNextWeek}
              className={`product-schedule-next-button ${
                this.isInTheFuture(dateRange.end)
                  ? `product-schedule-active-button`
                  : `product-schedule-inactive-button`
              }`}>
              {showIcons ? (
                <span className="product-schedule-icon">
                  <CaretRightOutlined />
                </span>
              ) : (
                <button>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps, null)(ProductScheduleWindow);

ProductScheduleWindow.defaultProps = {
  showIcons: false,
};
