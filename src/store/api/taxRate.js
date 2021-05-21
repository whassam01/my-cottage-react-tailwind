import { API, graphqlOperation } from "aws-amplify";
import { getBusinessTaxRatesQuery } from "store/graphql";

export const getTaxRates = async ({ queryKey }) => {
  const [, input] = queryKey;
  const data = await API.graphql(graphqlOperation(getBusinessTaxRatesQuery, { input }));
  return data;
};
