import { BusinessActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessProfileReducer = (
  profileState = {
    status: null,
    value: {
      id: null,
      title: null,
      location: null,
      website: null,
      email: null,
      phoneNumber: null,
      description: null,
      avatarImage: null,
      coverImage: null,
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
        ...profileState,
        status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_REQUESTED,
      };
    }
    case BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS: {
      const { urlSubdomain } = action.payload;
      const { edges } = action.response.businessesByDomain;

      // No business found
      if (edges.length === 0) {
        return {
          ...profileState,
          status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR,
        };
      }

      const business = urlSubdomain
        ? edges.find((b) => b.node.urlSubdomain === urlSubdomain)
        : edges[0];

      return {
        ...profileState,
        status: BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS,
        value: {
          ...profileState.value,
          ...business.node.profile,
          id: business.node.id,
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
      return profileState;
  }
};

export default businessProfileReducer;
