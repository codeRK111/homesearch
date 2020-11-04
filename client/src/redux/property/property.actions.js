import { propertyActionTypes } from './property.types';

// Fetch
export const searchProperties = (payload) => ({
	type: propertyActionTypes.SEARCH_PROPERTY_START,
	payload,
});

// Set
// Toggle
export const searchPropertiesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_SEARCH_PROPERTY_LOADING,
	payload,
});
