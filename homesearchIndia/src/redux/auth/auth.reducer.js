import { authActionTypes } from './auth.types';

const defaultUser = {
	email: '',
	name: '',
	id: '',
	number: '',
	numberVerified: false,
	city: {
		name: '',
		id: '',
	},
};
const initialState = {
	// Initial Values
	authenticated: false,
	token: null,
	user: defaultUser,
	// Loading States
	signUpLoading: false,
	sendOtpLoading: false,
	validateOtpLoading: false,
	resetMyPasswordLoading: false,
	signInLoading: false,
	userProfileLoading: false,
	changeProfilePictureLoading: false,
	changeProfileInfoLoading: false,
	changePasswordLoading: false,
	sendResetPasswordOtpLoading: false,
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
				user: { ...state.user, ...payload.user },
				signInError: null,
			};
		case authActionTypes.SIGN_OUT:
			return {
				...state,
				authenticated: false,
				token: null,
				user: defaultUser,
				signInError: null,
			};
		case authActionTypes.SET_PROFILE_PICTURE:
			return {
				...state,

				user: {
					...state.user,
					photo: payload.name,
				},
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
		case authActionTypes.TOGGLE_RESET_MY_PASSWORD_LOADING:
			return {
				...state,
				resetMyPasswordLoading: payload,
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
		case authActionTypes.TOGGLE_CHANGE_PROFILE_PICTURE_LOADING:
			return {
				...state,
				changeProfilePictureLoading: payload,
			};
		case authActionTypes.TOGGLE_SEND_RESET_PASSWORD_OTP_LOADING:
			return {
				...state,
				sendResetPasswordOtpLoading: payload,
			};
		case authActionTypes.TOGGLE_CHANGE_PROFILE_INFO_LOADING:
			return {
				...state,
				changeProfileInfoLoading: payload,
			};
		case authActionTypes.TOGGLE_CHANGE_PASSWORD_LOADING:
			return {
				...state,
				changePasswordLoading: payload,
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
