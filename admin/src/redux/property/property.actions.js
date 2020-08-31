import { PropertyActionTypes } from './property.types';

export const fetchAllPropertyResourcesStart = (callback) => ({
	type: PropertyActionTypes.FETCH_PROPERTIES_RESOURCES_START,
	payload: callback,
});

export const fetchProperties = (callback) => ({
	type: PropertyActionTypes.FETCH_PROPERTIES_START,
	payload: callback,
});

export const fetchPropertyDetails = (callback) => ({
	type: PropertyActionTypes.FETCH_PROPERTY_DETAILS_START,
	payload: callback,
});

export const addProperty = (property) => ({
	type: PropertyActionTypes.ADD_PROPERTY,
	payload: property,
});

export const setAllFurnishes = (furnishes) => ({
	type: PropertyActionTypes.SET_FURNISHES,
	payload: furnishes,
});

export const setAllAmenities = (amenities) => ({
	type: PropertyActionTypes.SET_AMENITIES,
	payload: amenities,
});

export const setAllProperties = (properties) => ({
	type: PropertyActionTypes.SET_PROPERTIES,
	payload: properties,
});

export const updateProperty = (property) => ({
	type: PropertyActionTypes.UPDATE_PROPERTY_START,
	payload: property,
});

export const toggleLoading = (loadingState) => ({
	type: PropertyActionTypes.TOGGLE_LOADING,
	payload: loadingState,
});

export const fetchPropertyDetailsLoading = (loadingState) => ({
	type: PropertyActionTypes.PROPERTY_DETAILS_LOADING,
	payload: loadingState,
});

export const updatePropertyLoading = (loadingState) => ({
	type: PropertyActionTypes.UPDATE_PROPERTY_LOADING,
	payload: loadingState,
});
