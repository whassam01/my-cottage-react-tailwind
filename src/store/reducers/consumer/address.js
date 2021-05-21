import {
  AuthenticationActionType,
  ConsumerActionType,
  AddressActionType,
} from "../../actiontypes/index";
import { buildErrorMessage } from "../../../utils";

const consumerAddressReducer = (
  addressState = {
    status: null,
    value: {
      id: null,
      total: 0,
      edges: [],
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case ConsumerActionType.GET_CONSUMER_REQUESTED: {
      return {
        ...addressState,
        status: ConsumerActionType.GET_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.GET_CONSUMER_SUCCESS: {
      const {
        consumer: { id, addresses },
      } = action.response;
      const { total, edges } = addresses;
      return {
        ...addressState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...addressState.value,
          id,
          total,
          edges,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...addressState,
        status: ConsumerActionType.GET_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AddressActionType.CREATE_ADDRESS_REQUESTED: {
      return {
        ...addressState,
        status: AddressActionType.CREATE_ADDRESS_REQUESTED,
      };
    }
    case AddressActionType.CREATE_ADDRESS_SUCCESS: {
      const { address } = action.response.createConsumerAddress;
      return {
        ...addressState,
        status: AddressActionType.CREATE_ADDRESS_SUCCESS,
        value: {
          ...addressState.value,
          total: addressState.value.total + 1,
          edges: [{ node: address }, ...addressState.value.edges],
        },
      };
    }
    case AddressActionType.CREATE_ADDRESS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...addressState,
        status: AddressActionType.CREATE_ADDRESS_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AddressActionType.ARCHIVE_ADDRESS_SUCCESS: {
      const { address } = action.response.archiveConsumerAddress;
      const postArchiveAddresses = addressState.value.edges.filter((a) => a.node.id !== address.id);

      return {
        ...addressState,
        status: AddressActionType.ARCHIVE_ADDRESS_SUCCESS,
        value: {
          ...addressState.value,
          edges: postArchiveAddresses,
        },
      };
    }
    case AddressActionType.ARCHIVE_ADDRESS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...addressState,
        status: AddressActionType.ARCHIVE_ADDRESS_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...addressState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          id: null,
          total: 0,
          edges: [],
        },
      };
    }
    default:
      return addressState;
  }
};

export default consumerAddressReducer;
