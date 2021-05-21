export const consumerSubscriptionInvoicesQuery = `query ($input: NullableByIdInput, $filters:FilterSubscriptionInvoicesInput, $pagination: PaginationInput) {
    consumer(input: $input) {
      subscriptionInvoices(input: $filters, pagination: $pagination) {
        total
        pageInfo { 
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            createdAt
            updatedAt
            number
            status
            paymentStatus
            businessTitle
            businessUrlDomain
            businessUrlSubdomain
            planTitle
            cardLastFour
            cost {
              subtotal {
                amount 
                currency {
                  abbreviation
                  symbol
                }
              }
              estimatedTax {
                amount 
                currency {
                  abbreviation
                  symbol
                }
              }
              serviceFee {
                amount 
                currency {
                  abbreviation
                  symbol
                }
              }
              total {
                amount 
                currency {
                  abbreviation
                  symbol
                }
              }
            }
            period {
              start
              end
            }
          }
        }
      }
    }
  }`;
