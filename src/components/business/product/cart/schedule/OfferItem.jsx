import React, { Component } from "react";
import { connect } from "react-redux";

class OfferItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offerHasError: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    const { offer } = this.props;

    if (offer.error !== undefined && !this.state.offerHasError) {
      this.setState({ offerHasError: true });
    } else if (offer.error === undefined && this.state.offerHasError) {
      this.setState({ offerHasError: false });
    }
  };

  render() {
    const {
      scheduleHasError,
      offer: { product, quantity },
    } = this.props;
    const { offerHasError } = this.state;

    const quantityContainer = (
      <div
        className="product-offer-quantity"
        style={{ color: offerHasError || scheduleHasError ? "#fb5a5a" : "" }}>
        x{quantity}
      </div>
    );

    const productTitleContainer = (
      <div style={{ color: offerHasError || scheduleHasError ? "#fb5a5a" : "" }}>
        {product.title}
      </div>
    );

    const totalAmount = ((product.price.amount * quantity) / 100).toFixed(2);
    const productPriceContainer = (
      <div style={{ color: offerHasError || scheduleHasError ? "#fb5a5a" : "" }}>
        {product.price.currency.symbol}
        {totalAmount}
      </div>
    );

    return (
      <div className="product-cart-offer-item flex">
        <div className="product-cart-item-quantity flex">
          {quantityContainer}
          {productTitleContainer}
        </div>
        {productPriceContainer}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferItem);
