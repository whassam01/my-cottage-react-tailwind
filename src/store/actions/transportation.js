import { API, graphqlOperation } from "aws-amplify";

import { TransportationActionType } from "../actiontypes";
import { businessTransportationQuery } from "../graphql";

export const getBusinessTransportation = (input) => {
  return {
    types: [
      TransportationActionType.GET_BUSINESSES_TRANSPORTATION_REQUESTED,
      TransportationActionType.GET_BUSINESSES_TRANSPORTATION_SUCCESS,
      TransportationActionType.GET_BUSINESSES_TRANSPORTATION_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(businessTransportationQuery, { input }));
    },
  };
};

export const getTransportationType = (type) => {
  return {
    type: TransportationActionType.GET_TRANSPORTATION_TYPE,
    response: type,
  };
};

export const setTransportationType = (type) => {
  return {
    type: TransportationActionType.SET_TRANSPORTATION_TYPE,
    response: type,
  };
};

export const setSelectedAddressId = (selectedAddressId) => {
  return {
    type: TransportationActionType.SET_SELECTED_ADDRESS_ID,
    response: selectedAddressId,
  };
};
