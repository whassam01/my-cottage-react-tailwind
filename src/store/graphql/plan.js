export const businessPlansQuery = `query ($input: ByIdInput!, $filters:FilterPlansInput) {
    business(input: $input) {
      plans(input: $filters) {
        edges {
          node {
            id
            createdAt
            updatedAt
            title
            description
            images
            interval
            quantity
            price {
              amount
              currency {
                abbreviation
                symbol
              }
            }
          }
        }
      }
    }
  }`;
