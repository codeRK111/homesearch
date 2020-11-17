import { propertyActionTypes } from './property.types';

const initialState = {
	// Initial Values
	// Loading States
	searchPropertyLoading: false,
	getPropertyDetailsLoading: false,
	getPropertyResourcesLoading: false,
	postPropertyLoading: false,
	furnishes: [],
	amenities: [],
	// Errors
};

const propertyReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case propertyActionTypes.TOGGLE_SEARCH_PROPERTY_LOADING:
			return {
				...state,
				searchPropertyLoading: payload,
			};
		case propertyActionTypes.TOGGLE_GET_PROPERTY_DETAILS_LOADING:
			return {
				...state,
				getPropertyDetailsLoading: payload,
			};
		case propertyActionTypes.TOGGLE_GET_PROPERTY_RESOURCES_LOADING:
			return {
				...state,
				getPropertyResourcesLoading: payload,
			};
		case propertyActionTypes.TOGGLE_POST_PROPERTY_LOADING:
			return {
				...state,
				postPropertyLoading: payload,
			};
		case propertyActionTypes.SET_PROPERTY_RESOURCES:
			return {
				...state,
				furnishes: payload.furnishes,
				amenities: payload.amenities,
			};

		default:
			return state;
	}
};

export default propertyReducer;
