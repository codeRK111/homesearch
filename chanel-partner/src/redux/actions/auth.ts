import { AuthActionType } from '../action-types/auth';
import { ChanelPartner } from '../../models/chanel-partner';

interface SignInStart {
	type: AuthActionType.SIGN_IN_START;
}
interface SetUser {
	type: AuthActionType.SET_USER;
	payload: ChanelPartner;
}
interface LogOut {
	type: AuthActionType.LOG_OUT;
}

interface SignInSuccess {
	type: AuthActionType.SIGN_IN_SUCCESS;
	payload: ChanelPartner;
}

interface SignError {
	type: AuthActionType.SIGN_IN_ERROR;
	payload: string;
}

export type AuthAction =
	| SignInSuccess
	| SignError
	| SignInStart
	| LogOut
	| SetUser;
