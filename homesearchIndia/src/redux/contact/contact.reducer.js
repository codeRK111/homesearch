import { contactActionTypes } from './contact.types';

const initialState = {
	// Initial Values
	// Loading States
	addContactLoading: false,
	validateContactNumberLoading: false,

	// Errors
};

const cityReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case contactActionTypes.TOGGLE_ADD_CONTACT_LOADING:
			return {
				...state,
				addContactLoading: payload,
			};
		case contactActionTypes.TOGGLE_VALIDATE_CONTACT_NUMBER_LOADING:
			return {
				...state,
				validateContactNumberLoading: payload,
			};

		default:
			return state;
	}
};

export default cityReducer;
