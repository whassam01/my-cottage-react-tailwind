import { API, Storage, graphqlOperation } from 'aws-amplify';
import { getUserCredentials } from 'store/api/authentication';
import {
  getConsumerQuery,
  updateConsumerMutation,
  createConsumerMutation,
  createGuestConsumerMutation,
} from 'store/graphql';

// This used to be a two step process, condense down to one
export const getConsumer = async () => {
  const user = await getUserCredentials();
  // This needs to be in its own variable to work
  const input = { id: user?.identityId };
  const data = await API.graphql(graphqlOperation(getConsumerQuery, { input }));
  return data;
};

export const createConsumer = async (input) => {
  const data = await API.graphql(graphqlOperation(createConsumerMutation, { input }));
  return data;
};

export const createGuestConsumer = async (input) => {
  const data = await API.graphql(graphqlOperation(createGuestConsumerMutation, { input }));
  return data;
};

export const updateConsumer = async (input) => {
  const data = await API.graphql(graphqlOperation(updateConsumerMutation, { input }));
  return data;
};

export const uploadConsumerImage = async (input) => {
  const { path, image, contentType } = input;
  const data = await Storage.put(path, image, {
    contentType,
    contentEncoding: 'base64',
  });
  return data;
};

export const removeConsumerImage = async (input) => {
  const { path } = input;
  const data = await Storage.remove(path);
  return data;
};
