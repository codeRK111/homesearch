import { propertyActionTypes } from './property.types';

// Fetch
export const searchProperties = (payload) => ({
	type: propertyActionTypes.SEARCH_PROPERTY_START,
	payload,
});
export const postProperty = (payload) => ({
	type: propertyActionTypes.POST_PROPERTY_START,
	payload,
});
export const getPropertyDetails = (payload) => ({
	type: propertyActionTypes.GET_PROPERTY_DETAILS_START,
	payload,
});
export const getPropertyResources = (payload) => ({
	type: propertyActionTypes.GET_PROPERTY_RESOURCES_START,
	payload,
});
export const getMyProperties = (payload) => ({
	type: propertyActionTypes.GET_MY_PROPERTIES_START,
	payload,
});

// Set
export const setPropertyResources = (payload) => ({
	type: propertyActionTypes.SET_PROPERTY_RESOURCES,
	payload,
});
// Toggle
export const searchPropertiesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_SEARCH_PROPERTY_LOADING,
	payload,
});

export const getPropertyDetailsLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROPERTY_DETAILS_LOADING,
	payload,
});
export const getPropertyResourcesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROPERTY_RESOURCES_LOADING,
	payload,
});

export const postPropertyLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_POST_PROPERTY_LOADING,
	payload,
});
export const getMyPropertiesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_MY_PROPERTIES_LOADING,
	payload,
});
