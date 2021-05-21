import React, { Component } from "react";
import { Modal } from "antd";
import ProfilePanel from "./../../../components/business/profile/ProfilePanel";

import "./MobileViewBusinessActions.scss";
import TransportationPanel from "../product/transportation/TransportationPanel";
import { displayablePhoneNumber } from "../../../utils";

class MobileViewBusinessActions extends Component {
  state = { profileVisible: false, transportVisible: false };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onShowTransportation = () => {
    this.setState({ transportVisible: true });
  };

  onHideTransportation = () => {
    this.setState({ transportVisible: false });
  };

  render() {
    const {
      profile: {
        value: { phoneNumber },
      },
    } = this.props;

    return (
      <>
        <div className="mobile-view-businsess-info-actions-wrapper">
          <div className="mobile-view-businsess-info-actions">
            <div className="business-about-options">
              <div className="business-info-phone">
                <span>
                  <img src={require("./../../../assets/common/phone.svg")} alt="" />
                </span>
                <span>
                  <a href={`tel:${phoneNumber}`} style={{ color: `#4c6889`, fontWeight: "600" }}>
                    {displayablePhoneNumber(phoneNumber)}
                  </a>
                </span>
              </div>
              <div
                className="business-about-button"
                onClick={() => this.setState({ profileVisible: true })}>
                <h3>About</h3>
              </div>
              {/* <div className="business-delivery-option-button">
                <button onClick={this.onShowTransportation}>
                  <img src={require("./../../../assets/common/faded-marker.svg")} alt="" />
                  Delivery options
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.profileVisible}
          onCancel={() => this.setState({ profileVisible: false })}
          footer={null}>
          <ProfilePanel />
        </Modal>
        <Modal
          visible={this.state.transportVisible}
          style={{ top: "20px" }}
          onCancel={this.onHideTransportation}
          footer={null}
          className="Transport-modal">
          <TransportationPanel
            onShowAddressForm={this.props.onShowAddressForm}
            onShowLogin={this.props.onShowLogin}
            onSaveTransportation={this.onHideTransportation}
          />
        </Modal>
      </>
    );
  }
}

export default MobileViewBusinessActions;
