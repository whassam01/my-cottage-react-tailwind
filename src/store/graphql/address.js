export const createConsumerAddressMutation = `mutation ($input: CreateConsumerAddressInput!) {
    createConsumerAddress (input: $input) {
      address {
        id
        status
        street
        street2
        city
        postalCode
        stateOrProvince
        country
        createdAt
      }
    }
  }`;

export const archiveConsumerAddressMutation = `mutation ($input: ArchiveConsumerAddressInput!) {
    archiveConsumerAddress (input: $input) {
      address {
        id
        status
      }
    }
  }`;

export const getAddressesQuery = `query ($input: NullableByIdInput) {
    consumer (input: $input) {
      id,
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
    }
  }`;
