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
