import React, { Component } from "react";

import AllCards from "./../card/AllCards";
import "./CheckoutCard.scss";

class CheckoutCard extends Component {
  render() {
    return (
      <div className="card-and-address-wrapper">
        <div className="card-and-address">
          <AllCards
            applyCard={this.props.applyCard}
            showAddCard={this.props.showAddCard}
            hideAddCard={this.props.hideAddCard}
            orderHasCard={this.props.orderHasCard}
            selectedCardId={this.props.selectedCardId}
            stepNumber={this.props.stepNumber}
          />
        </div>
      </div>
    );
  }
}

export default CheckoutCard;
