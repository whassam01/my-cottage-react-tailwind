import { useQuery, useMutation } from 'react-query';
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  forgotPassword,
  forgotPasswordSubmit,
  changePassword,
  getCurrentSession,
  getUserCredentials,
  getCurrentAuthenticatedUser,
} from 'store/api';
import { AuthenticationKeys } from 'store/actiontypes';

export const useSignUp = (options = {}) => useMutation(signUp, { ...options });

export const useConfirmSignUp = (options = {}) => useMutation(confirmSignUp, { ...options });

export const useSignIn = (options = {}) => useMutation(signIn, { ...options });

export const useSignOut = (options = {}) => useMutation(signOut, { ...options });

export const useForgotPassword = (options = {}) => useMutation(forgotPassword, { ...options });

export const useForgotPasswordSubmit = (options = {}) =>
  useMutation(forgotPasswordSubmit, { ...options });

export const useChangePassword = (options = {}) => useMutation(changePassword, { ...options });

export const useGetCurrentSession = (options = {}) =>
  useQuery({
    queryKey: [AuthenticationKeys.Authentication],
    queryFn: getCurrentSession,
    staleTime: Infinity,
    ...options,
  });

export const useGetUserCredentials = (options = {}) =>
  useQuery({
    queryKey: [AuthenticationKeys.Authentication],
    queryFn: getUserCredentials,
    staleTime: Infinity,
    ...options,
  });

export const useGetCurrentAuthenticatedUser = (options = {}) =>
  useQuery({
    queryKey: [AuthenticationKeys.Authentication],
    queryFn: getCurrentAuthenticatedUser,
    staleTime: Infinity,
    ...options,
  });
