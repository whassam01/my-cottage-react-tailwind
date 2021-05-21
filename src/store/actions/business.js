import { API, graphqlOperation } from "aws-amplify";

import { BusinessActionType } from "../actiontypes/index";
import { getBusinessesByDomainQuery } from "../graphql/index";

export const getBusinessesByDomain = (input) => {
  return {
    types: [
      BusinessActionType.GET_BUSINESSES_BY_DOMAIN_REQUESTED,
      BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS,
      BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(getBusinessesByDomainQuery, { input }));
    },
  };
};
