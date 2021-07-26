import { uiActionTypes } from './ui.types';

const initialState = {
	// Initial Values
	// Loading States

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
