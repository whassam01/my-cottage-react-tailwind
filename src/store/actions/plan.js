import { API, graphqlOperation } from "aws-amplify";

import { PlanActionType } from "../actiontypes";
import { businessPlansQuery } from "../graphql";

export const getPlans = (input, filters) => {
  return {
    types: [
      PlanActionType.GET_PLANS_REQUESTED,
      PlanActionType.GET_PLANS_SUCCESS,
      PlanActionType.GET_PLANS_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(businessPlansQuery, { input, filters }));
    },
  };
};
