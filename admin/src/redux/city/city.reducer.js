import { CityActionTypes } from './city.types';

const INITIAL_STATE = {
	cities: [],
	states: [],
	loading: false,
	error: null,
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CityActionTypes.SET_ALL_STATES:
			return {
				...state,
				error: null,
				states: action.payload,
			};
		case CityActionTypes.SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CityActionTypes.TOGGLE_LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		default:
			return state;
	}
};

export default cityReducer;
