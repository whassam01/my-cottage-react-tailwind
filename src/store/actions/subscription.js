import { API, graphqlOperation } from "aws-amplify";
import { SubscriptionActionType } from "store/actiontypes";

import { archiveSubscriptionMutation, createSubscriptionMutation, updateSubscriptionMutation, getSubscriptionsQuery } from "store/graphql";

export const createSubscription = (input) => {
  return {
    types: [
      SubscriptionActionType.CREATE_SUBSCRIPTION_REQUESTED,
      SubscriptionActionType.CREATE_SUBSCRIPTION_SUCCESS,
      SubscriptionActionType.CREATE_SUBSCRIPTION_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(createSubscriptionMutation, { input }));
    },
  };
};

export const archiveSubscription = (input) => {
  return {
    types: [
      SubscriptionActionType.ARCHIVE_SUBSCRIPTION_REQUESTED,
      SubscriptionActionType.ARCHIVE_SUBSCRIPTION_SUCCESS,
      SubscriptionActionType.ARCHIVE_SUBSCRIPTION_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(archiveSubscriptionMutation, { input }));
    },
  };
};

export const getSubscriptions = (input, filters, pagination) => {
  return {
    types: [
      SubscriptionActionType.GET_SUBSCRIPTIONS_REQUESTED,
      SubscriptionActionType.GET_SUBSCRIPTIONS_SUCCESS,
      SubscriptionActionType.GET_SUBSCRIPTIONS_ERROR,
    ],
    callAPI: () => {
      console.log(`calling get subscriptions query with input: ${input} filters: ${filters} pagination: ${pagination}`)
      return API.graphql(graphqlOperation(getSubscriptionsQuery, { input, filters, pagination }));
    },
  };
};

export const updateSubscription = (input) => {
  return {
    types: [
      SubscriptionActionType.UPDATE_SUBSCRIPTION_REQUESTED,
      SubscriptionActionType.UPDATE_SUBSCRIPTION_SUCCESS,
      SubscriptionActionType.UPDATE_SUBSCRIPTION_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(updateSubscriptionMutation, { input }));
    },
  };
};
