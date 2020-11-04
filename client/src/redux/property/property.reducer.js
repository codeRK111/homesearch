import { propertyActionTypes } from './property.types';

const initialState = {
	// Initial Values
	// Loading States
	searchPropertyLoading: false,
	// Errors
};

const propertyReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case propertyActionTypes.TOGGLE_SEARCH_PROPERTY_LOADING:
			return {
				...state,
				searchPropertyLoading: payload,
			};

		default:
			return state;
	}
};

export default propertyReducer;
