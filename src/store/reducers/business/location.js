import { BusinessActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessLocationReducer = (
  locationState = {
    status: null,
    value: {
      selectedBusiness: null,
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
    case BusinessActionType.GET_BUSINESSES_BY_DOMAIN_REQUESTED: {
      return {
        ...locationState,
        status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_REQUESTED,
      };
    }
    case BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS: {
      const { urlSubdomain } = action.payload;
      const { edges } = action.response.businessesByDomain;

      // No business found
      if (edges.length === 0) {
        return {
          ...locationState,
          status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR,
        };
      }

      const business = urlSubdomain
        ? edges.find((b) => b.node.urlSubdomain === urlSubdomain)
        : edges[0];
      return {
        ...locationState,
        status: action.type,
        value: {
          ...locationState.value,
          selectedBusiness: business.node,
          edges,
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
      return locationState;
  }
};

export default businessLocationReducer;
