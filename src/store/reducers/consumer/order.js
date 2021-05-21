import { AuthenticationActionType, OrderActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const consumerOrderReducer = (
  orderState = {
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
    case OrderActionType.GET_CONSUMER_ORDER_REQUESTED: {
      return {
        ...orderState,
        status: action.type,
      };
    }
    case OrderActionType.GET_CONSUMER_ORDER_SUCCESS: {
      const { order } = action.response;
      const updatedEdges = orderState.value.edges.map((e) => {
        if (e.node.id === order.id) {
          return {
            ...e,
            node: {
              ...e.node,
              ...order,
            },
          };
        }

        return e;
      });

      return {
        ...orderState,
        status: OrderActionType.GET_CONSUMER_ORDER_SUCCESS,
        value: {
          ...orderState.value,
          edges: updatedEdges,
        },
      };
    }
    case OrderActionType.GET_ORDERS_REQUESTED: {
      return {
        ...orderState,
        status: OrderActionType.GET_ORDERS_REQUESTED,
      };
    }
    case OrderActionType.GET_ORDERS_SUCCESS: {
      const { orders } = action.response.consumer;
      const { total, edges, pageInfo } = orders;
      return {
        ...orderState,
        status: OrderActionType.GET_ORDERS_SUCCESS,
        value: {
          ...orderState.value,
          edges,
          total,
          pageInfo,
        },
      };
    }
    case OrderActionType.GET_ORDERS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...orderState,
        status: OrderActionType.GET_ORDERS_ERROR,
        error: {
          code,
          message,
        },
        value: {
          ...orderState.value,
          edges: [],
          total: 0,
        },
      };
    }
    case OrderActionType.TRANSITION_ORDER_REQUESTED: {
      return {
        ...orderState,
        status: OrderActionType.TRANSITION_ORDER_REQUESTED,
      };
    }
    case OrderActionType.TRANSITION_ORDER_SUCCESS: {
      const { order } = action.response.transitionOrder;
      return {
        ...orderState,
        status: OrderActionType.TRANSITION_ORDER_SUCCESS,
        value: {
          ...orderState.value,
          edges: orderState.value.edges.map((o) =>
            o.node.id === order.id
              ? {
                  ...o,
                  node: {
                    ...o.node,
                    ...order,
                  },
                }
              : o
          ),
        },
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...orderState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          edges: [],
          total: 0,
          pageInfo: null,
        },
      };
    }
    default:
      return orderState;
  }
};

export default consumerOrderReducer;
