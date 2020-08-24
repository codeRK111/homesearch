import { PropertyActionTypes } from './property.types';

export const fetchAllPropertyResourcesStart = (callback) => ({
	type: PropertyActionTypes.FETCH_PROPERTIES_RESOURCES_START,
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

export const toggleLoading = (loadingState) => ({
	type: PropertyActionTypes.TOGGLE_LOADING,
	payload: loadingState,
});
