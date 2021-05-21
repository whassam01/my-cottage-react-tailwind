import React, { Component } from "react";
import { connect } from "react-redux";

//components
import { NameValue } from "./../../common";

// Icons
import fadedmarker from "./../../../assets/common/faded-marker.svg";
import orangeMarker from "./../../../assets/common/orangeMarker.svg";
import orangeCheckbox from "./../../../assets/common/orangeCheckbox.svg";

//scss
import "./AddressItem.scss";

class AddressItem extends Component {
  render() {
    const { address, selectedAddressId, detailed, onAddressSelect, fullAddress } = this.props;
    const { street, city, country, postalCode, stateOrProvince, title } = address;

    const isSelected = selectedAddressId === address.id;
    return (
      <div
        onClick={onAddressSelect}
        className={`address-item-wrapper ${isSelected ? "active-address-item" : ""} ${
          detailed ? "detail-address-item-wrapper" : ""
        } ${!onAddressSelect ? "address-item-not-clickable" : ""}`}>
        <div className="address-item">
          {this.props.detailed ? (
            <div className="address-item-detailed">
              <div className="street-and-number">
                <NameValue name="STREET AND NUMBER" value={street} />
              </div>
              <div className="city-and-state">
                <NameValue name="CITY" value={city} />
                <NameValue name="STATE" value={stateOrProvince} />
              </div>
              <div className="country-and-zipcode">
                <NameValue name="COUNTRY" value={country} />
                <NameValue name="ZIPCODE" value={postalCode} />
              </div>
            </div>
          ) : (
            <>
              <div className="address-item-street">
                <img src={isSelected ? orangeMarker : fadedmarker} alt="" />
                {fullAddress ? (
                  <div>
                    <span>{street}, </span>
                    <span>
                      {city}, {stateOrProvince}
                    </span>
                    <span>
                      {postalCode}, {country}
                    </span>
                  </div>
                ) : title !== undefined ? (
                  `${street} - ${title}`
                ) : (
                  street
                )}
              </div>
              <div>{isSelected && <img src={orangeCheckbox} alt="" />}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(AddressItem);

AddressItem.defaultProps = {
  detailed: false,
  fullAddress: false,
};
