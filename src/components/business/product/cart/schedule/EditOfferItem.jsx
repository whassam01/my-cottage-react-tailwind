import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { Bin } from "../../../../common/icons/Icons";

const FormFieldContent = {
  QUANTITY: {
    title: "QUANTITY",
    label: "Quantity",
    field: "quantity",
  },
};

class EditOfferItem extends Component {
  render() {
    const {
      offer: { product, quantity },
    } = this.props;
    const { saveEditOffers } = this.props;
    const { QUANTITY } = FormFieldContent;

    const removeOfferContainer = (
      <span className="delete-cart-icon" onClick={this.props.removeOffer}>
        <Bin className="business-cart-bin" />
      </span>
    );

    const quantityContainer = (
      <form onSubmit={((e) => e.preventDefault(), saveEditOffers)}>
        <div className="edit-offer-quantity flex">
          <Input
            value={quantity}
            // onKeyDown={saveEditOffers}
            name={QUANTITY.field}
            placeholder={QUANTITY.label}
            onChange={(e) => this.props.onQuantityChange(e.target.value)}
          />
        </div>
      </form>
    );

    const productTitleContainer = <div>{product.title}</div>;

    const totalAmount = ((product.price.amount * quantity) / 100).toFixed(2);
    const productPriceContainer = (
      <div>
        {product.price.currency.symbol}
        {totalAmount}
      </div>
    );

    return (
      <div className="product-cart-offer-item flex">
        <div className="product-cart-item-quantity flex">
          {removeOfferContainer}
          {quantityContainer}
          {productTitleContainer}
        </div>
        {productPriceContainer}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOfferItem);
