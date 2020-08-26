import { CityActionTypes } from './city.types';

export const fetchAllStatesStart = () => ({
	type: CityActionTypes.FETCH_ALL_STATES_START,
});

export const setAllStates = (states) => ({
	type: CityActionTypes.SET_ALL_STATES,
	payload: states,
});
// export const setSelectedUser = (user) => ({
// 	type: CityActionTypes.SET_SELECTED_USER,
// 	payload: user,
// });
// export const updateUser = (user) => ({
// 	type: CityActionTypes.UPDATE_USER,
// 	payload: user,
// });
// export const removeUser = (payload) => ({
// 	type: CityActionTypes.REMOVE_USER,
// 	payload: payload,
// });
export const setError = (error) => ({
	type: CityActionTypes.SET_ERROR,
	payload: error,
});

export const toggleLoading = () => ({
	type: CityActionTypes.TOGGLE_LOADING,
});

export const cityLoading = (status) => ({
	type: CityActionTypes.CITY_LOADING,
	payload: status,
});

export const addCity = (city) => ({
	type: CityActionTypes.ADD_CITY,
	payload: city,
});

export const locationLoading = (status) => ({
	type: CityActionTypes.LOCATION_LOADING,
	payload: status,
});

export const addLocation = (location) => ({
	type: CityActionTypes.ADD_LOCATION,
	payload: location,
});

export const fetchCitiesLoading = (status) => ({
	type: CityActionTypes.FETCH_CITIES_LOADING,
	payload: status,
});

export const fetchCitiesStart = (callback) => ({
	type: CityActionTypes.FETCH_CITIES,
	payload: callback,
});

export const fetchLocationLoading = (status) => ({
	type: CityActionTypes.FETCH_LOCATIOS_LOADING,
	payload: status,
});

export const fetchLocationssStart = (callback) => ({
	type: CityActionTypes.FETCH_LOCATIOS,
	payload: callback,
});

export const updateCityStart = (city) => ({
	type: CityActionTypes.UPDATE_CITY,
	payload: city,
});
export const updateCityLoading = (status) => ({
	type: CityActionTypes.UPDATE_CITY_LOADING,
	payload: status,
});

export const fetchCityDetailsStart = (callback) => ({
	type: CityActionTypes.FETCH_CITY_DETAILS_START,
	payload: callback,
});
export const fetchCityDetailsLoading = (status) => ({
	type: CityActionTypes.FETCH_CITY_DETAILS_LOADING,
	payload: status,
});

export const fetchCityDependenciesStart = (callback) => ({
	type: CityActionTypes.CHECK_CITY_DEPENDENCIES_START,
	payload: callback,
});
export const fetchCityDependenciesLoading = (status) => ({
	type: CityActionTypes.CHECK_CITY_DEPENDENCIES_LOADING,
	payload: status,
});

export const deleteCityStart = (callback) => ({
	type: CityActionTypes.DELETE_CITY_START,
	payload: callback,
});
export const deleteCityLoading = (status) => ({
	type: CityActionTypes.DELETE_CITY_LOADING,
	payload: status,
});
