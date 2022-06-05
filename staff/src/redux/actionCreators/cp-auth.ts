import { ChanelPartner } from '../../model/cp.interface';
import { CpAuthAction } from '../action/cp-auth';
import { CpAuthActionType } from '../actionTypes/cp-auth';
import { Dispatch } from 'redux';

export const CpsignInStart = () => (dispatch: Dispatch<CpAuthAction>) => {
	dispatch({
		type: CpAuthActionType.CP_SIGN_IN_START,
	});
};

export const CpSignInSuccess =
	(user: ChanelPartner) => (dispatch: Dispatch<CpAuthAction>) => {
		dispatch({
			type: CpAuthActionType.CP_SIGN_IN_SUCCESS,
			payload: user,
		});
	};
export const CpSetUser =
	(user: ChanelPartner) => (dispatch: Dispatch<CpAuthAction>) => {
		dispatch({
			type: CpAuthActionType.CP_SET_USER,
			payload: user,
		});
	};

export const CpSignInError =
	(error: string) => (dispatch: Dispatch<CpAuthAction>) => {
		dispatch({
			type: CpAuthActionType.CP_SIGN_IN_ERROR,
			payload: error,
		});
	};

export const CpLogOut = () => (dispatch: Dispatch<CpAuthAction>) => {
	localStorage.removeItem('JWT_CP');
	dispatch({
		type: CpAuthActionType.CP_LOG_OUT,
	});
};
