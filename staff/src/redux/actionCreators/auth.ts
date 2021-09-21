import { AuthAction } from '../action/auth';
import { AuthActionType } from '../actionTypes/auth';
import { Dispatch } from 'redux';
import { IStaff } from '../../model/staff.interface';

export const signInStart = () => (dispatch: Dispatch<AuthAction>) => {
	dispatch({
		type: AuthActionType.SIGN_IN_START,
	});
};

export const signInSuccess =
	(user: IStaff) => (dispatch: Dispatch<AuthAction>) => {
		dispatch({
			type: AuthActionType.SIGN_IN_SUCCESS,
			payload: user,
		});
	};

export const signInError =
	(error: string) => (dispatch: Dispatch<AuthAction>) => {
		dispatch({
			type: AuthActionType.SIGN_IN_ERROR,
			payload: error,
		});
	};

export const logOut = () => (dispatch: Dispatch<AuthAction>) => {
	localStorage.removeItem('JWT_STAFF');
	dispatch({
		type: AuthActionType.LOG_OUT,
	});
};
