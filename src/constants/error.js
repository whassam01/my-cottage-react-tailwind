export const ErrorCode = {
  // General
  GRAPHQL: "GraphQLError",
  BAD_USER_INPUT: "BAD_USER_INPUT",

  // Address
  ADDRESS_NOT_FOUND_ERROR: "ADDRESS_NOT_FOUND_ERROR",

  // Card
  CARD_EXPIRED_ERROR: "CARD_EXPIRED_ERROR",
  CARD_LIMIT_EXCEEDED: "CARD_LIMIT_EXCEEDED_ERROR",
  // Coupon
  COUPON_NOT_FOUND_ERROR: "COUPON_NOT_FOUND_ERROR",

  // Schedule
  SCHEDULE_NOT_FOUND_ERROR: "SCHEDULE_NOT_FOUND_ERROR",

  // Sign up
  USERNAME_EXISTS_ERROR: "UsernameExistsException",

  // Subscription
  MULTIPLE_SUBSCRIPTIONS_ERROR: "MULTIPLE_SUBSCRIPTIONS_ERROR",

  // Offer
  OFFER_NOT_FOUND_ERROR: "OFFER_NOT_FOUND_ERROR",
  OFFER_QUANTITY_EXCEEDED_ERROR: "OFFER_QUANTITY_EXCEEDED_ERROR",

  // Order
  SCHEDULE_EXPIRED_ERROR: "SCHEDULE_EXPIRED_ERROR",
  DELIVERY_REQUIREMENT_ERROR: "DELIVERY_REQUIREMENT_ERROR",
  DELIVERY_OUT_OF_RANGE_ERROR: "DELIVERY_OUT_OF_RANGE_ERROR",
};

export const ErrorMessage = {
  // General
  [ErrorCode.BAD_USER_INPUT]: "Input was invalid",

  // Address
  [ErrorCode.ADDRESS_NOT_FOUND_ERROR]: "Address is not found",

  // Card
  [ErrorCode.CARD_EXPIRED_ERROR]: "Expired card",
  [ErrorCode.CARD_LIMIT_EXCEEDED]: "Card limit reached",

  // Coupon
  [ErrorCode.COUPON_NOT_FOUND_ERROR]: "Invalid code",

  // Delivery
  [ErrorCode.DELIVERY_REQUIREMENT_ERROR]: "Subtotal does not meet the minimum for delivery",
  [ErrorCode.DELIVERY_OUT_OF_RANGE_ERROR]: "Delivery is unavailable for the address selected.",

  // Offer
  [ErrorCode.OFFER_NOT_FOUND_ERROR]: "An offer in your cart is no longer available.",
  [ErrorCode.OFFER_QUANTITY_EXCEEDED_ERROR]:
    "This quantity exceeds the availabilty, try lowering the quantity.",

  // Schedule
  [ErrorCode.SCHEDULE_NOT_FOUND_ERROR]:
    "A schedule in your cart has been removed and is no longer available.",
  [ErrorCode.SCHEDULE_EXPIRED_ERROR]: "A schedule has expired, please refresh.",

  // Subscription
  [ErrorCode.MULTIPLE_SUBSCRIPTIONS_ERROR]:
    "You already have an active subscription with this business",
};
