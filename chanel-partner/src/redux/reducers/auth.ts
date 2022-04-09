import { ChanelPartner } from '../../models/chanel-partner';
import { AuthActionType } from '../action-types/auth';
import { AuthAction } from '../actions/auth';

interface AuthState {
	user: ChanelPartner | null;
	loading: boolean;
	error: string;
}

const initialState = {
	loading: false,
	user: null,
	error: '',
};

export const authReducer = (
	state: AuthState = initialState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case AuthActionType.SIGN_IN_START:
			return { loading: true, error: '', user: null };
		case AuthActionType.SIGN_IN_SUCCESS:
			return { ...state, user: action.payload };
		case AuthActionType.SET_USER:
			return { loading: false, error: '', user: action.payload };
		case AuthActionType.SIGN_IN_ERROR:
			return { loading: false, error: action.payload, user: null };
		case AuthActionType.LOG_OUT:
			return { loading: false, error: '', user: null };

		default:
			return state;
	}
};
