import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});

export const signInStart = (user) => ({
	type: UserActionTypes.SIGN_IN_START,
	payload: user,
});

export const signInSuccess = (user) => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailed = (error) => ({
	type: UserActionTypes.SIGN_IN_FAIL,
	payload: error,
});

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailed = (error) => ({
	type: UserActionTypes.SIGN_OUT_FAIL,
	payload: error,
});
export const toggleUserLoading = () => ({
	type: UserActionTypes.TOGGLE_USER_LOADING,
});

export const logout = () => ({
	type: UserActionTypes.LOG_OUT,
});

export const getAdminInfo = () => ({
	type: UserActionTypes.FETCH_ADMIN_INFO_START,
});
export const toggleFetchAdminInfo = (status) => ({
	type: UserActionTypes.TOGGLE_FETCH_ADMIN_INFO_LOADING,
	payload: status,
});
export const setFetchAdminError = (message) => ({
	type: UserActionTypes.SET_FETCH_ADMIN_ERROR,
	payload: message,
});
