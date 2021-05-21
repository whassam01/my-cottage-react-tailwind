import { API, graphqlOperation } from 'aws-amplify';
import { businessProductsQuery } from 'store/graphql';

export const getProducts = async ({ queryKey }) => {
  const [, input] = queryKey;
  const data = await API.graphql(graphqlOperation(businessProductsQuery, { input }));
  return data;
};
