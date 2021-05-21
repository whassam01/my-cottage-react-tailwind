import { API, graphqlOperation } from "aws-amplify";

import { OfferActionType } from "../actiontypes/index";
import { businessOffersQuery } from "../graphql/index";

export const getOffers = (input, filters) => {
  return {
    types: [
      OfferActionType.GET_OFFERS_REQUESTED,
      OfferActionType.GET_OFFERS_SUCCESS,
      OfferActionType.GET_OFFERS_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(businessOffersQuery, { input, filters }));
    },
  };
};
