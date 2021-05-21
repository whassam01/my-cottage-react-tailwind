import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

// Components
import ProductItem from "./ProductItem";
import ProductItemSkeleton from "../ProductItemSkeleton/ProductItemSkeleton";

// Utils
import { TransportationType, ScheduleDisplayType } from "../../../../constants";

//scss
import "./AllProducts.scss";
class AllProducts extends Component {
  render() {
    const { dateRange, transportation, products, isLoading, isCheckoutDisabled } = this.props;
    const dateFormat = this.props.isMobileView ? "MMM DD" : "MMMM DD";
    const { transportationType, selectedAddressId, pickupAddresses } = transportation.value;

    let locationMessage;

    if (transportationType === TransportationType.PICK_UP) {
      const pickupAddress = pickupAddresses.edges.find((e) => e.node.id === selectedAddressId);
      if (pickupAddress) {
        locationMessage = `${pickupAddress.node.title ? `${pickupAddress.node.title},` : ""} ${
          pickupAddress.node.street
        }`;
      }
    }

    const noProductsFoundContainer = (
      <div className="no-products-wrapper">
        <div>
          <p style={{ marginBottom: "0px" }}>
            No products for the week of{" "}
            <span style={{ fontWeight: "800" }}>
              {moment(dateRange.start).format(dateFormat)} -{" "}
              {moment(dateRange.end).format(dateFormat)}
            </span>
          </p>
          <p>
            are available for {ScheduleDisplayType[transportationType]} {locationMessage && ` at`}
            {!locationMessage && ` to your address`}
          </p>
          {locationMessage && <h1>{locationMessage}</h1>}
        </div>
      </div>
    );

    return (
      <div>
        {!isLoading && products.length === 0 ? (
          noProductsFoundContainer
        ) : isLoading ? (
          <>
            <ProductItemSkeleton active={isLoading} />
            <ProductItemSkeleton active={isLoading} />
          </>
        ) : (
          products.map((p) => (
            <ProductItem
              key={p.node.id}
              isCheckoutDisabled={isCheckoutDisabled}
              product={p.node}
              isLoading={isLoading}
              addToCart={this.props.addToCart}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transportation: state.business.transportation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
