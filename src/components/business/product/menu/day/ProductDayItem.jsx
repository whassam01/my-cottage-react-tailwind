import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { ReactComponent as Tick } from "../../../../../assets/business/product/tick.svg";
//styles
import "./ProductDayItem.scss";
import { Tooltip } from "antd";
class ProductDayItem extends Component {
  render() {
    const { day, activeIndex, index, offerDay, offersByDay, business, cart, product } = this.props;
    const date = moment(day).local().format("ddd MMMM DD").split(" ");
    const isActive = activeIndex === index;

    const hasOffers = offersByDay.some((item) => {
      if (moment(item.day).isSame(day, "day")) return item.offers.length !== 0;
      return false;
    });

    //condition for detecting items in cart
    const businessId = business.value.id;
    const businessSchedules = cart.value.businessSchedules.find((b) => b.id === businessId);
    const schedules = businessSchedules ? businessSchedules.schedules : [];

    const daySchedules = schedules.filter((s) => {
      const startDay = new Date(s.orderReadyStart);

      return (
        startDay.getFullYear() === day.getFullYear() &&
        startDay.getMonth() === day.getMonth() &&
        startDay.getDate() === day.getDate()
      );
    });

    let numberOfItemsInCart = 0;
    daySchedules.forEach((s) => {
      s.offers.forEach((o) => {
        if (o.product.id === product.id) {
          numberOfItemsInCart += o.quantity;
        }
      });
    });
    return (
      <Tooltip
        overlayClassName="disabled-day-card-tooltip"
        title={!hasOffers && `Nothing available on this day`}>
        <div
          className={`
          order-day-item-wrapper
          ${isActive && offerDay.offers.length > 0 ? "order-day-active-item" : ""}
          ${hasOffers && !this.props.isCheckoutDisabled ? "day-item-has-offers" : ""}
      `}
          onClick={() => this.props.onClickAction(index)}>
          {numberOfItemsInCart > 0 && (
            <div className="order-day-item-badge">
              <div>
                <span>{<Tick className="order-day-item-tick" />}</span>
              </div>
            </div>
          )}
          <div className="order-day-item-month">
            <div>
              <span>{date[1]}</span>
            </div>
          </div>
          <div className="order-day-item-day-of-month">
            <div>
              <span>{date[2]}</span>
            </div>
          </div>
          <div className="order-day-item-day-of-week">
            <div>
              <span>{date[0]}</span>
            </div>
          </div>
        </div>
      </Tooltip>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.business.id,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDayItem);
