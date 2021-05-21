import { API, graphqlOperation } from "aws-amplify";

import { businessOffersQuery } from "store/graphql";

export const getOffersBySchedule = async ({ queryKey }) => {
  const [, input, filters] = queryKey;
  const data = await API.graphql(
    graphqlOperation(businessOffersQuery, {
      input,
      filters,
    })
  );
  return data;
};
