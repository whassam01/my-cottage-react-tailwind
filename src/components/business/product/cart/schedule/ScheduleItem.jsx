import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactDOM from "react-dom";
// Components
import OfferItem from "./OfferItem";
import EditOfferItem from "./EditOfferItem";

// Redux
import { setScheduleOffers } from "../../../../../store/actions";
import { ScheduleDisplayType, MAX_OFFER_QUANTITY } from "../../../../../constants";

class ScheduleItem extends Component {
  constructor(props) {
    super(props);
    const { schedule } = this.props;
    this.state = {
      isEditOffersVisible: false,
      offers: schedule.offers,
      hasError: false,
    };
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    event.preventDefault();
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState(
        {
          isEditOffersVisible: false,
        },
        () => this.saveEditOffers()
      );
    }
  };

  componentDidUpdate = (prevProps) => {
    const {
      cart,
      schedule: { id, offers },
    } = this.props;
    const { isEditOffersVisible } = this.state;

    if (!this.props.isCheckoutDisabled && !isEditOffersVisible && offers !== this.state.offers) {
      this.setState({ offers });
    }

    const order = cart.value.orders.find((o) => o.schedule.id === id);
    if (order === undefined && this.state.hasError) {
      this.setState({
        hasError: false,
      });
    } else if (order && order.error !== undefined && !this.state.hasError) {
      this.setState({
        hasError: true,
      });
    } else if (order && order.error === undefined && this.state.hasError) {
      this.setState({
        hasError: false,
      });
    }
  };

  showEditOffers = () => {
    if (!this.props.isCheckoutDisabled) {
      this.setState({
        isEditOffersVisible: true,
      });
    }
  };

  removeOffer = (offerId) => {
    const { schedule } = this.props;
    const { offers } = this.state;
    const updatedOffers = offers.filter((o) => o.id !== offerId);

    if (updatedOffers.length === 0) {
      this.props.setScheduleOffers(schedule.id, updatedOffers);
    } else {
      this.setState({ offers: updatedOffers });
    }
  };

  saveEditOffers = () => {
    const { schedule } = this.props;
    const { offers } = this.state;
    const updatedOffers = offers.filter((o) => o.quantity !== 0);
    this.setState(
      {
        isEditOffersVisible: false,
      },
      () => this.props.setScheduleOffers(schedule.id, updatedOffers)
    );
  };

  cancelEditOffers = () => {
    const {
      schedule: { offers },
    } = this.props;
    this.setState({
      isEditOffersVisible: false,
      offers,
    });
  };

  onOfferQuantityChange = (offerId, quantity) => {
    const updatedOffers = this.state.offers.map((o) =>
      o.id === offerId
        ? {
            ...o,
            quantity: quantity
              ? isNaN(quantity)
                ? o.quantity
                : Number(quantity) > MAX_OFFER_QUANTITY
                ? MAX_OFFER_QUANTITY
                : Number(quantity)
              : 0,
          }
        : o
    );

    this.setState({ offers: updatedOffers });
  };

  render() {
    const { schedule, isMobileView, isCheckoutDisabled } = this.props;
    const { isEditOffersVisible, offers } = this.state;
    if (!schedule) {
      return <></>;
    }

    const scheduleDateContainer = (
      <div style={{ color: this.state.hasError ? "#fb5a5a" : "" }}>
        {isMobileView
          ? moment(schedule.orderReadyStart).format("ddd, MMM D")
          : moment(schedule.orderReadyStart).format("dddd, MMM D")}
      </div>
    );

    const scheduleWindowContainer = (
      <div className="offer-item-estimated" style={{ color: this.state.hasError ? "#fb5a5a" : "" }}>
        Estimated {ScheduleDisplayType[schedule.type]} between{" "}
        {moment(schedule.orderReadyStart).format("h:mm a")}
        {" - "}
        {moment(schedule.orderReadyEnd).format("h:mm a")}
      </div>
    );

    return (
      <div
        onClick={this.showEditOffers}
        className={
          isEditOffersVisible ? "product-schedule-item cart-edit-effect" : "product-schedule-item "
        }>
        <div className="Plans-cart-total flex">{scheduleDateContainer}</div>

        {offers.map((offer) =>
          isEditOffersVisible ? (
            <EditOfferItem
              key={offer.id}
              offer={offer}
              saveEditOffers={this.saveEditOffers}
              isCheckoutDisabled={isCheckoutDisabled}
              removeOffer={() => this.removeOffer(offer.id)}
              onQuantityChange={(quantity) => this.onOfferQuantityChange(offer.id, quantity)}
            />
          ) : (
            <OfferItem
              key={offer.id}
              scheduleId={schedule.id}
              scheduleHasError={this.state.hasError}
              offer={offer}
            />
          )
        )}
        {scheduleWindowContainer}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setScheduleOffers: (scheduleId, offers) => dispatch(setScheduleOffers({ scheduleId, offers })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleItem);
