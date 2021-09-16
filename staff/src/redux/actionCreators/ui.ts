import { Dispatch } from 'redux';
import { SnackbarState } from './../../model/ui';
import { UIAction } from '../action/ui';
import { UIActionType } from '../actionTypes/ui';

export const setSnackbar =
	(config: SnackbarState) => (dispatch: Dispatch<UIAction>) => {
		dispatch({
			type: UIActionType.SET_SNACKBAR,
			payload: config,
		});
	};
