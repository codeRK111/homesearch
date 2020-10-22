import { cityActionTypes } from './city.types';

// Fetch
export const searchCities = (payload) => ({
	type: cityActionTypes.SEARCH_CITY_START,
	payload,
});
export const searchLocations = (payload) => ({
	type: cityActionTypes.SEARCH_LOCATION_START,
	payload,
});
// Set
// Toggle
export const searchCitiesLoading = (payload) => ({
	type: cityActionTypes.TOGGLE_SEARCH_CITY_LOADING,
	payload,
});
export const searchLocationsLoading = (payload) => ({
	type: cityActionTypes.TOGGLE_SEARCH_LOCATION_LOADING,
	payload,
});
