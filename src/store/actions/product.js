import { API, graphqlOperation } from "aws-amplify";

import { ProductActionType } from "../actiontypes/index";
import { businessProductsQuery } from "../graphql/index";

export const getProducts = (input) => {
  return {
    types: [
      ProductActionType.GET_PRODUCTS_REQUESTED,
      ProductActionType.GET_PRODUCTS_SUCCESS,
      ProductActionType.GET_PRODUCTS_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(businessProductsQuery, { input }));
    },
  };
};

export const setProductCategory = (params) => {
  return {
    type: ProductActionType.SET_PRODUCT_CATEGORY,
    response: params,
  };
};
