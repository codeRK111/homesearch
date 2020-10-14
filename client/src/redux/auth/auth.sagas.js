import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import { authActionTypes as types } from './auth.types';
import {
	toggleSignUpLoading,
	togglesendOtpLoading,
	toggleValidateOtpLoading,
	toggleSignInLoading,
	toggleUserProfileLoading,
	setUser,
	setSignInError,
} from './auth.actions';

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
	const url = '/api/v1/users/getMyInfo';
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

function* onSignUp() {
	yield takeLatest(types.SIGN_UP_START, signUpSaga);
}

function* onSendOtp() {
	yield takeLatest(types.SEND_OTP_START, sendOtpSaga);
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

export function* authSagas() {
	yield all([
		call(onSignUp),
		call(onSendOtp),
		call(onvalidateOtp),
		call(onvSignIn),
		call(onFetchProfile),
	]);
}
