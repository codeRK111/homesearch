import { uiActionTypes } from './ui.types';

// Fetch
export const toggleLoginPopup = (payload) => ({
	type: uiActionTypes.TOGGLE_LOGIN_POPUP,
	payload,
});
export const setSnackbar = (payload) => ({
	type: uiActionTypes.SET_SNACKBAR,
	payload,
});
