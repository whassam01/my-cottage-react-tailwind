import { CartActionType } from "../actiontypes/index";

export const addOfferToCart = (params) => {
  return {
    type: CartActionType.ADD_OFFER_TO_CART,
    response: params,
  };
};

export const addPlanToCart = (params) => {
  return {
    type: CartActionType.ADD_PLAN_TO_CART,
    response: params,
  };
};

export const getActiveSchedulesInCart = () => {
  return {
    type: CartActionType.GET_ACTIVE_SCHEDULES_IN_CART,
  };
};

export const getActivePlanOrders = () => {
  return {
    type: CartActionType.GET_ACTIVE_PLAN_ORDERS,
  };
};

export const getActiveOrders = () => {
  return {
    type: CartActionType.GET_ACTIVE_ORDERS,
  };
};

export const clearBusinessScheduleInCart = (params) => {
  return {
    type: CartActionType.CLEAR_BUSINESS_SCHEDULE_IN_CART,
    response: params,
  };
};

export const clearProductOrdersInCart = () => {
  return {
    type: CartActionType.CLEAR_PRODUCT_ORDERS_IN_CART,
  };
};

export const clearPlanOrdersInCart = () => {
  return {
    type: CartActionType.CLEAR_PLAN_ORDERS_IN_CART,
  };
};

export const removePlanOrderInCart = (params) => {
  return {
    type: CartActionType.REMOVE_PLAN_ORDER_IN_CART,
    response: params,
  };
};

export const setActivePlanOrdersInCart = () => {
  return {
    type: CartActionType.SET_ACTIVE_PLAN_ORDERS_IN_CART,
  };
};

export const setScheduleOffers = (params) => {
  return {
    type: CartActionType.SET_SCHEDULE_OFFERS,
    response: params,
  };
};

export const setSelectedCart = (params) => {
  return {
    type: CartActionType.SET_SELECTED_CART,
    response: params,
  };
};

export const getCheckoutType = () => {
  return {
    type: CartActionType.GET_CHECKOUT_TYPE,
  };
};
