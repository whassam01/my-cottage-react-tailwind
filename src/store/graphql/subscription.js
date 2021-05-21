export const createSubscriptionMutation = `mutation ($input: CreateSubscriptionInput!) {
    createSubscription (input: $input) {
      subscription {
        id
        status
        createdAt
        updatedAt
      }
    }
  }`;

export const updateSubscriptionMutation = `mutation ($input: UpdateSubscriptionInput!) {
    updateSubscription (input: $input) {
      subscription {
        id
        card {
          id
          lastFour
          brand
          expMonth
          expYear
        }
      }
    }
  }`;

export const archiveSubscriptionMutation = `mutation ($input: ArchiveSubscriptionInput!) {
    archiveSubscription (input: $input) {
      subscription {
        id
      }
    }
  }`;

export const getSubscriptionsQuery = `query ($input: NullableByIdInput) {
  consumer(input: $input) {
    subscriptions {
      id,
      status,
      plan {
        title
        createdAt
        status
        price {
          amount
          currency {
            symbol
            abbreviation
          }
        }
        interval
      }
      business {
        profile {
          title
        }
      }
    }
  }
}`;
