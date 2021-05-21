import { API, graphqlOperation } from 'aws-amplify';
import { getUserCredentials } from 'store/api/authentication';

import {
  createSubscriptionMutation,
  archiveSubscriptionMutation,
  updateSubscriptionMutation,
  getSubscriptionsQuery,
} from 'store/graphql';

export const createSubscription = async (input) => {
  const data = await API.graphql(graphqlOperation(createSubscriptionMutation, { input }));
  return data;
};

export const archiveSubscription = async (input) => {
  const data = await API.graphql(graphqlOperation(archiveSubscriptionMutation, { input }));
  return data;
};

export const updateSubscription = async (input) => {
  const data = await API.graphql(graphqlOperation(updateSubscriptionMutation, { input }));
  return data;
};

export const getSubscriptions = async () => {
  const user = await getUserCredentials();
  // This needs to be in its own variable to work
  const input = { id: user?.identityId };
  const data = await API.graphql(graphqlOperation(getSubscriptionsQuery, { input }));
  return data;
};
