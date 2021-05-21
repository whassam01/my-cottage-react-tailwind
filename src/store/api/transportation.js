import { API, graphqlOperation } from "aws-amplify";

import { businessTransportationQuery } from "store/graphql";

export const getBusinessTransportation = async ({ queryKey }) => {
  const [, input] = queryKey;
  const data = await API.graphql(graphqlOperation(businessTransportationQuery, { input }));
  return data;
};
