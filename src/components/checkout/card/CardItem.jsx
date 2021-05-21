import React, { Component } from "react";
import { connect } from "react-redux";

//components
import { PaymentIcons } from "./../../../components/common";
//icons
import orangeCheckbox from "./../../../assets/common/orangeCheckbox.svg";
//scss
import "./CardItem.scss";

class CardItem extends Component {
  render() {
    const { card, selectedCardId, onCardSelect, showExpiry } = this.props;
    let { lastFour, brand, expMonth, expYear } = card;
    expMonth = expMonth.length === 2 ? expMonth : "0" + expMonth;
    const isSelected = selectedCardId === card.id;
    return (
      <div
        className={`card-item-wrapper ${isSelected ? "active-card-item" : ""} ${
          !onCardSelect ? "card-item-not-clickable" : ""
        }`}
        onClick={onCardSelect}>
        <div className="card-item">
          <div>
            <div className="card-item-brand">
              <PaymentIcons brand={brand} className="checkout-payment-icon" />
            </div>
            <div className="card-item-number">
              <span>**** **** **** {lastFour}</span>
              {showExpiry && (
                <span>
                  Exp: {expMonth}/{expYear}
                </span>
              )}
            </div>
          </div>
          <div>{isSelected && <img src={orangeCheckbox} alt="" />}</div>
        </div>
      </div>
    );
  }
}

CardItem.defaultProps = {
  showExpiry: false,
};

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(CardItem);
