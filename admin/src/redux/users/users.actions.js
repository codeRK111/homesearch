import { UserActionTypes } from './users.types';

export const fetchAllUsersSTart = () => ({
	type: UserActionTypes.FETCH_ALL_USERS_START,
});

export const setAllUsers = (users) => ({
	type: UserActionTypes.SET_ALL_USERS,
	payload: users,
});
export const setSelectedUser = (user) => ({
	type: UserActionTypes.SET_SELECTED_USER,
	payload: user,
});
export const addUser = (user) => ({
	type: UserActionTypes.ADD_USER,
	payload: user,
});
export const addUserSuccess = () => ({
	type: UserActionTypes.ADD_USER_SUCCESS,
});
export const addUserFailed = (error) => ({
	type: UserActionTypes.SET_ADD_ERROR,
	payload: error,
});
export const updateUser = (user) => ({
	type: UserActionTypes.UPDATE_USER,
	payload: user,
});
export const removeUser = (payload) => ({
	type: UserActionTypes.REMOVE_USER,
	payload: payload,
});
export const filterUser = (payload) => ({
	type: UserActionTypes.FILTER_USERS,
	payload: payload,
});
export const setError = (error) => ({
	type: UserActionTypes.SET_ERROR,
	payload: error,
});

export const toggleLoading = () => ({
	type: UserActionTypes.TOGGLE_LOADING,
});
export const toggleUserInfo = (status) => ({
	type: UserActionTypes.TOGGLE_USER_STATUS,
	payload: status,
});
export const toggleAddUserLoading = () => ({
	type: UserActionTypes.TOGGLE_ADD_USER_LOADING,
});
