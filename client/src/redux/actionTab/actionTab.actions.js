import { actionTabActionTypes } from './actionTab.types';

// Fetch

// Set
export const setCurrentTab = (payload) => ({
	type: actionTabActionTypes.SET_CURRENT_TAB,
	payload,
});
export const setSelectedCity = (payload) => ({
	type: actionTabActionTypes.SET_SELECTED_CITIES,
	payload,
});
// Toggle
