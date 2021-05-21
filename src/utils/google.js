export const initializeGooglePlacesAutoComplete = (documentElement, callback) => {
  // Declare Options For Autocomplete
  const options = {
    types: ["address"],
  }; // To disable any eslint 'google not defined' errors

  // Initialize Google Autocomplete
  /*global google*/ const autocomplete = new google.maps.places.Autocomplete(
    documentElement,
    options
  );

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components and formatted
  // address.
  autocomplete.setFields(["address_components", "formatted_address"]);

  // Fire Event when a suggested name is selected
  autocomplete.addListener("place_changed", callback);

  return autocomplete;
};

export const parseAutocompletedAddress = (autocompletedAddress) => {
  // Extract City From Address Object
  const address = autocompletedAddress.address_components;

  // Check if address is valid
  if (address) {
    const postalCode = address.find((a) => a.types.includes("postal_code"));
    const country = address.find((a) => a.types.includes("country"));
    const state = address.find((a) => a.types.includes("administrative_area_level_1"));
    const city = address.find((a) => a.types.includes("locality"));

    let streetNumber = address.find((a) => a.types.includes("street_number"));
    let route = address.find((a) => a.types.includes("route"));

    let street = null;
    if (streetNumber && route) {
      street = `${streetNumber.short_name} ${route.long_name}`;
    } else if (route) {
      street = route.long_name;
    }

    return {
      street,
      city: city ? city.short_name : null,
      postalCode: postalCode ? postalCode.long_name : null,
      stateOrProvince: state ? state.short_name : null,
      country: country ? country.short_name : null,
    };
  } else {
    return null;
  }
};
