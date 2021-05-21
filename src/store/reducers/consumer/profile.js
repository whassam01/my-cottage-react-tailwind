import { AuthenticationActionType, ConsumerActionType } from "../../actiontypes/index";
import { buildErrorMessage } from "../../../utils";

const consumerAccountReducer = (
  accountState = {
    status: null,
    value: {
      id: null,
      profile: {},
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case ConsumerActionType.GET_CONSUMER_REQUESTED:
    case ConsumerActionType.CREATE_CONSUMER_REQUESTED: {
      return {
        ...accountState,
        status: action.type,
      };
    }
    case ConsumerActionType.GET_CONSUMER_SUCCESS: {
      const { consumer } = action.response;
      const { id, firstName, lastName, email, phoneNumber, avatar } = consumer;
      return {
        ...accountState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...accountState.value,
          profile: {
            ...accountState.value.profile,
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            avatar,
          },
        },
      };
    }
    case ConsumerActionType.CREATE_CONSUMER_SUCCESS: {
      const { consumer } = action.response.createConsumer;
      const { id, firstName, lastName, email, phoneNumber, avatar } = consumer;
      return {
        ...accountState,
        status: ConsumerActionType.CREATE_CONSUMER_SUCCESS,
        value: {
          ...accountState.value,
          profile: {
            ...accountState.value.profile,
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            avatar,
          },
        },
      };
    }
    case ConsumerActionType.CREATE_CONSUMER_ERROR:
    case ConsumerActionType.GET_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...accountState,
        status: ConsumerActionType.GET_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case ConsumerActionType.UPDATE_CONSUMER_REQUESTED: {
      return {
        ...accountState,
        status: ConsumerActionType.UPDATE_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.UPDATE_CONSUMER_SUCCESS: {
      const { consumer } = action.response.updateConsumer;
      const { firstName, lastName, email, phoneNumber, avatar } = consumer;

      return {
        ...accountState,
        status: ConsumerActionType.UPDATE_CONSUMER_SUCCESS,
        value: {
          ...accountState.value,
          profile: {
            ...accountState.value.profile,
            firstName,
            lastName,
            email,
            phoneNumber,
            avatar,
          },
        },
      };
    }
    case ConsumerActionType.UPDATE_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...accountState,
        status: ConsumerActionType.UPDATE_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case ConsumerActionType.UPLOAD_CONSUMER_IMAGE_REQUESTED:
    case ConsumerActionType.UPLOAD_CONSUMER_IMAGE_SUCCESS:
    case ConsumerActionType.UPLOAD_CONSUMER_IMAGE_ERROR: {
      return {
        ...accountState,
        status: action.type,
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...accountState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          ...accountState,
          profile: {},
        },
      };
    }
    default:
      return accountState;
  }
};

export default consumerAccountReducer;
