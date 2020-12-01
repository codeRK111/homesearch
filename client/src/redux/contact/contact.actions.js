import { contactActionTypes } from './contact.types';

// Fetch
export const addContact = (payload) => ({
	type: contactActionTypes.ADD_CONTACT_START,
	payload,
});
export const validateContactNumber = (payload) => ({
	type: contactActionTypes.VALIDATE_CONTACT_NUMBER_START,
	payload,
});
// Set

// Toggle
export const addContactLoading = (payload) => ({
	type: contactActionTypes.TOGGLE_ADD_CONTACT_LOADING,
	payload,
});
export const validateContactNumberLoading = (payload) => ({
	type: contactActionTypes.TOGGLE_VALIDATE_CONTACT_NUMBER_LOADING,
	payload,
});
