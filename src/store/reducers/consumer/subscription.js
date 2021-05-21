import { AuthenticationActionType, ConsumerActionType, SubscriptionActionType } from "store/actiontypes";
import { buildErrorMessage } from "utils";

const consumerSubscriptionReducer = (
  subscriptionState = {
    status: null,
    value: {
      id: null,
      subscriptions: [],
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
    case ConsumerActionType.GET_CONSUMER_REQUESTED: {
      return {
        ...subscriptionState,
        status: ConsumerActionType.GET_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.GET_CONSUMER_SUCCESS: {
      const { consumer } = action.response;
      const { id, subscriptions } = consumer;
      return {
        ...subscriptionState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...subscriptionState.value,
          id,
          subscriptions,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...subscriptionState,
        status: ConsumerActionType.GET_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case SubscriptionActionType.ARCHIVE_SUBSCRIPTION_REQUESTED: {
      return {
        ...subscriptionState,
        status: SubscriptionActionType.ARCHIVE_SUBSCRIPTION_REQUESTED,
      };
    }
    case SubscriptionActionType.ARCHIVE_SUBSCRIPTION_SUCCESS: {
      const { subscription } = action.response.archiveSubscription;
      const postArchiveSubscriptions = subscriptionState.value.subscriptions.filter(
        (a) => a.id !== subscription.id
      );

      return {
        ...subscriptionState,
        status: SubscriptionActionType.ARCHIVE_SUBSCRIPTION_SUCCESS,
        value: {
          ...subscriptionState.value,
          subscriptions: postArchiveSubscriptions,
        },
      };
    }
    case SubscriptionActionType.ARCHIVE_SUBSCRIPTION_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...subscriptionState,
        status: SubscriptionActionType.ARCHIVE_SUBSCRIPTION_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case SubscriptionActionType.UPDATE_SUBSCRIPTION_REQUESTED: {
      return {
        ...subscriptionState,
        status: SubscriptionActionType.UPDATE_SUBSCRIPTION_REQUESTED,
      };
    }
    case SubscriptionActionType.UPDATE_SUBSCRIPTION_SUCCESS: {
      const { subscription } = action.response.updateSubscription;
      const postUpdateSubscriptions = subscriptionState.value.subscriptions.map((s) =>
        s.id === subscription.id
          ? // transform the one with a matching id
            { ...s, ...subscription }
          : // otherwise return original todo
            s
      );

      return {
        ...subscriptionState,
        status: SubscriptionActionType.UPDATE_SUBSCRIPTION_SUCCESS,
        value: {
          ...subscriptionState.value,
          subscriptions: postUpdateSubscriptions,
        },
      };
    }
    case SubscriptionActionType.UPDATE_SUBSCRIPTION_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...subscriptionState,
        status: SubscriptionActionType.UPDATE_SUBSCRIPTION_ERROR,
        error: {
          code,
          message,
        },
      };
    }
      case SubscriptionActionType.GET_SUBSCRIPTIONS_REQUESTED: {
        return {
          ...subscriptionState,
          status: SubscriptionActionType.GET_SUBSCRIPTION_INVOICES_REQUESTED,
        };
      }
      case SubscriptionActionType.GET_SUBSCRIPTIONS_SUCCESS: {
        const { subscriptions } = action.response.consumer;
        console.log('reducer: ',JSON.stringify(subscriptions));
        const { total, edges, pageInfo } = subscriptions;
  
        return {
          ...subscriptionState,
          status: SubscriptionActionType.GET_SUBSCRIPTIONS_SUCCESS,
          value: {
            ...subscriptionState.value,
            edges,
            total,
            pageInfo,
          },
        };
      }

      case SubscriptionActionType.GET_SUBSCRIPTIONS_ERROR: {
        const { errors } = action.error;
        console.log('action error is ', action.error);
        const message = buildErrorMessage(errors[0]);

        return {
          status: SubscriptionActionType.GET_SUBSCRIPTIONS_ERROR,
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
        ...subscriptionState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          id: null,
          subscriptions: [],
        },
      };
    }
    default:
      return subscriptionState;
  }
};

export default consumerSubscriptionReducer;
