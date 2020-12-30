import { CityActionTypes } from './city.types';

const INITIAL_STATE = {
	cities: [],
	states: [],
	loading: false,
	error: null,
	searchCityLoading: false,
	cityLoading: false,
	locationLoading: false,
	fetchLocationLoading: false,
	updateCityLoading: false,
	updateLocationLoading: false,
	fetchCityDetailsLoading: false,
	fetchLocationDetailsLoading: false,
	cityDependenciesLoading: false,
	deleteCityLoading: false,
	locationDependenciesLoading: false,
	deleteLocationLoading: false,
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CityActionTypes.SEARCH_CITY_LOADING:
			return {
				...state,
				searchCityLoading: action.payload,
			};
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
		case CityActionTypes.TOGGLE_STATE_LOADING:
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
		case CityActionTypes.UPDATE_LOCATION_LOADING:
			return {
				...state,
				updateLocationLoading: action.payload,
			};
		case CityActionTypes.FETCH_CITY_DETAILS_LOADING:
			return {
				...state,
				fetchCityDetailsLoading: action.payload,
			};
		case CityActionTypes.FETCH_LOCATION_DETAILS_LOADING:
			return {
				...state,
				fetchLocationDetailsLoading: action.payload,
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
		case CityActionTypes.CHECK_LOCATION_DEPENDENCIES_LOADING:
			return {
				...state,
				locationDependenciesLoading: action.payload,
			};
		case CityActionTypes.DELETE_LOCATION_LOADING:
			return {
				...state,
				deleteLocationLoading: action.payload,
			};

		default:
			return state;
	}
};

export default cityReducer;
