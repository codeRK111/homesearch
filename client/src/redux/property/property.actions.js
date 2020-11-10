import { propertyActionTypes } from './property.types';

// Fetch
export const searchProperties = (payload) => ({
	type: propertyActionTypes.SEARCH_PROPERTY_START,
	payload,
});
export const getPropertyDetails = (payload) => ({
	type: propertyActionTypes.GET_PROPERTY_DETAILS_START,
	payload,
});

// Set
// Toggle
export const searchPropertiesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_SEARCH_PROPERTY_LOADING,
	payload,
});

export const getPropertyDetailsLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROPERTY_DETAILS_LOADING,
	payload,
});
