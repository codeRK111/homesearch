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
export const signIn = (payload) => ({
	type: authActionTypes.SIGN_IN_START,
	payload,
});
export const fetchUserProfile = (payload) => ({
	type: authActionTypes.FETCH_USER_PROFILE,
	payload,
});
// Set
export const setUser = (payload) => ({
	type: authActionTypes.SET_USER,
	payload,
});
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
export const toggleSignInLoading = (payload) => ({
	type: authActionTypes.TOGGLE_SIGN_IN_LOADING,
	payload,
});
export const toggleUserProfileLoading = (payload) => ({
	type: authActionTypes.TOGGLE_USER_PROFILE_LOADING,
	payload,
});

// Errors
export const setSignInError = (payload) => ({
	type: authActionTypes.SIGNIN_ERROR,
	payload,
});
