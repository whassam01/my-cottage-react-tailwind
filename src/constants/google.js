import config from "../config";

export const GoogleUrl = {
  PLACES: `https://maps.googleapis.com/maps/api/js?key=${config.google.PLACES_API_KEY}&libraries=places`,
};
