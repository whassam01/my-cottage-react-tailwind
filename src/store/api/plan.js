import { API, graphqlOperation } from 'aws-amplify';
import { businessPlansQuery } from 'store/graphql';

export const getPlans = async ({ queryKey }) => {
  const [, input, filters] = queryKey;
  const data = await API.graphql(graphqlOperation(businessPlansQuery, { input, filters }));
  return data;
};
