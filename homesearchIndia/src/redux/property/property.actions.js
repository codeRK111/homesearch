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
export const updateProperty = (payload) => ({
	type: propertyActionTypes.UPDATE_PROPERTY_START,
	payload,
});
export const getPropertyDetails = (payload) => ({
	type: propertyActionTypes.GET_PROPERTY_DETAILS_START,
	payload,
});
export const getProjectDetails = (payload) => ({
	type: propertyActionTypes.GET_PROJECT_DETAILS_START,
	payload,
});
export const getProjectPropertyDetails = (payload) => ({
	type: propertyActionTypes.GET_PROJECT_PROPERTY_DETAILS_START,
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
export const queryOnProperty = (payload) => ({
	type: propertyActionTypes.QUERY_ON_PROPERTY_START,
	payload,
});
export const getQueries = (payload) => ({
	type: propertyActionTypes.GET_QUERIES,
	payload,
});
export const getPropertyCount = (payload) => ({
	type: propertyActionTypes.GET_PROPERTY_COUNT_START,
	payload,
});

// Set
export const setPropertyResources = (payload) => ({
	type: propertyActionTypes.SET_PROPERTY_RESOURCES,
	payload,
});
export const setMyQueries = (payload) => ({
	type: propertyActionTypes.SET_MY_QUERIES,
	payload,
});
export const setQueriesReceived = (payload) => ({
	type: propertyActionTypes.SET_QUERIES_RECEIVED,
	payload,
});
export const setPropertyCount = (payload) => ({
	type: propertyActionTypes.SET_PROPERTIES_COUNT,
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
export const getProjectDetailsLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROJECT_DETAILS_LOADING,
	payload,
});
export const getProjectPropertyDetailsLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROJECT_PROPERTY_DETAILS_LOADING,
	payload,
});
export const getPropertyResourcesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROPERTY_RESOURCES_LOADING,
	payload,
});
export const getPropertyCountLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_PROPERTY_COUNT_LOADING,
	payload,
});

export const postPropertyLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_POST_PROPERTY_LOADING,
	payload,
});
export const updatePropertyLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_UPDATE_PROPERTY_LOADING,
	payload,
});
export const getMyPropertiesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_MY_PROPERTIES_LOADING,
	payload,
});
export const queryOnPropertyLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_QUERY_ON_PROPERTY_LOADING,
	payload,
});
export const getQueriesLoading = (payload) => ({
	type: propertyActionTypes.TOGGLE_GET_QUERIES_LOADING,
	payload,
});
