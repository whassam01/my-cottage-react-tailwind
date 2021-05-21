import { ProductActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

import { DEFAULT_PRODUCT_CATEGORY } from "../../../constants";

const businessProductReducer = (
  productState = {
    status: null,
    value: {
      edges: [],
      categories: [],
      selectedCategory: DEFAULT_PRODUCT_CATEGORY,
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case ProductActionType.GET_PRODUCTS_REQUESTED: {
      return {
        ...productState,
        status: ProductActionType.GET_PRODUCTS_REQUESTED,
      };
    }
    case ProductActionType.GET_PRODUCTS_SUCCESS: {
      const { products, productCategories } = action.response.business;
      return {
        ...productState,
        status: ProductActionType.GET_PRODUCTS_SUCCESS,
        value: {
          ...productState.value,
          categories: productCategories,
          edges: products.edges,
        },
      };
    }
    case ProductActionType.GET_PRODUCTS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...productState,
        status: ProductActionType.GET_PRODUCTS_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case ProductActionType.SET_PRODUCT_CATEGORY: {
      const { category } = action.response;
      return {
        ...productState,
        status: ProductActionType.SET_PRODUCT_CATEGORY,
        value: {
          ...productState.value,
          selectedCategory: category,
        },
      };
    }
    default:
      return productState;
  }
};

export default businessProductReducer;
