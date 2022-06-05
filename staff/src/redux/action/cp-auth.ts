import { ChanelPartner } from '../../model/cp.interface';
import { CpAuthActionType } from '../actionTypes/cp-auth';

interface CpSignInStart {
	type: CpAuthActionType.CP_SIGN_IN_START;
}
interface CpSetUser {
	type: CpAuthActionType.CP_SET_USER;
	payload: ChanelPartner;
}
interface CpLogOut {
	type: CpAuthActionType.CP_LOG_OUT;
}

interface CpSignInSuccess {
	type: CpAuthActionType.CP_SIGN_IN_SUCCESS;
	payload: ChanelPartner;
}

interface CpSignError {
	type: CpAuthActionType.CP_SIGN_IN_ERROR;
	payload: string;
}

export type CpAuthAction =
	| CpSignInSuccess
	| CpSignError
	| CpSignInStart
	| CpLogOut
	| CpSetUser;
