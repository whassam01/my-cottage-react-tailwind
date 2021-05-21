export const businessSchedulesQuery = `query ($input: ByIdInput!, $filters:FilterSchedulesInput) {
    business(input: $input) {
      schedules(input: $filters) {
        edges {
          node {
            id
            type
            status
            createdAt
            updatedAt
            orderReadyStart
            orderReadyEnd
            orderCutoff
            pickupAddresses {
              id
              status
              street
              city
              postalCode
              country
              stateOrProvince
            }
          }
        }
      }
    }
  }`;
