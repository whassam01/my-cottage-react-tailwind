import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CartIcon, DeleteIcon, EmptyCartIcon, Bin } from "../icons/Icons";
import { Dropdown, Menu } from "antd";

class UnconnectedToolbarCart extends Component {
  getBusinessCart = (business) => {
    const { schedules } = business;
    let numberOfItems = 0;
    let subTotal = 0;
    let currency;

    schedules.forEach((s) => {
      s.offers.forEach((o) => {
        numberOfItems += o.quantity;
        subTotal += o.product.price.amount * o.quantity;
        currency = o.product.price.currency.symbol;
      });
    });

    return {
      numberOfItems,
      currency,
      subTotal: (subTotal / 100).toFixed(2),
    };
  };
  render() {
    const { totalValueInCart, cart } = this.props;
    const businessSchedulesContainer = (
      <Menu className="view-menu cart-menu">
        <Menu.Item key="1" className="cart-products-list">
          <p className="cart-dropdown-title">Active Carts</p>{" "}
          <span className="close-button">
            <DeleteIcon />
          </span>
        </Menu.Item>
        {cart.value.businessSchedules.map((b) => {
          const businessCart = this.getBusinessCart(b);
          return (
            <Menu.Item key={b.id} className="cart-products-list">
              <div>
                <p
                  className="cart-dropdown-domain"
                  onClick={() => this.props.history.push(`/${b.urlDomain}/${b.urlSubdomain}`)}>
                  {b.profile.title}
                </p>
                <p className="cart-dropdown-item">{`${businessCart.numberOfItems} items, subtotal is ${businessCart.currency}${businessCart.subTotal}`}</p>
              </div>
              <span
                className="delete-cart-icon"
                onClick={() => this.props.clearBusinessScheduleInCart(b.id)}>
                <Bin className="toolbar-cart-bin" />
              </span>
            </Menu.Item>
          );
        })}
        {cart.value.businessSchedules.length === 0 && (
          <Menu.Item className="cart-products-list no-item">
            <p>No active carts</p>
            <span className="empty-cart-icon">
              <EmptyCartIcon />
            </span>
          </Menu.Item>
        )}
      </Menu>
    );
    return (
      <>
        <Dropdown
          overlay={businessSchedulesContainer}
          trigger={["click"]}
          placement={"bottomRight"}
          overlayClassName={"cart-overlay-menu"}>
          <span className="cart-dropdown-icon">
            <CartIcon value={totalValueInCart} />
          </span>
        </Dropdown>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export const ToolbarCart = withRouter(connect(mapStateToProps, null)(UnconnectedToolbarCart));
