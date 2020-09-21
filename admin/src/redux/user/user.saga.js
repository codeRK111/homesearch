import { takeLatest, put, call, all } from 'redux-saga/effects';
import { UserActionTypes as types } from './user.types';
import axios from 'axios';
import {
	signInSuccess,
	toggleUserLoading,
	logout,
	toggleFetchAdminInfo,
	setFetchAdminError,
} from './user.actions';

function* signUp({ payload: { username, password, showSnackbar, otp } }) {
	try {
		yield put(toggleUserLoading());
		let data = JSON.stringify({
			username,
			password,
			otp,
		});

		const url = `/api/v1/admins/login`;
		console.log(url);
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleUserLoading());
			showSnackbar(responseData.message);
		} else {
			yield put(toggleUserLoading());
			localStorage.setItem('JWT', responseData.token);
			yield put(
				signInSuccess({
					token: responseData.token,
					user: responseData.data.user,
				})
			);
		}
	} catch (error) {
		yield put(toggleUserLoading());
		const errorResponse = error.response.data;

		showSnackbar(errorResponse.message);
	}
	// console.log({ email, password });
}

function* getAdminInfoStart() {
	try {
		yield put(toggleFetchAdminInfo(true));

		const url = `/api/v1/admins/getAdminInfo`;
		console.log(url);
		const jwt = localStorage.getItem('JWT');
		const response = yield axios({
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			url,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleFetchAdminInfo(false));
			console.log(responseData.message);
		} else {
			yield put(toggleFetchAdminInfo(false));
			yield put(
				signInSuccess({
					token: jwt,
					user: responseData.data.admin,
				})
			);
			yield put(
				setFetchAdminError({
					status: null,
					message: null,
				})
			);
		}
	} catch (error) {
		yield put(toggleFetchAdminInfo());
		const errorResponse = error.response.data.message;
		console.log(error.response);
		yield put(
			setFetchAdminError({
				status: error.response.status,
				message: errorResponse,
			})
		);
		console.log(errorResponse);
	}
	// console.log({ email, password });
}

function* logOutSaga() {
	yield put(logout());
}

export function* onSignInStart() {
	yield takeLatest(types.SIGN_IN_START, signUp);
}

export function* onLogOut() {
	localStorage.removeItem('JWT');
	yield takeLatest(types.LOG_OUT, logOutSaga);
}

export function* onAdminGetInfo() {
	yield takeLatest(types.FETCH_ADMIN_INFO_START, getAdminInfoStart);
}

export function* userSagas() {
	yield all([call(onSignInStart), call(onAdminGetInfo)]);
}
