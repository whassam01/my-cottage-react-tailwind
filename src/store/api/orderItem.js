import { API, graphqlOperation } from 'aws-amplify';
import {
  createOrderItemMutation,
  updateOrderItemMutation,
  deleteOrderItemMutation,
} from 'store/graphql';

// Not sure what additionalInfo was doing in redux, leaving here for now
export const createOrderItem = async (input) => {
  const data = await API.graphql(graphqlOperation(createOrderItemMutation, { input }));
  return data;
};

export const updateOrderItem = async (input) => {
  const data = await API.graphql(graphqlOperation(updateOrderItemMutation, { input }));
  return data;
};

export const deleteOrderItem = async (input) => {
  const data = await API.graphql(graphqlOperation(deleteOrderItemMutation, { input }));
  return data;
};
