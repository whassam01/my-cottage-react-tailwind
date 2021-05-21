import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { withRouter } from "react-router-dom";
import moment from "moment";
import qs from "query-string";

// Components
import ProductDayItem from "./ProductDayItem";
import ProductOfferItem from "./ProductOfferItem";

// Redux
import { addOfferToCart } from "../../../../../store/actions";

//styles
import "./AllProductDays.scss";
import { PlusAddonIcon, MinusAddonIcon, PlusIcon, PrimaryButton } from "../../../../common";
import { MAX_OFFER_QUANTITY, ScheduleDisplayType } from "../../../../../constants";
const oneDay = 24 * 60 * 60 * 1000;

class AllProductDays extends Component {
  constructor(props) {
    super(props);
    const {
      dateRange: { start, end },
    } = this.props;

    this.state = {
      selectedDayIndex: null,
      selectedOfferIndex: null,
      quantity: 1,
      offersByDay: this.initializeOffersByDay(start, end),
    };
  }

  componentDidMount = () => {
    const offersByDay = this.groupOffersByDay();
    this.setState({ offersByDay });
  };

  componentDidUpdate = (prevProps) => {
    const {
      offers,
      dateRange: { start, end },
    } = this.props;

    if (start !== prevProps.dateRange.start || end !== prevProps.dateRange.end) {
      this.setState({ offersByDay: this.initializeOffersByDay(start, end) });
    }

    if (offers !== prevProps.offers) {
      this.setState({ offersByDay: this.groupOffersByDay() });
    }
  };

  initializeOffersByDay = (start, end) => {
    const numberOfDays = Math.ceil(Math.abs((end - start) / oneDay));
    const offersByDay = [];
    const startTime = new Date(start);

    for (var i = 0; i < numberOfDays; i++) {
      offersByDay.push({
        day: new Date(startTime),
        offers: [],
      });
      startTime.setDate(startTime.getDate() + 1);
    }

    return offersByDay;
  };

  groupOffersByDay = () => {
    const {
      dateRange: { start, end },
      offers,
    } = this.props;

    const offersByDay = this.initializeOffersByDay(start, end);
    const startDay = new Date(start);
    offers.forEach((edge) => {
      const { schedule } = edge.node;
      const orderReadyStart = new Date(schedule.node.orderReadyStart);
      orderReadyStart.setHours(0, 0, 0, 0);
      startDay.setHours(0, 0, 0, 0);
      // To calculate the time difference of two dates
      const diffInTime = orderReadyStart.getTime() - startDay.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      if (offersByDay[diffInDays] && offersByDay[diffInDays].offers) {
        offersByDay[diffInDays].offers.push(edge.node);
      }
    });

    return offersByDay;
  };

  showOffers = (selectedDayIndex, selectedDay) => {
    const urlParams = qs.parse(this.props.location.search);
    urlParams.day = moment(selectedDay).format("DD-MM-YYYY");
    this.props.history.push({
      pathname: this.props.match.url,
      search: qs.stringify(urlParams),
    });
    if (!this.props.isCheckoutDisabled) {
      this.setState({ selectedDayIndex, selectedOfferIndex: null });
    }
  };

  selectOffer = (selectedOfferIndex) => {
    if (!this.props.isCheckoutDisabled) {
      this.setState({ selectedOfferIndex });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && !isNaN(value)) {
      if (value > MAX_OFFER_QUANTITY) {
        this.setState({ [name]: MAX_OFFER_QUANTITY });
      } else {
        this.setState({ [name]: value });
      }
    }
  };

  addToCart = () => {
    const { product } = this.props;
    const { quantity, offersByDay, selectedDayIndex, selectedOfferIndex } = this.state;
    const offer = offersByDay[selectedDayIndex].offers[selectedOfferIndex];
    const scheduleType = this.getCartScheduleType();

    if (scheduleType && scheduleType !== offer.schedule.node.type) {
      this.props.onShowClearCart();
    } else if (!isNaN(quantity)) {
      this.props.addOfferToCart(product, offer, Number(quantity));
      this.setState({
        quantity: 1,
      });
    }
  };

  getCartScheduleType = () => {
    const { business, cart } = this.props;
    const businessId = business.value.id;

    const businessInCart = cart.value.businessSchedules.find((b) => b.id === businessId);

    if (businessInCart) {
      return businessInCart.schedules.length > 0 ? businessInCart.schedules[0].type : null;
    }

    return null;
  };

  quantityIncreament = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  };

  quantityDecreament = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity - 1 });
  };

  render() {
    const { offersByDay, selectedDayIndex, selectedOfferIndex, quantity } = this.state;
    const { isMobileView, product, isCheckoutDisabled, transportation } = this.props;

    const { transportationType } = transportation.value;
    return (
      <div>
        <div className="product-day-item-title">Choose from available days</div>
        <div className="product-day-item-wrapper">
          {offersByDay.map((offerDay, key) => (
            <ProductDayItem
              key={key}
              index={key}
              product={product}
              offerDay={offerDay}
              isCheckoutDisabled={this.props.isCheckoutDisabled}
              offersByDay={offersByDay}
              activeIndex={this.state.selectedDayIndex}
              day={offerDay.day}
              onClickAction={() => this.showOffers(key, offerDay.day)}
            />
          ))}
        </div>
        <div className="product-item-footer-buttons-wrapper">
          {!isCheckoutDisabled &&
            selectedDayIndex !== null &&
            offersByDay[selectedDayIndex].offers.length !== 0 && (
              <div>
                <div className="product-offer-item-time">
                  <h3> Choose a {ScheduleDisplayType[transportationType]} window </h3>{" "}
                  <div className="product-offer-item-day-cards">
                    {offersByDay[selectedDayIndex].offers
                      .sort(
                        (o1, o2) =>
                          o1.schedule.node.orderReadyStart - o2.schedule.node.orderReadyStart
                      )
                      .map((offer, key) => (
                        <ProductOfferItem
                          key={key}
                          index={key}
                          isCheckoutDisabled={this.props.isCheckoutDisabled}
                          activeIndex={selectedOfferIndex}
                          offer={offer}
                          onClickAction={() => this.selectOffer(key)}
                        />
                      ))}
                  </div>
                </div>
                <div className="product-offer-quantity-wrapper">
                  <div className="product-offer-item-quantity">
                    {!isMobileView && <h3>Quantity</h3>}
                    <Input
                      name="quantity"
                      value={isMobileView ? `QTY: ${quantity}` : quantity}
                      onChange={this.handleInputChange}
                      addonBefore={
                        isMobileView && (
                          <div onClick={this.quantityDecreament}>
                            <MinusAddonIcon />
                          </div>
                        )
                      }
                      addonAfter={
                        isMobileView && (
                          <div onClick={this.quantityIncreament}>
                            <PlusAddonIcon />
                          </div>
                        )
                      }
                    />
                  </div>
                  <div className="product-offer-item-button">
                    <PrimaryButton
                      text={"Add to Cart"}
                      eventHandler={this.addToCart}
                      icon={<PlusIcon />}
                      disabled={isCheckoutDisabled && selectedOfferIndex === null}
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
    transportation: state.business.transportation,
    cart: state.cart,
    business: state.business.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOfferToCart: (product, offer, quantity) =>
      dispatch(
        addOfferToCart({
          product,
          offer,
          quantity,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllProductDays));
