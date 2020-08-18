import { AdminActionTypes } from './admins.types';

export const fetchAllAdminsStart = () => ({
	type: AdminActionTypes.FETCH_ALL_ADMINS_START,
});

export const setAllAdmins = (admins) => ({
	type: AdminActionTypes.SET_ALL_ADMINS,
	payload: admins,
});
export const setAllAdminsError = (error) => ({
	type: AdminActionTypes.SET_ALL_ADMINS_ERROR,
	payload: error,
});
export const toggleAllAdminsLoading = () => ({
	type: AdminActionTypes.TOGGLE_ALL_ADMINS_LOADING,
});

export const updateAdmin = (admin) => ({
	type: AdminActionTypes.UPDATE_ADMIN,
	payload: admin,
});
export const setUpdateAdminError = (error) => ({
	type: AdminActionTypes.SET_UPDATE_ADMIN_ERROR,
	payload: error,
});
export const toggleUpdateAdminLoading = () => ({
	type: AdminActionTypes.TOGGLE_UPDATE_ADMIN_LOADING,
});

export const addAdmin = (admin) => ({
	type: AdminActionTypes.ADD_ADMIN,
	payload: admin,
});
export const setAddAdminError = (error) => ({
	type: AdminActionTypes.SET_ADD_ADMIN_ERROR,
	payload: error,
});
export const toggleAddAdminLoading = () => ({
	type: AdminActionTypes.TOGGLE_ADD_ADMIN_LOADING,
});
export const toggleAdminInfo = (status) => ({
	type: AdminActionTypes.TOGGLE_ADMIN_STATUS,
	payload: status,
});
export const resetAddAdminError = () => ({
	type: AdminActionTypes.RESET_ADD_ADMIN_ERROR,
});

export const removeAdmin = (id) => ({
	type: AdminActionTypes.REMOVE_ADMIN,
	payload: id,
});
