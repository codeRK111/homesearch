import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	setProfilePicture,
	setSignInError,
	setUser,
	toggleChangePasswordLoading,
	toggleChangeUserProfileInfoLoading,
	toggleChangeUserProfilePictureLoading,
	toggleResetMyPasswordLoading,
	toggleSendResetPasswordOtpLoading,
	toggleSignInLoading,
	toggleSignUpLoading,
	toggleUserProfileLoading,
	toggleValidateOtpLoading,
	togglesendOtpLoading,
} from './auth.actions';

import axios from 'axios';
import { authActionTypes as types } from './auth.types';

function* signUpSaga({ payload: { user, callback } }) {
	yield put(toggleSignUpLoading(true));
	const url = '/api/v1/users/signup';
	const data = JSON.stringify(user);
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(toggleSignUpLoading(false));
		callback('success', responseData);
	} catch (error) {
		yield put(toggleSignUpLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* sendOtpSaga({ payload: { number, callback } }) {
	yield put(togglesendOtpLoading(true));
	const url = `/api/v1/users/sendOtp/${number}`;
	try {
		const response = yield axios.get(url);
		const responseData = response.data;
		yield put(togglesendOtpLoading(false));
		callback('success', responseData);
	} catch (error) {
		yield put(togglesendOtpLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* sendResetPasswordOtp({ payload: { body, callback } }) {
	yield put(toggleSendResetPasswordOtpLoading(true));
	const url = `/api/v1/users/send-reset-password-otp`;
	const data = JSON.stringify(body);
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(toggleSendResetPasswordOtpLoading(false));
		callback('success', responseData);
	} catch (error) {
		yield put(toggleSendResetPasswordOtpLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}
function* resetMyPassword({ payload: { body, callback } }) {
	yield put(toggleResetMyPasswordLoading(true));
	const url = `/api/v1/users/reset-my-password`;
	const data = JSON.stringify(body);
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(toggleResetMyPasswordLoading(false));
		callback('success', responseData);
	} catch (error) {
		yield put(toggleResetMyPasswordLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* validateOtpSaga({ payload: { number, callback, otp } }) {
	yield put(toggleValidateOtpLoading(true));
	const url = `/api/v1/users/validateOtpAndLogIn/number/${number}/otp/${otp}`;
	try {
		const response = yield axios.get(url);
		const responseData = response.data;
		yield put(toggleValidateOtpLoading(false));
		localStorage.setItem('JWT_CLIENT', responseData.token);
		yield put(
			setUser({ token: responseData.token, user: responseData.data.user })
		);
		callback('success', responseData);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(toggleValidateOtpLoading(false));
		yield put(setSignInError(errorResponse.message));
		callback('fail', errorResponse.message);
	}
}

function* signInSaga({ payload: { user, callback } }) {
	yield put(toggleSignInLoading(true));
	const url = '/api/v1/users/login';
	const data = JSON.stringify(user);
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(toggleSignInLoading(false));
		localStorage.setItem('JWT_CLIENT', responseData.token);
		yield put(
			setUser({ token: responseData.token, user: responseData.data.user })
		);
		callback('success', responseData);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(toggleSignInLoading(false));
		yield put(setSignInError(errorResponse.message));
		callback('fail', errorResponse.message);
	}
}

function* fetchProfileSaga({ payload: { token, callback } }) {
	yield put(toggleUserProfileLoading(true));
	const url = '/api/v1/users';
	try {
		const response = yield axios({
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
		});
		const responseData = response.data;
		yield put(toggleUserProfileLoading(false));
		yield put(setUser({ token, user: responseData.data.user }));
		callback('success', responseData);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(toggleUserProfileLoading(false));
		yield put(setSignInError(errorResponse.message));
		callback('fail', errorResponse.message);
	}
}

function* changeProfilePictureSaga({ payload: { image, callback } }) {
	const token = localStorage.getItem('JWT_CLIENT');
	yield put(toggleChangeUserProfilePictureLoading(true));
	const formData = new FormData();
	formData.append('image', image);
	const url = '/api/v1/users/handle-profile-image';
	try {
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: formData,
		});
		const responseData = response.data;
		yield put(toggleChangeUserProfilePictureLoading(false));
		yield put(setProfilePicture(responseData.data));
		callback('success', responseData);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(toggleChangeUserProfilePictureLoading(false));
		callback('fail', errorResponse.message);
	}
}

function* changeProfileInfoSaga({ payload: { data, callback } }) {
	const token = localStorage.getItem('JWT_CLIENT');
	yield put(toggleChangeUserProfileInfoLoading(true));

	const url = '/api/v1/users';
	try {
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: JSON.stringify(data),
		});
		const responseData = response.data;
		yield put(toggleChangeUserProfileInfoLoading(false));
		yield put(setUser({ token, user: responseData.data.user }));
		callback('success', responseData);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(toggleChangeUserProfileInfoLoading(false));
		callback('fail', errorResponse.message);
	}
}

function* changePasswordSaga({ payload: { data, callback } }) {
	const token = localStorage.getItem('JWT_CLIENT');
	yield put(toggleChangePasswordLoading(true));

	const url = '/api/v1/users/reset-my-password';
	try {
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: JSON.stringify(data),
		});
		const responseData = response.data;
		yield put(toggleChangePasswordLoading(false));
		yield put(
			setUser({ token: responseData.token, user: responseData.data.user })
		);
		callback('success', responseData);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(toggleChangePasswordLoading(false));
		callback('fail', errorResponse.message);
	}
}

function* onSignUp() {
	yield takeLatest(types.SIGN_UP_START, signUpSaga);
}

function* onSendOtp() {
	yield takeLatest(types.SEND_OTP_START, sendOtpSaga);
}

function* onResetMyPassword() {
	yield takeLatest(types.RESET_MY_PASSWORD_START, resetMyPassword);
}

function* onSendResetPasswordOtp() {
	yield takeLatest(types.SEND_RESET_PASSWORD_OTP_START, sendResetPasswordOtp);
}

function* onvalidateOtp() {
	yield takeLatest(types.VALIDATE_OTP_START, validateOtpSaga);
}

function* onvSignIn() {
	yield takeLatest(types.SIGN_IN_START, signInSaga);
}

function* onFetchProfile() {
	yield takeLatest(types.FETCH_USER_PROFILE, fetchProfileSaga);
}

function* onChangeProfilePicture() {
	yield takeLatest(types.CHANGE_PROFILE_PICTURE, changeProfilePictureSaga);
}
function* onChangeProfileInfo() {
	yield takeLatest(types.CHANGE_PROFILE_INFO, changeProfileInfoSaga);
}

function* onChangePassword() {
	yield takeLatest(types.CHANGE_PASSWORD, changePasswordSaga);
}

export function* authSagas() {
	yield all([
		call(onSignUp),
		call(onResetMyPassword),
		call(onSendOtp),
		call(onSendResetPasswordOtp),
		call(onvalidateOtp),
		call(onvSignIn),
		call(onFetchProfile),
		call(onChangeProfilePicture),
		call(onChangeProfileInfo),
		call(onChangePassword),
	]);
}
