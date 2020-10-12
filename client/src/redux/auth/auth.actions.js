import { authActionTypes } from './auth.types';

// Fetch
export const signUp = (payload) => ({
	type: authActionTypes.SIGN_UP_START,
	payload,
});
export const sendOtp = (payload) => ({
	type: authActionTypes.SEND_OTP_START,
	payload,
});
export const validateOtp = (payload) => ({
	type: authActionTypes.VALIDATE_OTP_START,
	payload,
});
// Set
// Toggle
export const toggleSignUpLoading = (payload) => ({
	type: authActionTypes.TOGGLE_SIGN_UP_LOADING,
	payload,
});

export const togglesendOtpLoading = (payload) => ({
	type: authActionTypes.TOGGLE_SEND_OTP_LOADING,
	payload,
});
export const toggleValidateOtpLoading = (payload) => ({
	type: authActionTypes.TOGGLE_VALIDATE_OTP_LOADING,
	payload,
});
