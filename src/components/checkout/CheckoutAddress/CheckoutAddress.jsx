import React, { Component } from "react";

//components
import AllAddresses from "./../address/AllAddresses";
// import AllCards from "./../card/AllCards";
//scss
import "./CheckoutAddress.scss";

class CheckoutAddress extends Component {
  render() {
    return (
      <div className="card-and-address-wrapper">
        <div className="card-and-address">
          <AllAddresses
            applyAddress={this.props.applyAddress}
            showAddAddress={this.props.showAddAddress}
            orderHasAddress={this.props.orderHasAddress}
            selectedAddressId={this.props.selectedAddressId}
            stepNumber={this.props.stepNumber}
          />
        </div>
      </div>
    );
  }
}

export default CheckoutAddress;
