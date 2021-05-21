import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

//styles
import "./ProductOfferItem.scss";

class ProductOfferItem extends Component {
  getOfferQuantity = () => {
    const {
      business,
      offer: { id, scheduleId },
      cart,
    } = this.props;
    const businessId = business.value.id;
    const businessSchedules = cart.value.businessSchedules.find((b) => b.id === businessId);
    const schedules = businessSchedules ? businessSchedules.schedules : [];
    const schedule = schedules.find((s) => s.id === scheduleId);
    const offer = schedule ? schedule.offers.find((o) => o.id === id) : null;

    return offer ? offer.quantity : 0;
  };

  render() {
    const { offer, activeIndex, index } = this.props;
    const { orderReadyStart, orderReadyEnd } = offer.schedule.node;
    const offerStartTime = moment(orderReadyStart).format("LT");
    const offerEndTime = moment(orderReadyEnd).format("LT");
    const offerQuantity = this.getOfferQuantity();

    return (
      <div
        className={`product-offer-item-wrapper ${
          index === activeIndex ? "product-offer-item-active" : ""
        }`}
        onClick={this.props.onClickAction}>
        <div className="product-offer-item">
          <div className="product-offer-time">{`${offerStartTime} - ${offerEndTime}`}</div>
          {offerQuantity > 0 && <div className="product-offer-quantity">{offerQuantity}</div>}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductOfferItem);
