export const SubscriptionFormFieldContent = {
  BUSINESS: {
    title: "BUSINESS",
    label: "Business",
    field: "business",
  },
  SUBSCRIPTION: {
    title: "SUBSCRIPTION",
    label: "Subscription",
    field: "plan",
  },
  CARD: {
    title: "CARD",
    label: "Card",
    field: "cardId",
  },
};
const { BUSINESS, SUBSCRIPTION, CARD } = SubscriptionFormFieldContent;

export const SubscriptionFormInitialValues = (subItem) => {
  const { business, plan, card } = subItem;
  return {
    [BUSINESS.field]: business.profile.title,
    [SUBSCRIPTION.field]: plan.title,
    [CARD.field]: card.id,
  };
};
