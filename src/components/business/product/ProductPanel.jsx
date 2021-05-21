import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import qs from "query-string";

// Components
import AllProducts from "./menu/AllProducts";
import AllProductCategories from "./menu/category/AllProductCategories";

import Cart from "./cart/Cart";
import ProductScheduleWindow from "./menu/ProductScheduleWindow";
import TransportationPanel from "./transportation/TransportationPanel";

// Redux
import {
  BusinessActionType,
  ProductActionType,
  ScheduleActionType,
  OfferActionType,
} from "../../../store/actiontypes";
import { getSchedules, getProducts, getOffers, addOfferToCart } from "../../../store/actions";
//constants
import {
  ScheduleStatus,
  OfferStatus,
  TransportationType,
  DEFAULT_PRODUCT_CATEGORY,
} from "../../../constants";

//scss
import "./ProductPanel.scss";

const numberOfDays = 7;
class ProductPanel extends Component {
  constructor(props) {
    super(props);
    const start = new Date();
    if (this.props.location.search) {
      try {
        //for week range of schedules
        const parsedParam = qs.parse(this.props.location.search)["day"].split("-");
        start.setDate(parsedParam[0]);
        start.setMonth(parsedParam[1] - 1); //moment give 1 based and month and javascipt core follows 0 based month
        start.setFullYear(parsedParam[2]); //set year to go to a schedule of next year
      } catch {}
    }
    const day = start.getDay();
    const diff = start.getDate() - day + 1; // adjust when day is sunday
    const startOfWeek = new Date(start.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    const end = new Date(startOfWeek);
    end.setHours(startOfWeek.getHours() + 6 * 24);
    end.setHours(23, 59, 59, 999);

    this.state = {
      isCheckoutDisabled: false,
      isLoading: true,
      isProductLoading: true,
      isScheduleLoading: true,
      isOfferLoading: true,
      filteredScheduleProducts: [],
      filteredSchedules: [],
      selectedScheduleId: null,
      dateRange: {
        start: startOfWeek,
        end,
      },
    };
  }

  componentDidMount = () => {
    const { business } = this.props;

    if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
      this.getOffers();
      this.getProducts();
      this.getSchedules();
    }
  };

  componentDidUpdate = (prevProps) => {
    const { business, product, schedule, transportation, offer } = this.props;

    if (business.status !== prevProps.business.status) {
      if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
        this.setState(
          {
            isLoading: true,
            isProductLoading: true,
            isScheduleLoading: true,
            isOfferLoading: true,
          },
          () => {
            this.getOffers();
            this.getProducts();
            this.getSchedules();
          }
        );
      }
    }

    if (product.status !== prevProps.product.status) {
      if (
        product.status === ProductActionType.GET_PRODUCTS_SUCCESS ||
        product.status === ProductActionType.GET_PRODUCTS_ERROR
      ) {
        const isLoading = this.state.isScheduleLoading || this.state.isOfferLoading;
        this.setState({
          isLoading,
          isProductLoading: false,
          ...this.filterProducts(),
        });
      }
    }

    if (schedule.status !== prevProps.schedule.status) {
      if (
        schedule.status === ScheduleActionType.GET_SCHEDULES_SUCCESS ||
        schedule.status === ScheduleActionType.GET_SCHEDULES_ERROR
      ) {
        const isLoading = this.state.isProductLoading || this.state.isOfferLoading;
        this.setState({
          isLoading,
          isScheduleLoading: false,
          ...this.filterProducts(),
        });
      }
    }

    if (offer.status !== prevProps.offer.status) {
      if (
        offer.status === OfferActionType.GET_OFFERS_SUCCESS ||
        offer.status === OfferActionType.GET_OFFERS_ERROR
      ) {
        const isLoading = this.state.isProductLoading || this.state.isScheduleLoading;

        this.setState({
          isLoading,
          isOfferLoading: false,
          ...this.filterProducts(),
        });
      }
    }

