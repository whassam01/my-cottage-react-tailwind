import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";

// Redux
import { BusinessActionType } from "../../../../store/actiontypes";
import {
  getBusinessTransportation,
  getTransportationType,
  setTransportationType,
  setSelectedAddressId,
} from "../../../../store/actions";

//scss
import "./Transportation.scss";
import TransportSelectDesktop from "./TransportationSelection/TransportSelectDesktop";
import TransportSelectMobile from "./TransportationSelection/TransportSelectMobile";
import { TransportationType } from "../../../../constants";
import { AddIcon } from "../../../common/icons/Icons";
import { Button } from "antd";

class TransportationPanel extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.search) {
      try {
        //for transportation type
        const parsedParamType = qs.parse(this.props.location.search)["transportation"];
        if (parsedParamType === TransportationType.DELIVERY) {
          this.props.setTransportationType(TransportationType.DELIVERY);
        } else if (parsedParamType === TransportationType.PICK_UP) {
          this.props.setTransportationType(TransportationType.PICK_UP);
        }
      } catch {}
    }
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { business } = this.props;
    if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
      this.getTransportation();
    }
  }

  componentDidUpdate = (prevProps) => {
    const { business } = this.props;

    if (business.status !== prevProps.business.status) {
      if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
        this.getTransportation();
      }
    }
  };

  getTransportation = () => {
    const businessId = this.props.business.value.id;

    this.props.getTransportation({
      id: businessId,
    });
  };

  handleAddressChange = (pickupAddressId) => {
    this.props.setSelectedAddressId(pickupAddressId);
  };

  render() {
    const {
      transportation,
      address,
      isMobileView,
      isLoading,
      selectedScheduleId,
      schedules,
      authentication,
      onScheduleChange,
    } = this.props;
    const { transportationType, selectedAddressId, pickupAddresses } = transportation.value;
    const consumerAddresses = address.value.edges;
    const addButtonContainer = (
      <Button
        onClick={() =>
          authentication.value.isAuthenticated
            ? this.props.onShowAddressForm()
            : this.props.onShowLogin()
        }>
        <AddIcon />
      </Button>
    );
    return (
      <div className="transportation-wrapper">
        {isMobileView ? (
          <TransportSelectMobile
            isLoading={isLoading}
            addButtonContainer={addButtonContainer}
            selectedScheduleId={selectedScheduleId}
            schedules={schedules}
            onScheduleChange={onScheduleChange}
            selectedAddressId={selectedAddressId}
            pickupAddresses={pickupAddresses}
            consumerAddresses={consumerAddresses}
            transportationType={transportationType}
            handleAddressChange={this.handleAddressChange}
            setTransportationType={this.props.setTransportationType}
          />
        ) : (
          <TransportSelectDesktop
            isLoading={isLoading}
            selectedScheduleId={selectedScheduleId}
            schedules={schedules}
            addButtonContainer={addButtonContainer}
            onScheduleChange={onScheduleChange}
            selectedAddressId={selectedAddressId}
            pickupAddresses={pickupAddresses}
            consumerAddresses={consumerAddresses}
            transportationType={transportationType}
            handleAddressChange={this.handleAddressChange}
            setTransportationType={this.props.setTransportationType}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    address: state.consumer.address,
    business: state.business.id,
    transportation: state.business.transportation,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransportation: (input) => dispatch(getBusinessTransportation(input)),
    getTransportationType: () => dispatch(getTransportationType()),
    setTransportationType: (transportationType) =>
      dispatch(setTransportationType(transportationType)),
    setSelectedAddressId: (selectedAddressId) => dispatch(setSelectedAddressId(selectedAddressId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TransportationPanel));
