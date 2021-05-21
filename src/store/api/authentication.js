import { Auth } from "aws-amplify";

export const signUp = async (input) => {
  const data = await Auth.signUp(input);
  return data;
};

export const confirmSignUp = async (input) => {
  const [email, confirmationCode] = input;
  const data = await Auth.confirmSignUp(email, confirmationCode);
  return data;
};

export const signIn = async (input) => {
  const [email, password] = input;
  const data = await Auth.signIn(email, password);
  return data;
};

export const signOut = async () => {
  const data = await Auth.signOut();
  return data;
};

export const getCurrentSession = async () => {
  const data = await Auth.currentSession();
  return data;
};

export const getUserCredentials = async () => {
  const data = await Auth.currentUserCredentials();
  return data;
};

export const getCurrentAuthenticatedUser = async () => {
  const data = await Auth.currentUserCredentials();
  return data;
};

export const forgotPassword = async (email) => {
  const data = await Auth.forgotPassword(email);
  return data;
};
export const forgotPasswordSubmit = async (input) => {
  const [email, code, password] = input;
  const data = await Auth.forgotPasswordSubmit(email, code, password);
  return data;
};

export const changePassword = async (input) => {
  const { currentUser, oldPassword, newPassword } = input;
  const data = await Auth.changePassword(currentUser, oldPassword, newPassword);
  return data;
};
