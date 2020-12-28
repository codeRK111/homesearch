import { actionTabActionTypes } from './actionTab.types';

// Fetch

// Set
export const setCurrentTab = (payload) => ({
	type: actionTabActionTypes.SET_CURRENT_TAB,
	payload,
});
// Toggle
