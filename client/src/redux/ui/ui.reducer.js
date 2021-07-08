import { uiActionTypes } from './ui.types';

const initialState = {
	// Initial Values
	// Loading States
	loginPopup: false,
	authOption: 'login',
	snackbar: {
		open: false,
		message: 'Posted Successfully',
		severity: 'success',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'right',
		},
	},
	// Errors
};

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case uiActionTypes.TOGGLE_LOGIN_POPUP:
			return {
				...state,
				loginPopup: payload,
			};
		case uiActionTypes.SET_AUTH_OPTION:
			return {
				...state,
				authOption: payload,
			};
		case uiActionTypes.SET_SNACKBAR:
			return {
				...state,
				snackbar: {
					...state.snackbar,
					...payload,
				},
			};

		default:
			return state;
	}
};

export default uiReducer;
