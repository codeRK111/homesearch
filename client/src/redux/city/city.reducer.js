import { cityActionTypes } from './city.types';

const initialState = {
	// Initial Values
	// Loading States
	searchCityLoading: false,
	// Errors
};

const cityReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case cityActionTypes.TOGGLE_SEARCH_CITY_LOADING:
			return {
				...state,
				searchCityLoading: payload,
			};
		default:
			return state;
	}
};

export default cityReducer;
