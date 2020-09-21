import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	token: null,
	error: null,
	loading: false,
	authenticated: false,
	fetchAdminLoading: false,
	fetchAdminError: {
		status: null,
		message: null,
	},
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
				token: null,
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
		case UserActionTypes.TOGGLE_FETCH_ADMIN_INFO_LOADING:
			return {
				...state,
				fetchAdminLoading: action.payload,
			};
		case UserActionTypes.SET_FETCH_ADMIN_ERROR:
			return {
				...state,
				fetchAdminError: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
