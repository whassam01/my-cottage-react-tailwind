import { AuthenticationActionType, ConsumerActionType } from "../actiontypes/index";

const authenticationReducer = (
  authenticationState = {
    status: null,
    value: {
      user: null,
      id: null,
      isAuthenticated: false,
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case AuthenticationActionType.SIGN_UP_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_UP_REQUESTED,
      };
    }
    case AuthenticationActionType.SIGN_UP_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_UP_SUCCESS,
      };
    }
    case AuthenticationActionType.SIGN_UP_ERROR: {
      const { code, message } = action.error;

      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_UP_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.CONFIRMATION_SIGN_UP_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.CONFIRMATION_SIGN_UP_REQUESTED,
      };
    }
    case AuthenticationActionType.CONFIRMATION_SIGN_UP_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.CONFIRMATION_SIGN_UP_SUCCESS,
      };
    }
    case AuthenticationActionType.CONFIRMATION_SIGN_UP_ERROR: {
      const { code, message } = action.error;
      return {
        ...authenticationState,
        status: AuthenticationActionType.CONFIRMATION_SIGN_UP_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.SIGN_IN_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_IN_REQUESTED,
      };
    }
    case AuthenticationActionType.SIGN_IN_SUCCESS: {
      const newUser = action.response;
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_IN_SUCCESS,
        value: {
          ...authenticationState.value,
          isAuthenticated: true,
          user: newUser,
        },
      };
    }
    case AuthenticationActionType.SIGN_IN_ERROR: {
      const { code, message } = action.error;
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_IN_ERROR,
        value: {
          ...authenticationState.value,
          isAuthenticated: false,
        },
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.GET_CURRENT_SESSION_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_CURRENT_SESSION_REQUESTED,
      };
    }
    case AuthenticationActionType.GET_CURRENT_SESSION_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_CURRENT_SESSION_SUCCESS,
        value: {
          ...authenticationState.value,
          isAuthenticated: true,
        },
      };
    }
    case AuthenticationActionType.GET_CURRENT_SESSION_ERROR: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_CURRENT_SESSION_ERROR,
      };
    }
    case AuthenticationActionType.SIGN_OUT_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_OUT_REQUESTED,
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          ...authenticationState.value,
          isAuthenticated: false,
        },
      };
    }
    case AuthenticationActionType.SIGN_OUT_ERROR: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.SIGN_OUT_ERROR,
      };
    }
    case AuthenticationActionType.GET_USER_CREDENTIALS_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_USER_CREDENTIALS_REQUESTED,
      };
    }
    case AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS: {
      const { response } = action;
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS,
        value: {
          ...authenticationState.value,
          id: response.identityId,
          isAuthenticated: true,
        },
      };
    }
    case AuthenticationActionType.GET_USER_CREDENTIALS_ERROR: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_USER_CREDENTIALS_ERROR,
        value: {
          ...authenticationState.value,
          isAuthenticated: false,
        },
      };
    }
    case AuthenticationActionType.GET_AUTHENTICATED_USER_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_AUTHENTICATED_USER_REQUESTED,
      };
    }
    case AuthenticationActionType.GET_AUTHENTICATED_USER_SUCCESS: {
      const { response } = action;
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_AUTHENTICATED_USER_SUCCESS,
        value: {
          ...authenticationState.value,
          cognitoUser: response,
        },
      };
    }
    case AuthenticationActionType.GET_AUTHENTICATED_USER_ERROR: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.GET_AUTHENTICATED_USER_ERROR,
        value: {
          ...authenticationState.value,
          isAuthenticated: false,
        },
      };
    }
    case AuthenticationActionType.FORGOT_PASSWORD_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.FORGOT_PASSWORD_REQUESTED,
      };
    }
    case AuthenticationActionType.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.FORGOT_PASSWORD_SUCCESS,
      };
    }
    case AuthenticationActionType.FORGOT_PASSWORD_ERROR: {
      const { code, message } = action.error;
      return {
        ...authenticationState,
        status: AuthenticationActionType.FORGOT_PASSWORD_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_REQUESTED,
      };
    }
    case AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_SUCCESS,
      };
    }
    case AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_ERROR: {
      const { code, message } = action.error;
      return {
        ...authenticationState,
        status: AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.CHANGE_PASSWORD_REQUESTED: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.CHANGE_PASSWORD_REQUESTED,
      };
    }
    case AuthenticationActionType.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...authenticationState,
        status: AuthenticationActionType.CHANGE_PASSWORD_SUCCESS,
      };
    }
    case AuthenticationActionType.CHANGE_PASSWORD_ERROR: {
      const { code, message } = action.error;
      return {
        ...authenticationState,
        status: AuthenticationActionType.CHANGE_PASSWORD_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_REQUESTED:
    case ConsumerActionType.GET_CONSUMER_SUCCESS:
    case ConsumerActionType.GET_CONSUMER_ERROR: {
      return {
        ...authenticationState,
        status: action.type,
      };
    }
    default:
      return authenticationState;
  }
};

export default authenticationReducer;