    if (
      transportation.value !== prevProps.transportation.value ||
      product.value.selectedCategory !== prevProps.product.value.selectedCategory
    ) {
      this.setState({
        ...this.filterProducts(),
      });
    }
  };

  getSchedules = () => {
    const businessId = this.props.business.value.id;
    const { dateRange } = this.state;

    this.props.getSchedules(
      {
        id: businessId,
      },
      {
        dateRange: {
          start: dateRange.start.getTime(),
          end: dateRange.end.getTime(),
        },
        statuses: [ScheduleStatus.ACTIVE],
      }
    );
  };

  getOffers = () => {
    const businessId = this.props.business.value.id;
    const { dateRange } = this.state;

    this.props.getOffers(
      {
        id: businessId,
      },
      {
        dateRange: {
          start: dateRange.start.getTime(),
          end: dateRange.end.getTime(),
        },
        statuses: [OfferStatus.ACTIVE],
      }
    );
  };

  getProducts = () => {
    const businessId = this.props.business.value.id;

    this.props.getProducts({
      id: businessId,
    });
  };

  getNextWeek = () => {
    const {
      dateRange: { end },
    } = this.state;
    const newStart = new Date(end);
    // Start from next day
    newStart.setHours(newStart.getHours() + 24);
    newStart.setHours(0, 0, 0, 0);

    const newEnd = new Date(end);
    newEnd.setHours(newStart.getHours() + numberOfDays * 24);
    newEnd.setHours(23, 59, 59, 999);

    this.setState(
      {
        isLoading: true,
        isScheduleLoading: true,
        isOfferLoading: true,
        dateRange: {
          start: newStart,
          end: newEnd,
        },
      },
      () => {
        this.getSchedules();
        this.getOffers();
      }
    );
  };

  getPreviousWeek = () => {
    const {
      dateRange: { start },
    } = this.state;
    const newStart = new Date(start);
    newStart.setHours(start.getHours() - numberOfDays * 24);
    newStart.setHours(0, 0, 0, 0);

    const newEnd = new Date(start);
    // End the day before
    newEnd.setHours(start.getHours() - 24);
    newEnd.setHours(23, 59, 59, 999);

    this.setState(
      {
        isLoading: true,
        isScheduleLoading: true,
        isOfferLoading: true,
        dateRange: {
          start: newStart,
          end: newEnd,
        },
      },
      () => {
        this.getSchedules();
        this.getOffers();
      }
    );
  };

  filterProducts = () => {
    const { schedule, transportation } = this.props;
    const { transportationType, selectedAddressId } = transportation.value;

    const today = new Date().getTime();

    const filteredSchedules =
      transportationType === TransportationType.DELIVERY
        ? schedule.value.edges.filter(
            (e) => e.node.type === TransportationType.DELIVERY && e.node.orderCutoff > today
          )
        : schedule.value.edges.filter(
            (e) =>
              e.node.type === TransportationType.PICK_UP &&
              e.node.pickupAddresses.some((a) => a.id === selectedAddressId) &&
              e.node.orderCutoff > today
          );

    const selectedScheduleId = filteredSchedules.length > 0 ? filteredSchedules[0].node.id : null;
    const filteredScheduleProducts = this.findSelectedScheduleProducts(selectedScheduleId);

    return {
      selectedScheduleId,
      filteredSchedules,
      filteredScheduleProducts,
    };
  };

  onScheduleChange = (selectedScheduleId) => {
    const filteredScheduleProducts = this.findSelectedScheduleProducts(selectedScheduleId);

    this.setState({
      selectedScheduleId,
      filteredScheduleProducts,
    });
  };

  findSelectedScheduleProducts = (selectedScheduleId) => {
    const { offer, product } = this.props;
    const { selectedCategory } = product.value;
    const filteredOffers = offer.value.edges.filter(
      (e) => e.node.scheduleId === selectedScheduleId
    );

    const filteredScheduleProducts = product.value.edges
      .filter((e) => filteredOffers.find((o) => o.node.productId === e.node.id))
      .filter(
        (e) =>
          selectedCategory === DEFAULT_PRODUCT_CATEGORY ||
          e.node.categories.includes(selectedCategory)
      );

    return filteredScheduleProducts;
  };

  addToCart = (product, quantity) => {
    const { selectedScheduleId } = this.state;
    const { offer, schedule, transportation } = this.props;
    const { selectedAddressId, transportationType } = transportation.value;

    const selectedScheduleNode = schedule.value.edges.find((e) => e.node.id === selectedScheduleId);

    const foundOfferNode = offer.value.edges.find(
      (e) => e.node.scheduleId === selectedScheduleId && e.node.productId === product.id
    );

    const cartBusiness = this.getCartBusiness();

    if (
      selectedScheduleNode &&
      cartBusiness &&
      selectedScheduleNode.node.type !== cartBusiness.transportationType
    ) {
      this.props.onShowClearCart();
    } else if (
      cartBusiness &&
      transportationType === TransportationType.PICK_UP &&
      cartBusiness.selectedAddressId !== selectedAddressId
    ) {
      this.props.onShowClearCart();
    } else {
      this.props.addOfferToCart(product, foundOfferNode.node, quantity);
    }
  };

  getCartBusiness = () => {
    const { business, cart } = this.props;
    const businessId = business.value.id;

    const businessInCart = cart.value.businessSchedules.find((b) => b.id === businessId);

    if (businessInCart) {
      return businessInCart;
    }

    return null;
  };

  render() {
    const {
      dateRange,
      selectedScheduleId,
      filteredSchedules,
      filteredScheduleProducts,
      isLoading,
    } = this.state;
    const { isMobileView } = this.props;

    return (
      <div>
        <Row gutter={[15, 15]}>
          <Col span={isMobileView ? 24 : 14}>
            <div className="all-products-and-schedule">
              <AllProductCategories
                isLoading={isLoading}
                products={filteredScheduleProducts}
                isMobileView={isMobileView}
              />
              <ProductScheduleWindow
                dateRange={dateRange}
                isMobileView={isMobileView}
                getNextWeek={this.getNextWeek}
                products={filteredScheduleProducts.map((p) => p.node.categories)}
                getPreviousWeek={this.getPreviousWeek}
                className="mobile-view-top-schedule-window"
                isCheckoutDisabled={this.props.isCheckoutDisabled}
                showIcons
              />
            </div>
            <TransportationPanel
              onShowAddressForm={this.props.onShowAddressForm}
              onShowLogin={this.props.onShowLogin}
              isLoading={isLoading}
              selectedScheduleId={selectedScheduleId}
              schedules={filteredSchedules}
              onScheduleChange={this.onScheduleChange}
            />
            <AllProducts
              isLoading={isLoading}
              dateRange={dateRange}
              products={filteredScheduleProducts}
              isCheckoutDisabled={this.props.isCheckoutDisabled}
              addToCart={this.addToCart}
            />
            <ProductScheduleWindow
              dateRange={dateRange}
              getNextWeek={this.getNextWeek}
              getPreviousWeek={this.getPreviousWeek}
              isCheckoutDisabled={this.props.isCheckoutDisabled}
              className="mobile-view-bottom-schedule-window"
              showIcons
            />
          </Col>

          {!isMobileView && (
            <Col span={isMobileView ? 24 : 10}>
              <Cart
                onShowLogin={this.props.onShowLogin}
                isCheckoutDisabled={this.props.isCheckoutDisabled}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    business: state.business.id,
    offer: state.business.offer,
    product: state.business.product,
    schedule: state.business.schedule,
    transportation: state.business.transportation,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (input) => dispatch(getProducts(input)),
    getSchedules: (input, filters) => dispatch(getSchedules(input, filters)),
    getOffers: (input, filters) => dispatch(getOffers(input, filters)),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPanel));
