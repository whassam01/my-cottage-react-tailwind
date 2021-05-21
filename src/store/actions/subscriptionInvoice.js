import { API, graphqlOperation } from "aws-amplify";

import { SubscriptionInvoiceActionType } from "store/actiontypes";
import { consumerSubscriptionInvoicesQuery } from "store/graphql";

export const getSubscriptionInvoices = (input, filters, pagination) => {
  return {
    types: [
      SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_REQUESTED,
      SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_SUCCESS,
      SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_ERROR,
    ],
    callAPI: () => {
      return API.graphql(
        graphqlOperation(consumerSubscriptionInvoicesQuery, { input, filters, pagination })
      );
    },
  };
};
