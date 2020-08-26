import { CityActionTypes } from './city.types';

const INITIAL_STATE = {
	cities: [],
	states: [],
	loading: false,
	error: null,
	cityLoading: false,
	locationLoading: false,
	fetchLocationLoading: false,
	updateCityLoading: false,
	fetchCityDetailsLoading: false,
	cityDependenciesLoading: false,
	deleteCityLoading: false,
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
		case CityActionTypes.CITY_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case CityActionTypes.LOCATION_LOADING:
			return {
				...state,
				locationLoading: action.payload,
			};
		case CityActionTypes.FETCH_CITIES_LOADING:
			return {
				...state,
				cityLoading: action.payload,
			};
		case CityActionTypes.FETCH_LOCATIOS_LOADING:
			return {
				...state,
				fetchLocationLoading: action.payload,
			};
		case CityActionTypes.UPDATE_CITY_LOADING:
			return {
				...state,
				updateCityLoading: action.payload,
			};
		case CityActionTypes.FETCH_CITY_DETAILS_LOADING:
			return {
				...state,
				fetchCityDetailsLoading: action.payload,
			};
		case CityActionTypes.CHECK_CITY_DEPENDENCIES_LOADING:
			return {
				...state,
				cityDependenciesLoading: action.payload,
			};
		case CityActionTypes.DELETE_CITY_LOADING:
			return {
				...state,
				deleteCityLoading: action.payload,
			};

		default:
			return state;
	}
};

export default cityReducer;
