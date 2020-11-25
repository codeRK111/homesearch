import { cityActionTypes } from './city.types';

const initialState = {
	// Initial Values
	// Loading States
	searchCityLoading: false,
	searchLocationLoading: false,
	defaultCity: {
		_id: '5f2cf831ab6d0b12da114161',
		name: 'Bhubaneswar',
		state: 'Odisha',
		id: '5f2cf831ab6d0b12da114161',
	},
	// Errors
};

const cityReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case cityActionTypes.TOGGLE_SEARCH_CITY_LOADING:
			return {
				...state,
				searchCityLoading: payload,
			};
		case cityActionTypes.TOGGLE_SEARCH_LOCATION_LOADING:
			return {
				...state,
				searchLocationLoading: payload,
			};
		case cityActionTypes.SET_SELECTED_CITY:
			return {
				...state,
				defaultCity: payload,
			};
		default:
			return state;
	}
};

export default cityReducer;
