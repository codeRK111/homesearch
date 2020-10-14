import { authActionTypes } from './auth.types';

const initialState = {
	// Initial Values
	authenticated: false,
	token: null,
	user: {
		email: '',
		name: '',
		id: '',
		number: '',
		numberVerified: false,
	},
	// Loading States
	signUpLoading: false,
	sendOtpLoading: false,
	validateOtpLoading: false,
	signInLoading: false,
	userProfileLoading: false,
	// Errors
	signInError: null,
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		// Set Values
		case authActionTypes.SET_USER:
			return {
				...state,
				authenticated: true,
				token: payload.token,
				user: payload.user,
				signInError: null,
			};
		// Toggle loading
		case authActionTypes.TOGGLE_SIGN_UP_LOADING:
			return {
				...state,
				signUpLoading: payload,
			};
		case authActionTypes.TOGGLE_SEND_OTP_LOADING:
			return {
				...state,
				sendOtpLoading: payload,
			};
		case authActionTypes.TOGGLE_VALIDATE_OTP_LOADING:
			return {
				...state,
				validateOtpLoading: payload,
			};
		case authActionTypes.TOGGLE_SIGN_IN_LOADING:
			return {
				...state,
				signInLoading: payload,
			};
		case authActionTypes.TOGGLE_USER_PROFILE_LOADING:
			return {
				...state,
				userProfileLoading: payload,
			};
		// Set errors
		case authActionTypes.SIGNIN_ERROR:
			return {
				...state,
				signInError: payload,
			};
		default:
			return state;
	}
};

export default authReducer;
