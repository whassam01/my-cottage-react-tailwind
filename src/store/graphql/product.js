export const businessProductsQuery = `query ($input: ByIdInput!) {
    business(input: $input) {
      products {
        edges {
          node {
            id
            title
            description
            images
            categories
            ingredients {
              name
              value
              unit
            }
            nutrition {
              calorie
              carbohydrate
              protein
              fat
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
      }
    }
  }`;
