import { API, graphqlOperation } from "aws-amplify";
import { getBusinessesByDomainQuery } from "store/graphql";

export const getBusinessByDomain = async ({ queryKey }) => {
  const [, input] = queryKey;
  const data = await API.graphql(graphqlOperation(getBusinessesByDomainQuery, { input }));
  return data;
};
