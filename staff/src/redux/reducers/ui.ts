import { SnackbarState } from './../../model/ui';
import { UIAction } from '../action/ui';
import { UIActionType } from '../actionTypes/ui';

export interface UIState {
	snackbar: SnackbarState;
}

const initialState: UIState = {
	snackbar: {
		open: false,
		message: '',
		severity: 'success',
	},
};

export const uiReducer = (
	state: UIState = initialState,
	action: UIAction
): UIState => {
	switch (action.type) {
		case UIActionType.SET_SNACKBAR:
			return { ...state, snackbar: action.payload };

		default:
			return state;
	}
};
