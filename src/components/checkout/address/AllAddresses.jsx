import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin, Modal } from "antd";

// Components
import AddressItem from "./AddressItem";

// Redux
import { ConsumerActionType, CartActionType } from "../../../store/actiontypes";

//scss
import "./AllAddresses.scss";

// Utils
import { TransportationType, ConsumerRoles } from "../../../constants";

class AllAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      addressId: null,
      isShowAddressModal: false,
      transportationType: null,
    };
  }

  componentDidMount() {
    const { account } = this.props;
    if (
      account.status === ConsumerActionType.GET_CONSUMER_SUCCESS ||
      account.status === ConsumerActionType.GET_CONSUMER_ERROR
    ) {
      this.setState({ isLoading: false });
    }

    this.setTransportationType();
  }

  componentDidUpdate(prevProps) {
    const { account, cart } = this.props;

    if (account.status !== prevProps.account.status) {
      if (
        account.status === ConsumerActionType.GET_CONSUMER_SUCCESS ||
        account.status === ConsumerActionType.GET_CONSUMER_ERROR
      ) {
        this.setState({ isLoading: false });
      }
      this.setTransportationType();
    } else if (cart.status === CartActionType.GET_ACTIVE_ORDERS) {
      if (this.state.addressId === null) {
        this.setTransportationType();
      }
    }
  }

  setTransportationType = () => {
    const { orders } = this.props.cart.value;
    if (orders.length > 0 && orders[0].type === TransportationType.DELIVERY) {
      this.setState(
        {
          addressId: orders[0].consumerAddress.id,
          transportationType: TransportationType.DELIVERY,
        },
        () => this.props.selectedAddressId(this.state.addressId)
      );
    } else if (orders.length > 0 && orders[0].type === TransportationType.PICK_UP) {
      this.setState(
        {
          addressId: orders[0].pickupAddress.id,
          transportationType: TransportationType.PICK_UP,
        },
        () => this.props.selectedAddressId(this.state.addressId)
      );
    }
  };

  showAddressModal = () => {
    this.setState({ isShowAddressModal: true });
  };

  hideAddressModal = () => {
    this.setState({ isShowAddressModal: false });
  };

  onAddressSelectModal = () => {
    if (!this.state.addressId) return;
    this.props.applyAddress(this.state.addressId);
    this.props.selectedAddressId(this.state.addressId);
    this.hideAddressModal();
  };

  render() {
    const { edges } = this.props.address.value;
    const { orders } = this.props.cart.value;
    const isGuest = this.props.account.value?.role === ConsumerRoles.GUEST_CONSUMER;

    return (
      <Spin spinning={this.state.isLoading}>
        <div className="all-address">
          {this.state.transportationType === TransportationType.DELIVERY && (
            <div className="all-address-head">
              <div className="all-address-head-title">
                Step {this.props.stepNumber}: Delivery address
              </div>
              <div className="all-address-head-more">
                <span onClick={this.showAddressModal}>Change</span>
                {!isGuest && (
                  <>
                    <span></span>
                    <span onClick={this.props.showAddAddress}>Add</span>
                  </>
                )}
              </div>
            </div>
          )}
          {this.state.transportationType === TransportationType.PICK_UP && (
            <div className="all-address-head">
              <div className="all-address-head-title">Step 1: Pickup address</div>
            </div>
          )}
          <div className="all-address-body">
            {this.state.transportationType === TransportationType.DELIVERY && (
              <AddressItem address={orders[0]?.consumerAddress} fullAddress />
            )}
            {this.state.transportationType === TransportationType.PICK_UP && (
              <AddressItem address={orders[0].pickupAddress} fullAddress />
            )}
          </div>
          <Modal
            className="show-more-address-modal"
            footer={null}
            visible={this.state.isShowAddressModal}
            onCancel={this.hideAddressModal}>
            <div className="card-address-title">
              <h1>Delivery Address</h1>
            </div>
            <div className="address-modal-body">
              {edges.map((edge, key) => (
                <AddressItem
                  key={key}
                  onAddressSelect={() => {
                    this.setState({ addressId: edge.node.id });
                  }}
                  selectedAddressId={this.state.addressId}
                  address={edge.node}
                  detailed={this.props.isMobileView ? true : false}
                />
              ))}
            </div>
            <div
              className={`address-modal-select-button ${
                this.state.addressId ? "address-modal-select-button-active" : ""
              }`}>
              <Button onClick={this.onAddressSelectModal} block>
                Select
              </Button>
            </div>
          </Modal>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.consumer.account,
    address: state.consumer.address,
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(AllAddresses);
