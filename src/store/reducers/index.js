// Email
import emailReducer from "./email";

// Auth
import authenticationReducer from "./authentication";

// Business
import businessIdReducer from "./business/id";
import businessLocationReducer from "./business/location";
import businessOfferReducer from "./business/offer";
import businessPlanReducer from "./business/plan";
import businessProductReducer from "./business/product";
import businessProfileReducer from "./business/profile";
import businessScheduleReducer from "./business/schedule";
import businessTaxRateReducer from "./business/taxRate";
import businessTransportationReducer from "./business/transportation";

// Cart
import cartReducer from "./cart";

// Consumer
import consumerAccountReducer from "./consumer/account";
import consumerAddressReducer from "./consumer/address";
import consumerCardReducer from "./consumer/card";
import consumerProfileReducer from "./consumer/profile";
import consumerOrderReducer from "./consumer/order";
import consumerSubscriptionReducer from "./consumer/subscription";
import consumerSubscriptionInvoiceReducer from "./consumer/subscriptionInvoice";

import mobileViewReducer from "./mobile";

// Utilities
import { BusinessTabs, TransportationType, DEFAULT_PRODUCT_CATEGORY } from "../../constants";

const cottageState = {
  email: {
    status: null,
    value: {
      payload: {},
    },
    error: {
      code: null,
      message: null,
    },
  },
  authentication: {
    status: null,
    value: {
      user: null,
      isAuthenticated: false,
    },
    error: {
      code: null,
      message: null,
    },
  },
  cart: {
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
  consumer: {
    account: {
      status: null,
      error: {
        code: null,
        message: null,
      },
    },
    address: {
      status: null,
      value: {
        id: null,
        total: 0,
        edges: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    card: {
      status: null,
      value: {
        id: null,
        total: 0,
        edges: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    profile: {
      status: null,
      value: {
        profile: {},
      },
      error: {
        code: null,
        message: null,
      },
    },
    order: {
      status: null,
      value: {
        pageInfo: null,
        edges: [],
        total: 0,
      },
      error: {
        code: null,
        message: null,
      },
    },
    subscription: {
      status: null,
      value: {
        id: null,
        subscriptions: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    subscriptionInvoice: {
      status: null,
      value: {
        pageInfo: null,
        edges: [],
        total: 0,
      },
      error: {
        code: null,
        message: null,
      },
    },
  },
  business: {
    id: {
      status: null,
      value: {
        id: null,
      },
      error: {
        code: null,
        message: null,
      },
    },
    location: {
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
    offer: {
      status: null,
      value: {
        edges: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    plan: {
      status: null,
      value: {
        edges: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    product: {
      status: null,
      value: {
        selectedCategory: DEFAULT_PRODUCT_CATEGORY,
        categories: [],
        edges: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    profile: {
      status: null,
      value: {},
      error: {
        code: null,
        message: null,
      },
    },
    schedule: {
      status: null,
      value: {
        edges: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
    transportation: {
      status: null,
      value: {
        transportationType: TransportationType.DELIVERY,
        selectedAddressId: null,
        pickupAddresses: {
          total: 0,
          edges: [],
        },
        deliveries: {
          total: 0,
          edges: [],
        },
      },
      error: {
        code: null,
        message: null,
      },
    },
    taxRate: {
      status: null,
      value: {
        data: [],
      },
      error: {
        code: null,
        message: null,
      },
    },
  },
  mobileView: {
    isMobileView: false,
    showMobileMenu: false,
  },
};

const reducer = (state = cottageState, action) => {
  return {
    email: emailReducer(state.email, action),
    authentication: authenticationReducer(state.authentication, action),
    cart: cartReducer(state.cart, state.business.id, state.business.schedule, state.business.transportation, action),
    consumer: {
      account: consumerAccountReducer(state.consumer.account, action),
      address: consumerAddressReducer(state.consumer.address, action),
      card: consumerCardReducer(state.consumer.card, action),
      profile: consumerProfileReducer(state.consumer.profile, action),
      order: consumerOrderReducer(state.consumer.order, action),
      subscription: consumerSubscriptionReducer(state.consumer.subscription, action),
      subscriptionInvoice: consumerSubscriptionInvoiceReducer(
        state.consumer.subscriptionInvoice,
        action
      ),
    },
    business: {
      id: businessIdReducer(state.business.id, action),
      location: businessLocationReducer(state.business.location, action),
      offer: businessOfferReducer(state.business.offer, action),
      schedule: businessScheduleReducer(state.business.schedule, action),
      plan: businessPlanReducer(state.business.plan, action),
      product: businessProductReducer(state.business.product, action),
      profile: businessProfileReducer(state.business.profile, action),
      taxRate: businessTaxRateReducer(state.business.taxRate, action),
      transportation: businessTransportationReducer(
        state.business.transportation,
        state.consumer.address,
        action
      ),
    },
    mobileView: mobileViewReducer(state.mobileView, action),
  };
};

export default reducer;
