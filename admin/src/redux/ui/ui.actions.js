import { uiActionTypes } from './ui.types';

// Fetch

export const setSnackbar = (payload) => ({
	type: uiActionTypes.SET_SNACKBAR,
	payload,
});
