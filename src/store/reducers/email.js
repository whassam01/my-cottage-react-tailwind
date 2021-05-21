import { EmailActionType } from "../actiontypes/index";

const emailReducer = (
  emailState = {
    status: null,
    value: {},
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case EmailActionType.SEND_EMAIL_REQUESTED: {
      return {
        ...emailState,
        status: action.type,
      };
    }
    case EmailActionType.SEND_EMAIL_SUCCESS: {
      return {
        ...emailState,
        status: action.type,
        value: {
          ...emailState.value,
        },
      };
    }
    case EmailActionType.SEND_EMAIL_ERROR: {
      return {
        ...emailState,
        status: action.type,
        error: action.error,
      };
    }
    default:
      return emailState;
  }
};

export default emailReducer;
