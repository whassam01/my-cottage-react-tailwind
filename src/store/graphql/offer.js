export const businessOffersQuery = `query ($input: ByIdInput!, $filters:FilterOffersInput) {
    business(input: $input) {
      offers(input: $filters) {
        edges {
          node {
            id
            status
            createdAt
            updatedAt
            productId
            scheduleId
            soldQuantity
            maxQuantity
          }
        }
      }
    }
  }`;
