import { ChanelPartner } from '../../model/cp.interface';
import { CpAuthAction } from '../action/cp-auth';
import { CpAuthActionType } from '../actionTypes/cp-auth';

interface CpAuthState {
	cp: ChanelPartner | null;
	cpLoading: boolean;
	cpError: string;
}

const cpInitialState = {
	cpLoading: false,
	cp: null,
	cpError: '',
};

export const cPAuthReducer = (
	state: CpAuthState = cpInitialState,
	action: CpAuthAction
): CpAuthState => {
	switch (action.type) {
		case CpAuthActionType.CP_SIGN_IN_START:
			return { cpLoading: true, cpError: '', cp: null };
		case CpAuthActionType.CP_SIGN_IN_SUCCESS:
			return { ...state, cp: action.payload };
		case CpAuthActionType.CP_SET_USER:
			return { cpLoading: false, cpError: '', cp: action.payload };
		case CpAuthActionType.CP_SIGN_IN_ERROR:
			return { cpLoading: false, cpError: action.payload, cp: null };
		case CpAuthActionType.CP_LOG_OUT:
			return { cpLoading: false, cpError: '', cp: null };

		default:
			return state;
	}
};
