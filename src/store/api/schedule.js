import { API, graphqlOperation } from "aws-amplify";
import { businessSchedulesQuery } from "store/graphql";

export const getSchedules = async ({ queryKey }) => {
  const [, input] = queryKey;
  const data = await API.graphql(graphqlOperation(businessSchedulesQuery, { input }));
  return data;
};
