export const getBusinessTaxRatesQuery = `query ($input: ByIdInput!) {
    business(input: $input) {
      taxRates {
        percent
      }
    }
  }`;
