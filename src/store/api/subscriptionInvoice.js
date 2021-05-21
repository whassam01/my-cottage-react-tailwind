import { API, graphqlOperation } from "aws-amplify";
import { consumerSubscriptionInvoicesQuery } from "store/graphql";

export const getSubscriptionInvoices = async ({ queryKey }) => {
  const [, input, filters, pagination] = queryKey;
  const data = await API.graphql(
    graphqlOperation(consumerSubscriptionInvoicesQuery, { input, filters, pagination })
  );
  return data;
};
