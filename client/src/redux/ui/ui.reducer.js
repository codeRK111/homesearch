import { uiActionTypes } from './ui.types';

const initialState = {
	// Initial Values
	// Loading States
	loginPopup: false,
	// Errors
};

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case uiActionTypes.TOGGLE_LOGIN_POPUP:
			return {
				...state,
				loginPopup: payload,
			};

		default:
			return state;
	}
};

export default uiReducer;
