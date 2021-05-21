export const createOrderItemMutation = `mutation ($input: CreateOrderItemInput!) {
    createOrderItem (input: $input) {
      orderItem {
        id
        quantity
        offer {
          id
        }
        price {
          amount
          currency {
            abbreviation
            symbol
          }
        }
      }
    }
  }`;

export const updateOrderItemMutation = `mutation ($input: UpdateOrderItemInput!) {
    updateOrderItem (input: $input) {
      orderItem {
        id
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
  }`;

export const deleteOrderItemMutation = `mutation ($input: DeleteOrderItemInput!) {
    deleteOrderItem (input: $input)
  }`;
