import { BusinessActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessIdReducer = (
  idState = {
    status: null,
    value: {
      id: null,
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case BusinessActionType.GET_BUSINESSES_BY_DOMAIN_REQUESTED: {
      return {
        ...idState,
        status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_REQUESTED,
      };
    }
    case BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS: {
      const { urlSubdomain } = action.payload;
      const { edges } = action.response.businessesByDomain;

      // No business found
      if (edges.length === 0) {
        return {
          ...idState,
          status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR,
        };
      }

      const business = urlSubdomain
        ? edges.find((b) => b.node.urlSubdomain === urlSubdomain)
        : edges[0];

      return {
        ...idState,
        status: action.type,
        value: {
          ...idState.value,
          ...business.node,
        },
      };
    }
    case BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return idState;
  }
};

export default businessIdReducer;
