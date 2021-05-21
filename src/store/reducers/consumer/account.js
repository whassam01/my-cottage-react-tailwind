import { AuthenticationActionType, ConsumerActionType } from "../../actiontypes/index";
import { buildErrorMessage } from "../../../utils";

const consumerAccountReducer = (
  accountState = {
    status: null,
    guestConsumerStatus: null,
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case ConsumerActionType.CREATE_CONSUMER_REQUESTED: {
      return {
        ...accountState,
        status: ConsumerActionType.CREATE_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.CREATE_CONSUMER_SUCCESS: {
      const {
        consumer: { id },
      } = action.response.createConsumer;
      return {
        ...accountState,
        status: ConsumerActionType.CREATE_CONSUMER_SUCCESS,
        value: {
          ...accountState.value,
          id,
        },
      };
    }
    case ConsumerActionType.CREATE_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...accountState,
        status: ConsumerActionType.CREATE_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_REQUESTED: {
      return {
        ...accountState,
        status: ConsumerActionType.GET_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.GET_CONSUMER_SUCCESS: {
      const {
        consumer: { id, role, firstName, lastName, email, phoneNumber },
      } = action.response;
      return {
        ...accountState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...accountState.value,
          id,
          role,
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];
      const message = buildErrorMessage(errors[0]);

      return {
        status: ConsumerActionType.GET_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...accountState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {},
      };
    }

    case ConsumerActionType.CREATE_GUEST_CONSUMER_REQUESTED: {
      return {
        ...accountState,
        guestConsumerStatus: ConsumerActionType.CREATE_GUEST_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.CREATE_GUEST_CONSUMER_SUCCESS: {
      const { consumer } = action.response.createGuestConsumer;

      return {
        ...accountState,
        guestConsumerStatus: ConsumerActionType.CREATE_GUEST_CONSUMER_SUCCESS,
        value: {
          ...accountState.value,
          ...consumer,
        },
      };
    }
    case ConsumerActionType.CREATE_GUEST_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);
      delete accountState.value;
      return {
        ...accountState,
        guestConsumerStatus: ConsumerActionType.CREATE_GUEST_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return accountState;
  }
};

export default consumerAccountReducer;
