export const getBusinessesByDomainQuery = `query ($input: ByDomainInput!) {
    businessesByDomain (input: $input) {
      edges {
        node {
          id
          status
          urlDomain
          urlSubdomain
          profile {
            title
            location
            email
            phoneNumber
            coverImage
            avatarImage
            description
            website
          }
        }
      }
    }
  }`;

export const businessTransportationQuery = `query ($input: ByIdInput!) {
    business(input: $input) {
      pickupAddresses {
        total
        edges {
          node {
            id
            createdAt
            status
            title
            street
            city
            postalCode
            stateOrProvince
            country
          }
        }
      }
      deliveries {
        total
        edges {
          node {
            id
            status
            minimumTotal {
              amount
              currency {
                abbreviation
                symbol
              }
            }
            fee {
              amount
              currency {
                abbreviation
                symbol
              }
            }
            postalCodes
          }
        }
      }
    }
  }`;
