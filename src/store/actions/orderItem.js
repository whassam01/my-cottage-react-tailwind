import { API, graphqlOperation } from "aws-amplify";

import { OrderItemActionType } from "../actiontypes";
import {
  createOrderItemMutation,
  updateOrderItemMutation,
  deleteOrderItemMutation,
} from "../graphql";

export const createOrderItem = (input, additionalInfo) => {
  return {
    types: [
      OrderItemActionType.CREATE_ORDER_ITEM_REQUESTED,
      OrderItemActionType.CREATE_ORDER_ITEM_SUCCESS,
      OrderItemActionType.CREATE_ORDER_ITEM_ERROR,
    ],
    payload: { ...input, ...additionalInfo },
    callAPI: () => {
      return API.graphql(graphqlOperation(createOrderItemMutation, { input }));
    },
  };
};

export const updateOrderItem = (input) => {
  return {
    types: [
      OrderItemActionType.UPDATE_ORDER_ITEM_REQUESTED,
      OrderItemActionType.UPDATE_ORDER_ITEM_SUCCESS,
      OrderItemActionType.UPDATE_ORDER_ITEM_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(updateOrderItemMutation, { input }));
    },
  };
};

export const deleteOrderItem = (input) => {
  return {
    types: [
      OrderItemActionType.DELETE_ORDER_ITEM_REQUESTED,
      OrderItemActionType.DELETE_ORDER_ITEM_SUCCESS,
      OrderItemActionType.DELETE_ORDER_ITEM_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(deleteOrderItemMutation, { input }));
    },
  };
};
