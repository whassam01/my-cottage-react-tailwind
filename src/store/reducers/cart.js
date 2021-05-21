import {
  CartActionType,
  OrderActionType,
  OrderItemActionType,
  SubscriptionActionType,
  TransportationActionType,
} from "../actiontypes/index";
import { buildErrorMessage } from "../../utils";

import { BusinessTabs, CheckoutType, TransportationType, MAX_OFFER_QUANTITY } from "../../constants";

const ACTIVE_SCHEDULES_IN_CART = "activeBusinessSchedulesInCart";
const ACTIVE_PRODUCT_ORDERS = "activeProductOrders";
const ACTIVE_PLAN_ORDERS = "activePlanOrders";
const CHECKOUT_TYPE = "checkoutType";

const cartReducer = (
  cartState = {
    status: null,
    value: {
      selectedCart: BusinessTabs.PRODUCT,
      businessSchedules: [],
      orders: [],
      plans: [],
      subscriptions: [],
    },
    error: {
      code: null,
      message: null,
    },
  },
  businessState,
  scheduleState,
  transportationState,
  action
) => {
  switch (action.type) {
    case CartActionType.SET_SELECTED_CART: {
      const { selectedCart } = action.response;
      return {
        ...cartState,
        status: CartActionType.GET_ACTIVE_SCHEDULES_IN_CART,
        value: {
          ...cartState.value,
          selectedCart,
        },
      };
    }
    case CartActionType.ADD_OFFER_TO_CART: {
      const {
        product,
        offer: { id, scheduleId },
        quantity,
      } = action.response;
      const { transportationType, selectedAddressId } = transportationState.value;

      const schedule = scheduleState.value.edges.find((s) => s.node.id === scheduleId);
      const business = cartState.value.businessSchedules.find(
        (b) => b.id === businessState.value.id
      );

      // If business is not in the cart.
      if (!business) {
        const businessSchedules = [
          ...cartState.value.businessSchedules,
          {
            ...businessState.value,
            transportationType,
            selectedAddressId,
            schedules: [
              {
                ...schedule.node,
                offers: [
                  {
                    id,
                    quantity,
                    product,
                  },
                ],
              },
            ],
          },
        ];
        localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(businessSchedules));
        return {
          ...cartState,
          status: CartActionType.ADD_OFFER_TO_CART,
          value: {
            ...cartState.value,
            businessSchedules,
          },
        };
      }

      const cartSchedule = business.schedules.find((s) => s.id === scheduleId);

      // If schedule is not found
      if (!cartSchedule) {
        const businessSchedules = cartState.value.businessSchedules.map((b) =>
          b.id === businessState.value.id
            ? {
              ...b,
              schedules: [
                ...b.schedules,
                {
                  ...schedule.node,
                  offers: [
                    {
                      id,
                      quantity,
                      product,
                    },
                  ],
                },
              ],
            }
            : b
        );
        localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(businessSchedules));
        return {
          ...cartState,
          status: CartActionType.ADD_OFFER_TO_CART,
          value: {
            ...cartState.value,
            businessSchedules,
          },
        };
      }

      const cartScheduleOffer = cartSchedule.offers.find((o) => o.id === id);

      const updatedCartSchedule = {
        ...cartSchedule,
        offers: cartScheduleOffer
          ? cartSchedule.offers.map((o) =>
            o.id === id
              ? {
                ...o,
                quantity:
                  o.quantity + quantity > MAX_OFFER_QUANTITY
                    ? MAX_OFFER_QUANTITY
                    : o.quantity + quantity,
              }
              : o
          )
          : [
            ...cartSchedule.offers,
            {
              id,
              quantity,
              product,
            },
          ],
      };

      const businessSchedules = cartState.value.businessSchedules.map((b) =>
        b.id === businessState.value.id
          ? {
            ...b,
            schedules: b.schedules.map((s) => (s.id === scheduleId ? updatedCartSchedule : s)),
          }
          : b
      );

      localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(businessSchedules));

      return {
        ...cartState,
        status: CartActionType.ADD_OFFER_TO_CART,
        value: {
          ...cartState.value,
          businessSchedules,
        },
      };
    }
    case CartActionType.ADD_PLAN_TO_CART: {
      const { plan, quantity } = action.response;
      const updatedPlans =
        cartState.value.plans.filter((p) => p.plan.id === plan.id).length > 0
          ? cartState.value.plans.map((p) => {
            if (p.plan.id === plan.id) {
              return {
                ...p,
                quantity: p.quantity + quantity,
              };
            }
            return p;
          })
          : [...cartState.value.plans, { plan, quantity }];

      return {
        ...cartState,
        status: CartActionType.ADD_OFFER_TO_CART,
        value: {
          ...cartState.value,
          plans: updatedPlans,
        },
      };
    }
    case CartActionType.CLEAR_BUSINESS_SCHEDULE_IN_CART: {
      const { businessId } = action.response;
      const updatedBusinessSchedules = cartState.value.businessSchedules.filter(
        (b) => b.id !== businessId
      );

      localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(updatedBusinessSchedules));

      return {
        ...cartState,
        status: CartActionType.CLEAR_BUSINESS_SCHEDULE_IN_CART,
        value: {
          ...cartState.value,
          businessSchedules: updatedBusinessSchedules,
        },
      };
    }
    case CartActionType.CLEAR_PRODUCT_ORDERS_IN_CART: {
      localStorage.removeItem(ACTIVE_PRODUCT_ORDERS);
      return {
        ...cartState,
        status: CartActionType.CLEAR_PRODUCT_ORDERS_IN_CART,
        value: {
          ...cartState.value,
          orders: [],
        },
      };
    }
    case CartActionType.CLEAR_PLAN_ORDERS_IN_CART: {
      localStorage.removeItem(ACTIVE_PLAN_ORDERS);
      return {
        ...cartState,
        status: CartActionType.CLEAR_PLAN_ORDERS_IN_CART,
        value: {
          ...cartState.value,
          plans: [],
        },
      };
    }
    case CartActionType.REMOVE_PLAN_ORDER_IN_CART: {
      const { planId } = action.response;
      return {
        ...cartState,
        status: CartActionType.REMOVE_PLAN_ORDER_IN_CART,
        value: {
          ...cartState.value,
          plans: cartState.value.plans.filter((p) => p.plan.id !== planId),
        },
      };
    }
    case CartActionType.SET_ACTIVE_PLAN_ORDERS_IN_CART: {
      const { plans } = cartState.value;
      localStorage.setItem(CHECKOUT_TYPE, CheckoutType.SUBSCRIPTION);
      localStorage.setItem(ACTIVE_PLAN_ORDERS, JSON.stringify(plans));
      return {
        ...cartState,
        checkoutType: CheckoutType.SUBSCRIPTION,
        status: CartActionType.SET_ACTIVE_PLAN_ORDERS_IN_CART,
      };
    }
    case CartActionType.SET_SCHEDULE_OFFERS: {
      const { scheduleId, offers } = action.response;
      const businessId = businessState.value.id;
      const business = cartState.value.businessSchedules.find((b) => b.id === businessId);

      let updatedSchedules;
      // If no offers are found, remove schedule
      if (offers.length === 0) {
        updatedSchedules = business.schedules.filter((s) => s.id !== scheduleId);
      } else {
        updatedSchedules = business.schedules.map((s) =>
          s.id === scheduleId
            ? {
              ...s,
              offers,
            }
            : s
        );
      }

      const businessSchedules = cartState.value.businessSchedules.map((b) =>
        b.id === businessId
          ? {
            ...b,
            schedules: updatedSchedules,
          }
          : b
      );
      localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(businessSchedules));

      return {
        ...cartState,
        status: CartActionType.SET_SCHEDULE_OFFERS,
        value: {
          ...cartState.value,
          businessSchedules,
        },
      };
    }
    case CartActionType.GET_CHECKOUT_TYPE: {
      const checkoutType = localStorage.getItem(CHECKOUT_TYPE);

      return {
        ...cartState,
        status: CartActionType.GET_CHECKOUT_TYPE,
        value: {
          ...cartState.value,
          checkoutType,
        },
      };
    }
    case CartActionType.GET_ACTIVE_SCHEDULES_IN_CART: {
      const today = new Date();
      const schedulesInCart = localStorage.getItem(ACTIVE_SCHEDULES_IN_CART);
      const businessSchedules = schedulesInCart ? JSON.parse(schedulesInCart) : [];

      let filteredBusinessSchedules = [];

      businessSchedules.forEach((b) => {
        const filteredSchedules = b.schedules.filter((s) => s.orderCutoff > today.getTime());
        if (filteredSchedules.length > 0) {
          filteredBusinessSchedules.push({
            ...b,
            schedules: filteredSchedules,
          });
        }
      });

      localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(filteredBusinessSchedules));

      return {
        ...cartState,
        status: CartActionType.GET_ACTIVE_SCHEDULES_IN_CART,
        value: {
          ...cartState.value,
          businessSchedules: filteredBusinessSchedules,
        },
      };
    }
    case CartActionType.GET_ACTIVE_ORDERS: {
      const activeOrders = localStorage.getItem(ACTIVE_PRODUCT_ORDERS);
      return {
        ...cartState,
        status: CartActionType.GET_ACTIVE_ORDERS,
        value: {
          ...cartState.value,
          orders: activeOrders === null ? [] : JSON.parse(activeOrders),
        },
      };
    }
    case CartActionType.GET_ACTIVE_PLAN_ORDERS: {
      const activePlanOrders = localStorage.getItem(ACTIVE_PLAN_ORDERS);
      return {
        ...cartState,
        status: CartActionType.GET_ACTIVE_PLAN_ORDERS,
        value: {
          ...cartState.value,
          plans: activePlanOrders === null ? [] : JSON.parse(activePlanOrders),
        },
      };
    }
    case TransportationActionType.SET_SELECTED_ADDRESS_ID: {
      const selectedAddressId = action.response;
      const { transportationType } = transportationState.value;
      const businessId = businessState.value.id;

      const businessSchedule = cartState.value.businessSchedules
        .find(b => b.id === businessId);

      // If it's a delivery, then apply address change to all business schedules 
      if (businessSchedule && businessSchedule.transportationType === TransportationType.DELIVERY
        && transportationType === TransportationType.DELIVERY) {
        const updatedBusinessSchedules = cartState.value.businessSchedules
          .map(b => b.id === businessId ?
            {
              ...b,
              selectedAddressId
            } :
            b
          );

        return {
          ...cartState,
          value: {
            ...cartState.value,
            businessSchedules: updatedBusinessSchedules
          }
        }
      }

      return cartState;
    }
    case OrderActionType.CREATE_ORDERS_REQUESTED: {
      return {
        ...cartState,
        status: OrderActionType.CREATE_ORDERS_REQUESTED,
      };
    }
    case OrderActionType.CREATE_ORDERS_SUCCESS: {
      const { orders } = action.response.createOrders;
      localStorage.setItem(CHECKOUT_TYPE, CheckoutType.ORDER);
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(orders));
      return {
        ...cartState,
        status: OrderActionType.CREATE_ORDERS_SUCCESS,
        value: {
          ...cartState.value,
          checkoutType: CheckoutType.ORDER,
          orders,
        },
      };
    }
    case OrderActionType.CREATE_ORDERS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...cartState,
        status: OrderActionType.CREATE_ORDERS_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case OrderActionType.UPDATE_ORDER_REQUESTED: {
      return {
        ...cartState,
        status: OrderActionType.UPDATE_ORDER_REQUESTED,
      };
    }
    case OrderActionType.UPDATE_ORDER_SUCCESS: {
      const { order } = action.response.updateOrder;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === order.id) {
          return {
            ...o,
            ...order,
          };
        }
        return o;
      });

      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: action.type,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderActionType.UPDATE_ORDER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];
      const message = buildErrorMessage(errors[0]);
      return {
        ...cartState,
        status: OrderActionType.UPDATE_ORDER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case OrderActionType.DELETE_ORDER_REQUESTED: {
      return {
        ...cartState,
        status: OrderActionType.DELETE_ORDER_REQUESTED,
      };
    }
    case OrderActionType.DELETE_ORDER_SUCCESS: {
      const isDeleted = action.response.deleteOrder;
      const { orderId } = action.payload;
      const orders = isDeleted
        ? cartState.value.orders.filter((o) => o.id !== orderId)
        : cartState.value.orders;
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(orders));
      return {
        ...cartState,
        status: OrderActionType.DELETE_ORDER_SUCCESS,
        value: {
          ...cartState.value,
          orders,
        },
      };
    }
    case OrderActionType.DELETE_ORDER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...cartState,
        status: OrderActionType.DELETE_ORDER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case OrderActionType.APPLY_COUPON_TO_ORDER_REQUESTED:
    case OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_REQUESTED:
    case OrderActionType.APPLY_CARD_TO_ORDER_REQUESTED:
    case OrderActionType.GET_ORDER_REQUESTED:
    case OrderActionType.TRANSITION_ORDER_REQUESTED:
    case OrderActionType.CALCULATE_ORDER_REQUESTED: {
      const { orderId } = action.payload;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            cartStatus: action.type,
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: action.type,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderActionType.GET_ORDER_SUCCESS: {
      const { order } = action.response;
      return updateCartOrderState({ action, cartState, order });
    }
    case OrderActionType.TRANSITION_ORDER_SUCCESS: {
      const { order } = action.response.transitionOrder;
      return updateCartOrderState({ action, cartState, order });
    }
    case OrderActionType.CALCULATE_ORDER_SUCCESS: {
      const { order } = action.response.calculateOrder;
      return updateCartOrderState({ action, cartState, order });
    }
    case OrderActionType.APPLY_CARD_TO_ORDER_ERROR:
    case OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_ERROR:
    case OrderActionType.GET_ORDER_ERROR:
    case OrderActionType.TRANSITION_ORDER_ERROR:
    case OrderActionType.CALCULATE_ORDER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0].extensions;
      // TODO create a buildError util that returns code and message so
      // buildErrorMessage can just focus on building the readable user message
      const message = buildErrorMessage(errors[0]);

      const { orderId } = action.payload;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            cartStatus: action.type,
            error: {
              code,
              message,
            },
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: action.type,
        error: {
          code,
          message,
        },
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderActionType.APPLY_COUPON_TO_ORDER_SUCCESS: {
      const { order } = action.response.applyCouponToOrder;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === order.id) {
          return {
            ...o,
            ...order,
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: OrderActionType.APPLY_COUPON_TO_ORDER_SUCCESS,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderActionType.APPLY_COUPON_TO_ORDER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...cartState,
        status: action.type,
        error: {
          code,
          message,
        },
      };
    }
    case OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_SUCCESS: {
      const { order } = action.response.applyDeliveryAddressToOrder;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === order.id) {
          const updatedOrder = {
            ...o,
            ...order,
            cartStatus: action.type,
          };
          delete updatedOrder.error;
          return updatedOrder;
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_SUCCESS,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderActionType.APPLY_CODE_TO_ORDER_REQUESTED: {
      return {
        ...cartState,
        status: OrderActionType.APPLY_CODE_TO_ORDER_REQUESTED,
      };
    }
    case OrderActionType.APPLY_CODE_TO_ORDER_SUCCESS: {
      const { order } = action.response.applyCardToOrder;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === order.id) {
          return {
            ...o,
            ...order,
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: OrderActionType.APPLY_CODE_TO_ORDER_SUCCESS,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderActionType.APPLY_CARD_TO_ORDER_SUCCESS: {
      const { order } = action.response.applyCardToOrder;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === order.id) {
          const updatedOrder = {
            ...o,
            ...order,
            cartStatus: action.type,
          };
          // If an order has an error, we don't want a card update to remove that error
          // since the card update has nothing to do with the error
          // delete updatedOrder.error;
          return updatedOrder;
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: action.type,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderItemActionType.CREATE_ORDER_ITEM_REQUESTED: {
      return {
        ...cartState,
        status: OrderItemActionType.CREATE_ORDER_ITEM_REQUESTED,
      };
    }
    case OrderItemActionType.CREATE_ORDER_ITEM_SUCCESS: {
      const { orderItem } = action.response.createOrderItem;
      const { orderId, offerId, businessId, scheduleId } = action.payload;

      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderItems: o.orderItems ? [...o.orderItems, orderItem] : [orderItem],
          };
        }
        return o;
      });

      const updatedBusinessSchedules = cartState.value.businessSchedules.map((bs) => {
        if (bs.id === businessId) {
          return {
            ...bs,
            schedules: bs.schedules.map((s) => {
              if (s.id === scheduleId) {
                return {
                  ...s,
                  offers: s.offers.map((of) => {
                    if (of.id === offerId) {
                      const updatedOffer = {
                        ...of,
                        cartStatus: action.type,
                      };

                      delete updatedOffer.error;
                      return updatedOffer;
                    }

                    return of;
                  }),
                };
              }

              return s;
            }),
          };
        }

        return bs;
      });

      localStorage.setItem(ACTIVE_SCHEDULES_IN_CART, JSON.stringify(updatedBusinessSchedules));
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: OrderItemActionType.CREATE_ORDER_ITEM_SUCCESS,
        value: {
          ...cartState.value,
          businessSchedules: updatedBusinessSchedules,
          orders: updatedOrders,
        },
      };
    }
    case OrderItemActionType.CREATE_ORDER_ITEM_ERROR: {
      const { offerId, businessId, scheduleId } = action.payload;

      const { errors } = action.error;
      const { code, extensions } = errors[0];

      const message = buildErrorMessage(errors[0]);

      const updatedBusinessSchedules = cartState.value.businessSchedules.map((bs) => {
        if (bs.id === businessId) {
          return {
            ...bs,
            schedules: bs.schedules.map((s) => {
              if (s.id === scheduleId) {
                return {
                  ...s,
                  offers: s.offers.map((of) => {
                    if (of.id === offerId) {
                      return {
                        ...of,
                        cartStatus: action.type,
                        error: {
                          code: code !== undefined ? code : extensions.code,
                          message,
                        },
                      };
                    }

                    return of;
                  }),
                };
              }

              return s;
            }),
          };
        }

        return bs;
      });

      return {
        ...cartState,
        status: OrderItemActionType.CREATE_ORDER_ITEM_ERROR,
        value: {
          ...cartState.value,
          businessSchedules: updatedBusinessSchedules,
        },
        error: {
          code,
          message,
        },
      };
    }
    case OrderItemActionType.DELETE_ORDER_ITEM_REQUESTED:
    case OrderItemActionType.UPDATE_ORDER_ITEM_REQUESTED: {
      const { orderId, orderItemId } = action.payload;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            cartStatus: action.type,
            orderItems: o.orderItems.map((oi) => {
              if (oi.id === orderItemId) {
                return {
                  ...oi,
                  cartStatus: action.type,
                };
              }
              return oi;
            }),
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: action.type,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderItemActionType.UPDATE_ORDER_ITEM_SUCCESS: {
      const { orderItem } = action.response.updateOrderItem;
      const { orderId } = action.payload;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            cartStatus: action.type,
            orderItems: o.orderItems.map((oi) => {
              if (oi.id === orderItem.id) {
                const updatedOrderItem = {
                  ...oi,
                  cartStatus: action.type,
                  quantity: orderItem.quantity,
                };
                delete updatedOrderItem.error;
                return updatedOrderItem;
              }
              return oi;
            }),
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: OrderItemActionType.UPDATE_ORDER_ITEM_SUCCESS,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderItemActionType.DELETE_ORDER_ITEM_ERROR:
    case OrderItemActionType.UPDATE_ORDER_ITEM_ERROR: {
      const { errors } = action.error;
      const { code, extensions } = errors[0];

      const message = buildErrorMessage(errors[0]);

      const { orderId, orderItemId } = action.payload;
      const updatedOrders = cartState.value.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderItems: o.orderItems.map((oi) => {
              if (oi.id === orderItemId) {
                return {
                  ...oi,
                  cartStatus: action.type,
                  error: {
                    code: code !== undefined ? code : extensions.code,
                    message,
                  },
                };
              }
              return oi;
            }),
          };
        }
        return o;
      });
      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));

      return {
        ...cartState,
        status: OrderItemActionType.UPDATE_ORDER_ITEM_ERROR,
        error: {
          code,
          message,
        },
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case OrderItemActionType.DELETE_ORDER_ITEM_SUCCESS: {
      const isDeleted = action.response.deleteOrderItem;
      const { orderId, orderItemId } = action.payload;

      const updatedOrders = isDeleted
        ? cartState.value.orders.map((o) => {
          if (o.id === orderId) {
            return {
              ...o,
              cartStatus: action.type,
              orderItems: o.orderItems.filter((oi) => oi.id !== orderItemId),
            };
          }
          return o;
        })
        : cartState.value.orders;

      localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
      return {
        ...cartState,
        status: OrderItemActionType.UPDATE_ORDER_ITEM_SUCCESS,
        value: {
          ...cartState.value,
          orders: updatedOrders,
        },
      };
    }
    case SubscriptionActionType.CREATE_SUBSCRIPTION_REQUESTED: {
      return {
        ...cartState,
        status: action.type,
      };
    }
    case SubscriptionActionType.CREATE_SUBSCRIPTION_SUCCESS: {
      const { subscription } = action.response.createSubscription;
      const updatedSchedules = cartState.value.subscriptions.map((s) => {
        if (s.id === subscription.id) {
          return {
            ...s,
            ...subscription,
          };
        }
        return s;
      });
      return {
        ...cartState,
        status: action.type,
        value: {
          ...cartState.value,
          subscriptions: updatedSchedules,
        },
      };
    }
    case SubscriptionActionType.CREATE_SUBSCRIPTION_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];
      const message = buildErrorMessage(errors[0]);
      return {
        ...cartState,
        status: action.type,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return cartState;
  }
};

const updateCartOrderState = (params) => {
  const { action, cartState, order } = params;
  const updatedOrders = cartState.value.orders.map((o) => {
    if (o.id === order.id) {
      const updatedOrder = {
        ...o,
        ...order,
        cartStatus: action.type,
      };
      delete updatedOrder.error;
      return updatedOrder;
    }
    return o;
  });
  localStorage.setItem(ACTIVE_PRODUCT_ORDERS, JSON.stringify(updatedOrders));
  return {
    ...cartState,
    status: action.type,
    value: {
      ...cartState.value,
      orders: updatedOrders,
    },
  };
};

export default cartReducer;
