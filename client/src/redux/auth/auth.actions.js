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
export const changeProfilePicture = (payload) => ({
	type: authActionTypes.CHANGE_PROFILE_PICTURE,
	payload,
});
export const changeProfileInfo = (payload) => ({
	type: authActionTypes.CHANGE_PROFILE_INFO,
	payload,
});
export const changePassword = (payload) => ({
	type: authActionTypes.CHANGE_PASSWORD,
	payload,
});
// Set
export const setUser = (payload) => ({
	type: authActionTypes.SET_USER,
	payload,
});
export const setProfilePicture = (payload) => ({
	type: authActionTypes.SET_PROFILE_PICTURE,
	payload,
});
export const signOut = () => {
	localStorage.removeItem('JWT_CLIENT');
	return {
		type: authActionTypes.SIGN_OUT,
	};
};
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
export const toggleChangeUserProfilePictureLoading = (payload) => ({
	type: authActionTypes.TOGGLE_CHANGE_PROFILE_PICTURE_LOADING,
	payload,
});
export const toggleChangeUserProfileInfoLoading = (payload) => ({
	type: authActionTypes.TOGGLE_CHANGE_PROFILE_INFO_LOADING,
	payload,
});
export const toggleChangePasswordLoading = (payload) => ({
	type: authActionTypes.TOGGLE_CHANGE_PASSWORD_LOADING,
	payload,
});

// Errors
export const setSignInError = (payload) => ({
	type: authActionTypes.SIGNIN_ERROR,
	payload,
});
