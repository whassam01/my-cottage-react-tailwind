import { API, graphqlOperation } from 'aws-amplify';

import { OrderActionType } from '../actiontypes';
import {
  applyCouponToOrderMutation,
  applyDeliveryAddressToOrderMutation,
  applyCardToOrderMutation,
  calculateOrderMutation,
  consumerOrdersQuery,
  consumerOrderQuery,
  createOrdersMutation,
  updateOrderMutation,
  deleteOrderMutation,
  transitionOrderMutation,
} from '../graphql';

export const getOrders = (input, filters = {}, pagination) => {
  filters.dateRange = { start: 0, end: Date.now() };
  return {
    types: [
      OrderActionType.GET_ORDERS_REQUESTED,
      OrderActionType.GET_ORDERS_SUCCESS,
      OrderActionType.GET_ORDERS_ERROR,
    ],
    payload: input,
    callAPI: () =>
      API.graphql(graphqlOperation(consumerOrdersQuery, { input, filters, pagination })),
  };
};

export const getConsumerOrder = (input, filters = {}, pagination) => ({
  types: [
    OrderActionType.GET_CONSUMER_ORDER_REQUESTED,
    OrderActionType.GET_CONSUMER_ORDER_SUCCESS,
    OrderActionType.GET_CONSUMER_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(consumerOrderQuery, { input, filters, pagination })),
});

export const getOrder = (input, filters = {}, pagination) => ({
  types: [
    OrderActionType.GET_ORDER_REQUESTED,
    OrderActionType.GET_ORDER_SUCCESS,
    OrderActionType.GET_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(consumerOrderQuery, { input, filters, pagination })),
});

export const createOrders = (input) => ({
  types: [
    OrderActionType.CREATE_ORDERS_REQUESTED,
    OrderActionType.CREATE_ORDERS_SUCCESS,
    OrderActionType.CREATE_ORDERS_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(createOrdersMutation, { input })),
});

export const updateOrder = (input) => ({
  types: [
    OrderActionType.UPDATE_ORDER_REQUESTED,
    OrderActionType.UPDATE_ORDER_SUCCESS,
    OrderActionType.UPDATE_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(updateOrderMutation, { input })),
});

export const deleteOrder = (input) => ({
  types: [
    OrderActionType.DELETE_ORDER_REQUESTED,
    OrderActionType.DELETE_ORDER_SUCCESS,
    OrderActionType.DELETE_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(deleteOrderMutation, { input })),
});

export const applyCouponToOrder = (input) => ({
  types: [
    OrderActionType.APPLY_COUPON_TO_ORDER_REQUESTED,
    OrderActionType.APPLY_COUPON_TO_ORDER_SUCCESS,
    OrderActionType.APPLY_COUPON_TO_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(applyCouponToOrderMutation, { input })),
});

export const applyDeliveryAddressToOrder = (input) => ({
  types: [
    OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_REQUESTED,
    OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_SUCCESS,
    OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(applyDeliveryAddressToOrderMutation, { input })),
});

export const applyCardToOrder = (input) => ({
  types: [
    OrderActionType.APPLY_CARD_TO_ORDER_REQUESTED,
    OrderActionType.APPLY_CARD_TO_ORDER_SUCCESS,
    OrderActionType.APPLY_CARD_TO_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(applyCardToOrderMutation, { input })),
});

export const transitionOrder = (input) => ({
  types: [
    OrderActionType.TRANSITION_ORDER_REQUESTED,
    OrderActionType.TRANSITION_ORDER_SUCCESS,
    OrderActionType.TRANSITION_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(transitionOrderMutation, { input })),
});

export const calculateOrder = (input) => ({
  types: [
    OrderActionType.CALCULATE_ORDER_REQUESTED,
    OrderActionType.CALCULATE_ORDER_SUCCESS,
    OrderActionType.CALCULATE_ORDER_ERROR,
  ],
  payload: input,
  callAPI: () => API.graphql(graphqlOperation(calculateOrderMutation, { input })),
});
