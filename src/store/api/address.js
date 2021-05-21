import { API, graphqlOperation } from 'aws-amplify';
import { getUserCredentials } from 'store/api/authentication';

import {
  createConsumerAddressMutation,
  archiveConsumerAddressMutation,
  getAddressesQuery,
} from 'store/graphql';

export const createConsumerAddress = async (input) => {
  const data = await API.graphql(graphqlOperation(createConsumerAddressMutation, { input }));
  return data;
};

export const archiveConsumerAddress = async (input) => {
  const data = await API.graphql(graphqlOperation(archiveConsumerAddressMutation, { input }));
  return data;
};

export const getAddresses = async () => {
  const user = await getUserCredentials();
  // This needs to be in its own variable to work
  const input = { id: user?.identityId };
  const data = await API.graphql(graphqlOperation(getAddressesQuery, { input }));
  return data;
};
