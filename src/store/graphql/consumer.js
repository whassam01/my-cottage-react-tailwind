export const getConsumerQuery = `query ($input: NullableByIdInput) {
    consumer (input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
      avatar
      role
      addresses {
        total
        edges {
          node {
            id
            street
            street2
            city
            postalCode
            stateOrProvince
            country
          }
        }
      }
      cards {
        total
        edges {
          node {
            id
            lastFour
            brand
            expMonth
            expYear
          }
        }
      }
      subscriptions {
        id
        status
        createdAt
        updatedAt
        business {
          id
          profile {
            title
          }
        }
        plan {
          id
          status
          title
          description
          interval
          price {
            amount
            currency {
              symbol
            }
          }
        }
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

export const createConsumerMutation = `mutation ($input: CreateConsumerInput!) {
    createConsumer (input: $input) {
      consumer {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }`;

export const createGuestConsumerMutation = `mutation ($input: CreateConsumerInput!) {
    createGuestConsumer (input: $input) {
      consumer {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }`;

export const updateConsumerMutation = `mutation ($input: UpdateConsumerInput!) {
    updateConsumer (input: $input) {
      consumer {
        id
        firstName
        lastName
        email
        phoneNumber
        avatar
      }
    }
  }`;
