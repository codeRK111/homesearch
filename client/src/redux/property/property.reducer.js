import { propertyActionTypes } from './property.types';

const initialState = {
	// Initial Values
	// Loading States
	searchPropertyLoading: false,
	getPropertyDetailsLoading: false,
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

		default:
			return state;
	}
};

export default propertyReducer;
