export const consumerOrderQuery = `query ($input: NullableByIdInput, $filters: FilterOrdersInput, $pagination: PaginationInput) {
    order(input: $input) {
      id
      number
      type
      status
      createdAt
      updatedAt
      note
      couponName
      planTitle
      cardId
      cardLastFour
      subscriptionCreditsUsed
      business {
        id
        urlDomain
        urlSubdomain
        profile {
          title
          phoneNumber
          email
        }
      }
      schedule {
        id
        type
        orderReadyStart
        orderReadyEnd
      }
      orderItems {
        id
        createdAt
        updatedAt
        quantity
        title
        price {
          amount
          currency {
            abbreviation
            symbol
          }
        }
      }
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
        deliveryFee {
          amount
          currency {
            abbreviation
            symbol
          }
        }
        couponAmount {
          amount
          currency {
            abbreviation
            symbol
          }
        }
        subscriptionAmount {
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
    }
  }`;

export const consumerOrdersQuery = `query ($input: NullableByIdInput, $filters: FilterOrdersInput, $pagination: PaginationInput) {
    consumer(input: $input) {
      orders(input: $filters, pagination: $pagination) {
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
            number
            type
            status
            createdAt
            updatedAt
            note
            couponName
            planTitle
            cardId
            cardLastFour
            business {
              id
              urlDomain
              urlSubdomain
              profile {
                title
                phoneNumber
                email
              }
            }
            consumerAddress {
              street
              street2
              city
              postalCode
              country
              stateOrProvince
            }
            pickupAddress {
              street
              street2
              city
              postalCode
              country
              stateOrProvince
              title
            }
            orderItems {
              id
              title
              quantity
              price {
                amount
                currency {
                  abbreviation
                  symbol
                }
              }
            }
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
              deliveryFee {
                amount
                currency {
                  abbreviation
                  symbol
                }
              }
              couponAmount {
                amount
                currency {
                  abbreviation
                  symbol
                }
              }
              subscriptionAmount {
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
          }
        }
      }
    }
  }`;

export const createOrdersMutation = `mutation ($input: CreateOrdersInput!) {
    createOrders (input: $input) {
      orders {
        id
        schedule {
          id
        }
      }
    }
  }`;

export const updateOrderMutation = `mutation ($input: UpdateOrderInput!) {
    updateOrder (input: $input) {
      order {
        id
        number
        type
        status
        createdAt
        updatedAt
        note
        couponName
        planTitle
        cardId
        cardLastFour
        schedule {
          id
          type
          orderReadyStart
          orderReadyEnd
        }
        orderItems {
          id
          createdAt
          updatedAt
          quantity
          title
          price {
            amount
            currency {
              abbreviation
              symbol
            }
          }
        }
        consumerAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
        }
        pickupAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
          title
        }
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
          deliveryFee {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          couponAmount {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          subscriptionAmount {
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
      }
    }
  }`;

export const deleteOrderMutation = `mutation ($input: DeleteOrderInput!) {
    deleteOrder (input: $input)
  }`;

export const transitionOrderMutation = `mutation ($input: TransitionOrderInput!) {
    transitionOrder (input: $input) {
      order {
        id
        number
        type
        status
        createdAt
        updatedAt
        note
        couponName
        planTitle
        cardId
        cardLastFour
        schedule {
          id
          type
          orderReadyStart
          orderReadyEnd
        }
        orderItems {
          id
          createdAt
          updatedAt
          quantity
          title
          price {
            amount
            currency {
              abbreviation
              symbol
            }
          }
        }
        consumerAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
        }
        pickupAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
          title
        }
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
          deliveryFee {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          couponAmount {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          subscriptionAmount {
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
      }
    }
  }`;

export const calculateOrderMutation = `mutation ($input: CalculateOrderInput!) {
    calculateOrder (input: $input) {
      order {
        id
        number
        type
        status
        createdAt
        updatedAt
        note
        couponName
        planTitle
        cardId
        cardLastFour
        schedule {
          id
          type
          orderReadyStart
          orderReadyEnd
        }
        orderItems {
          id
          createdAt
          updatedAt
          quantity
          title
          price {
            amount
            currency {
              abbreviation
              symbol
            }
          }
        }
        consumerAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
        }
        pickupAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
          title
        }
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
          deliveryFee {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          couponAmount {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          subscriptionAmount {
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
      }
    }
  }`;

export const applyCouponToOrderMutation = `mutation ($input: ApplyCouponToOrderInput!) {
    applyCouponToOrder (input: $input) {
      order {
        id
        status
        couponName
        note
        cardId
        cardLastFour
        orderItems {
          id
          createdAt
          updatedAt
          quantity
          title
          price {
            amount
            currency {
              abbreviation
              symbol
            }
          }
        }
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
          deliveryFee {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          couponAmount {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          subscriptionAmount {
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
      }
    }
  }`;

export const applyDeliveryAddressToOrderMutation = `mutation ($input: ApplyDeliveryAddressToOrderInput!) {
    applyDeliveryAddressToOrder (input: $input) {
      order {
        id
        status
        cardId
        cardLastFour
        consumerAddress {
          id
          street
          street2
          city
          postalCode
          country
          stateOrProvince
        }
        delivery {
          id
          createdAt
          updatedAt
          status
          fee {
            amount
            currency {
              symbol
              abbreviation
            }
          }
        }
        orderItems {
          id
          createdAt
          updatedAt
          quantity
          title
          price {
            amount
            currency {
              abbreviation
              symbol
            }
          }
        }
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
          deliveryFee {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          couponAmount {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          subscriptionAmount {
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
      }
    }
  }`;

export const applyCardToOrderMutation = `mutation ($input: ApplyCardToOrderInput!) {
    applyCardToOrder (input: $input) {
      order {
        id
        status
        cardId
        cardLastFour
        note
        orderItems {
          id
          createdAt
          updatedAt
          quantity
          title
          price {
            amount
            currency {
              abbreviation
              symbol
            }
          }
        }
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
          deliveryFee {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          couponAmount {
            amount
            currency {
              abbreviation
              symbol
            }
          }
          subscriptionAmount {
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
      }
    }
  }`;
