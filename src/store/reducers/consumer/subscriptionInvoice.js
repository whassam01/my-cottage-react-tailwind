import { AuthenticationActionType, SubscriptionInvoiceActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const consumerSubscriptionInvoiceReducer = (
  subscriptionInvoiceState = {
    status: null,
    value: {
      pageInfo: null,
      edges: [],
      total: 0,
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_REQUESTED: {
      return {
        ...subscriptionInvoiceState,
        status: SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_REQUESTED,
      };
    }
    case SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_SUCCESS: {
      const { subscriptionInvoices } = action.response.consumer;
      const { total, edges, pageInfo } = subscriptionInvoices;

      return {
        ...subscriptionInvoiceState,
        status: SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_SUCCESS,
        value: {
          ...subscriptionInvoiceState.value,
          edges,
          total,
          pageInfo,
        },
      };
    }
    case SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_ERROR: {
      const { errors } = action.error;
      const message = buildErrorMessage(errors[0]);

      return {
        status: SubscriptionInvoiceActionType.GET_SUBSCRIPTION_INVOICES_ERROR,
        error: {
          message,
        },
        value: {
          edges: [],
          total: 0,
          pageInfo: null,
        },
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...subscriptionInvoiceState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          edges: [],
          total: 0,
          pageInfo: null,
        },
      };
    }
    default:
      return subscriptionInvoiceState;
  }
};

export default consumerSubscriptionInvoiceReducer;
