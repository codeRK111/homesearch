import { SnackbarState } from './../../model/ui';
import { UIActionType } from '../actionTypes/ui';

interface SetSnackbar {
	type: UIActionType.SET_SNACKBAR;
	payload: SnackbarState;
}

export type UIAction = SetSnackbar;
