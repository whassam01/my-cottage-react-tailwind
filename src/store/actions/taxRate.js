import { API, graphqlOperation } from "aws-amplify";

import { TaxRateActionType } from "../actiontypes";
import { getBusinessTaxRatesQuery } from "../graphql";

export const getTaxRates = (input) => {
  return {
    types: [
      TaxRateActionType.GET_TAX_RATE_REQUESTED,
      TaxRateActionType.GET_TAX_RATE_SUCCESS,
      TaxRateActionType.GET_TAX_RATE_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(getBusinessTaxRatesQuery, { input }));
    },
  };
};
