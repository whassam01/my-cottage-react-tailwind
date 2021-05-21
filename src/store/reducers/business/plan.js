import { PlanActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessPlanReducer = (
  planState = {
    status: null,
    value: {
      edges: [],
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case PlanActionType.GET_PLANS_REQUESTED: {
      return {
        ...planState,
        status: PlanActionType.GET_PLANS_REQUESTED,
      };
    }
    case PlanActionType.GET_PLANS_SUCCESS: {
      const { plans } = action.response.business;
      const { edges } = plans;
      return {
        ...planState,
        status: PlanActionType.GET_PLANS_SUCCESS,
        value: {
          ...planState.value,
          edges,
        },
      };
    }
    case PlanActionType.GET_PLANS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        status: PlanActionType.GET_PLANS_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return planState;
  }
};

export default businessPlanReducer;
