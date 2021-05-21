import { TransportationActionType, ConsumerActionType, AddressActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

import { TransportationType } from "../../../constants";

const TRANSPORTATION_TYPE = "orderTransportationType";
const SELECTED_ADDRESS_ID = "transportationSelectedAddressId";

const businessTransportationReducer = (
  transportationState = {
    status: null,
    value: {
      transportationType: TransportationType.DELIVERY,
      selectedAddressId: null,
      pickupAddresses: {
        total: 0,
        edges: [],
      },
      deliveries: {
        total: 0,
        edges: [],
      },
    },
    error: {
      code: null,
      message: null,
    },
  },
  consumerAddressState,
  action
) => {
  switch (action.type) {
    case TransportationActionType.GET_BUSINESSES_TRANSPORTATION_REQUESTED: {
      return {
        ...transportationState,
        status: TransportationActionType.GET_BUSINESSES_TRANSPORTATION_REQUESTED,
      };
    }
    case TransportationActionType.GET_BUSINESSES_TRANSPORTATION_SUCCESS: {
      const { deliveries, pickupAddresses } = action.response.business;
      const transportationType = localStorage.getItem(TRANSPORTATION_TYPE)
        ? localStorage.getItem(TRANSPORTATION_TYPE)
        : deliveries.edges.length > 0
        ? TransportationType.DELIVERY
        : TransportationType.PICK_UP;

      // For finding an address
      transportationState.value.pickupAddresses = pickupAddresses;

      const selectedAddressId = findAddressId(
        transportationType,
        transportationState,
        consumerAddressState
      );

      return {
        ...transportationState,
        status: TransportationActionType.GET_BUSINESSES_TRANSPORTATION_SUCCESS,
        value: {
          ...transportationState.value,
          transportationType,
          selectedAddressId,
          deliveries,
          pickupAddresses,
        },
      };
    }
    case TransportationActionType.GET_BUSINESSES_TRANSPORTATION_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...transportationState,
        status: TransportationActionType.GET_BUSINESSES_TRANSPORTATION_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case TransportationActionType.GET_TRANSPORTATION_TYPE: {
      const transportationType = localStorage.getItem(TRANSPORTATION_TYPE)
        ? localStorage.getItem(TRANSPORTATION_TYPE)
        : TransportationType.DELIVERY;

      const selectedAddressId = findAddressId(
        transportationType,
        transportationState,
        consumerAddressState
      );

      return {
        ...transportationState,
        status: TransportationActionType.GET_TRANSPORTATION_TYPE,
        value: {
          ...transportationState.value,
          transportationType,
          selectedAddressId,
        },
      };
    }
    case TransportationActionType.SET_TRANSPORTATION_TYPE: {
      const transportationType = action.response;
      const selectedAddressId = findAddressId(
        transportationType,
        transportationState,
        consumerAddressState
      );

      localStorage.setItem(TRANSPORTATION_TYPE, transportationType);
      localStorage.setItem(SELECTED_ADDRESS_ID, selectedAddressId);

      return {
        ...transportationState,
        status: TransportationActionType.SET_TRANSPORTATION_TYPE,
        value: {
          ...transportationState.value,
          transportationType,
          selectedAddressId,
        },
      };
    }
    case TransportationActionType.SET_SELECTED_ADDRESS_ID: {
      const selectedAddressId = action.response;

      localStorage.setItem(SELECTED_ADDRESS_ID, selectedAddressId);

      return {
        status: TransportationActionType.SET_SELECTED_ADDRESS_ID,
        value: {
          ...transportationState.value,
          selectedAddressId,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_SUCCESS: {
      const {
        addresses: { edges },
      } = action.response.consumer;
      const { transportationType } = transportationState.value;

      let updatedSelectedAddressId = transportationState.value.selectedAddressId;
      if (transportationType === TransportationType.DELIVERY) {
        consumerAddressState.value.edges = edges;
        updatedSelectedAddressId = findAddressId(
          transportationType,
          transportationState,
          consumerAddressState
        );
        localStorage.setItem(SELECTED_ADDRESS_ID, updatedSelectedAddressId);
      }

      return {
        ...transportationState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...transportationState.value,
          selectedAddressId: updatedSelectedAddressId,
        },
      };
    }
    case AddressActionType.CREATE_ADDRESS_SUCCESS: {
      const { address } = action.response.createConsumerAddress;
      const { transportationType } = transportationState.value;

      let updatedSelectedAddressId = transportationState.value.selectedAddressId;
      if (transportationType === TransportationType.DELIVERY) {
        consumerAddressState.value.edges = [...consumerAddressState.value.edges, { node: address }];
        updatedSelectedAddressId = findAddressId(
          transportationType,
          transportationState,
          consumerAddressState
        );
        localStorage.setItem(SELECTED_ADDRESS_ID, updatedSelectedAddressId);
      }

      return {
        ...transportationState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...transportationState.value,
          selectedAddressId: updatedSelectedAddressId,
        },
      };
    }
    default:
      return transportationState;
  }
};

const findAddressId = (transportationType, transportationState, consumerAddressState) => {
  const { selectedAddressId, pickupAddresses } = transportationState.value;
  const consumerAddresses = consumerAddressState.value.edges;
  const updatedSelectedAddressId = selectedAddressId
    ? selectedAddressId
    : localStorage.getItem(SELECTED_ADDRESS_ID)
    ? localStorage.getItem(SELECTED_ADDRESS_ID)
    : null;

  const addresses =
    transportationType === TransportationType.DELIVERY ? consumerAddresses : pickupAddresses.edges;
  const selectedAddress = addresses.find((a) => a.node.id === updatedSelectedAddressId);

  return selectedAddress !== undefined
    ? selectedAddress.node.id
    : addresses.length > 0
    ? addresses[0].node.id
    : null;
};

export default businessTransportationReducer;
