import { authActionTypes } from './auth.types';

const initialState = {
	// Initial Values
	// Loading States
	signUpLoading: false,
	sendOtpLoading: false,
	validateOtpLoading: false,
	signInLoading: false,
	// Errors
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
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
		default:
			return state;
	}
};

export default authReducer;
