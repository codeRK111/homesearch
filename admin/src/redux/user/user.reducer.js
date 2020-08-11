import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	token: null,
	error: null,
	loading: false,
	authenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				authenticated: true,
				error: null,
				currentUser: action.payload.user,
				token: action.payload.token,
			};
		case UserActionTypes.LOG_OUT:
			return {
				...state,
				authenticated: false,
				error: null,
				currentUser: null,
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null,
			};
		case UserActionTypes.SIGN_IN_FAIL:
		case UserActionTypes.SIGN_OUT_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case UserActionTypes.TOGGLE_USER_LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		default:
			return state;
	}
};

export default userReducer;
