import { API, graphqlOperation } from 'aws-amplify';
import { getUserCredentials } from 'store/api/authentication';

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
} from 'store/graphql';

// export const getOrders = async ({ queryKey }) => {
//   const [, input, filters, pagination] = queryKey;

//   const user = await getUserCredentials();
//   input.id = user?.identityId;
//   const data = await API.graphql(
//     graphqlOperation(consumerOrdersQuery, { input, filters, pagination })
//   );
//   return data;
// };

export const getOrders = async ({ queryKey }) => {
  const [, input = {}, filters = {}, pagination] = queryKey;
  const user = await getUserCredentials();
  // This needs to be in its own variable to work
  input.id = user?.identityId;
  filters.dateRange = { start: 0, end: Date.now() };
  const data = await API.graphql(
    graphqlOperation(consumerOrdersQuery, { input, filters, pagination })
  );
  return data;
};

export const getConsumerOrder = async ({ queryKey }) => {
  const [, input, filters = {}, pagination] = queryKey;
  filters.dateRange = { start: 0, end: Date.now() };
  const data = await API.graphql(
    graphqlOperation(consumerOrderQuery, { input, filters, pagination })
  );
  return data;
};

// Not sure what the difference between this and getConsumerOrder,
// Just copying actions over as written
export const getOrder = async ({ queryKey }) => {
  const [, input, filters, pagination] = queryKey;
  const data = await API.graphql(
    graphqlOperation(consumerOrdersQuery, { input, filters, pagination })
  );
  return data;
};

export const createOrders = async (input) => {
  const data = await API.graphql(graphqlOperation(createOrdersMutation, { input }));
  return data;
};

export const updateOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(updateOrderMutation, { input }));
  return data;
};

export const deleteOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(deleteOrderMutation, { input }));
  return data;
};

export const applyCouponToOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(applyCouponToOrderMutation, { input }));
  return data;
};

export const applyDeliveryAddressToOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(applyDeliveryAddressToOrderMutation, { input }));
  return data;
};

export const applyCardToOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(applyCardToOrderMutation, { input }));
  return data;
};

export const transitionOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(transitionOrderMutation, { input }));
  return data;
};

export const calculateOrder = async (input) => {
  const data = await API.graphql(graphqlOperation(calculateOrderMutation, { input }));
  return data;
};
