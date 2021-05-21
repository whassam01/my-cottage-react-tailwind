export const createConsumerCardMutation = `mutation ($input: CreateConsumerCardInput!) {
    createConsumerCard (input: $input) {
      card {
        id
        lastFour
        brand
        expMonth
        expYear
      }
    }
  }`;

export const archiveConsumerCardMutation = `mutation ($input: ArchiveConsumerCardInput!) {
    archiveConsumerCard (input: $input) {
      card {
        id
      }
    }
  }`;

export const getCardsQuery = `query ($input: NullableByIdInput) {
    consumer (input: $input) {
      id,
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
    }
  }`;
