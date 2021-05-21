import { Auth } from "aws-amplify";

import { AuthenticationActionType } from "../actiontypes/index";

export const signUp = (input) => {
  return {
    types: [
      AuthenticationActionType.SIGN_UP_REQUESTED,
      AuthenticationActionType.SIGN_UP_SUCCESS,
      AuthenticationActionType.SIGN_UP_ERROR,
    ],
    callAPI: () => {
      return Auth.signUp(input);
    },
  };
};

export const confirmSignUp = (email, confirmationCode) => {
  return {
    types: [
      AuthenticationActionType.CONFIRMATION_SIGN_UP_REQUESTED,
      AuthenticationActionType.CONFIRMATION_SIGN_UP_SUCCESS,
      AuthenticationActionType.CONFIRMATION_SIGN_UP_ERROR,
    ],
    callAPI: () => {
      return Auth.confirmSignUp(email, confirmationCode);
    },
  };
};

export const signIn = (email, password) => {
  return {
    types: [
      AuthenticationActionType.SIGN_IN_REQUESTED,
      AuthenticationActionType.SIGN_IN_SUCCESS,
      AuthenticationActionType.SIGN_IN_ERROR,
    ],
    callAPI: () => {
      return Auth.signIn(email, password);
    },
  };
};

export const signOut = () => {
  return {
    types: [
      AuthenticationActionType.SIGN_OUT_REQUESTED,
      AuthenticationActionType.SIGN_OUT_SUCCESS,
      AuthenticationActionType.SIGN_OUT_ERROR,
    ],
    callAPI: () => {
      return Auth.signOut();
    },
  };
};

export const getCurrentSession = () => {
  return {
    types: [
      AuthenticationActionType.GET_CURRENT_SESSION_REQUESTED,
      AuthenticationActionType.GET_CURRENT_SESSION_SUCCESS,
      AuthenticationActionType.GET_CURRENT_SESSION_ERROR,
    ],
    callAPI: () => {
      return Auth.currentSession();
    },
  };
};

export const getUserCredentials = () => {
  return {
    types: [
      AuthenticationActionType.GET_USER_CREDENTIALS_REQUESTED,
      AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS,
      AuthenticationActionType.GET_USER_CREDENTIALS_ERROR,
    ],
    callAPI: () => {
      return Auth.currentUserCredentials();
    },
  };
};

export const getCurrentAuthenticatedUser = () => {
  return {
    types: [
      AuthenticationActionType.GET_AUTHENTICATED_USER_REQUESTED,
      AuthenticationActionType.GET_AUTHENTICATED_USER_SUCCESS,
      AuthenticationActionType.GET_AUTHENTICATED_USER_ERROR,
    ],
    callAPI: () => {
      return Auth.currentAuthenticatedUser();
    },
  };
};

export const forgotPassword = (email) => {
  return {
    types: [
      AuthenticationActionType.FORGOT_PASSWORD_REQUESTED,
      AuthenticationActionType.FORGOT_PASSWORD_SUCCESS,
      AuthenticationActionType.FORGOT_PASSWORD_ERROR,
    ],
    callAPI: () => {
      return Auth.forgotPassword(email);
    },
  };
};

export const forgotPasswordSubmit = (email, code, password) => {
  return {
    types: [
      AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_REQUESTED,
      AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_SUCCESS,
      AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_ERROR,
    ],
    callAPI: () => {
      return Auth.forgotPasswordSubmit(email, code, password);
    },
  };
};

export const changePassword = (input) => {
  const { currentUser, oldPassword, newPassword } = input;
  return {
    types: [
      AuthenticationActionType.CHANGE_PASSWORD_REQUESTED,
      AuthenticationActionType.CHANGE_PASSWORD_SUCCESS,
      AuthenticationActionType.CHANGE_PASSWORD_ERROR,
    ],
    callAPI: () => {
      return Auth.changePassword(currentUser, oldPassword, newPassword);
    },
  };
};
