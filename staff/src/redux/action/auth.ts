import { AuthActionType } from '../actionTypes/auth';
import { IStaff } from '../../model/staff.interface';

interface SignInStart {
	type: AuthActionType.SIGN_IN_START;
}
interface SetUser {
	type: AuthActionType.SET_USER;
	payload: IStaff;
}
interface LogOut {
	type: AuthActionType.LOG_OUT;
}

interface SignInSuccess {
	type: AuthActionType.SIGN_IN_SUCCESS;
	payload: IStaff;
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
