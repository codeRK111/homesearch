import { takeLatest, put, call, all } from 'redux-saga/effects';
import { UserActionTypes as types } from './user.types';
import axios from 'axios';
import { signInSuccess, toggleUserLoading, logout } from './user.actions';

function* signUp({ payload: { email, password, showSnackbar } }) {
	try {
		yield put(toggleUserLoading());
		let data = JSON.stringify({
			email,
			password,
		});

		const url = `${process.env.REACT_APP_BASE_URL}/users/admin/login`;
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
			yield put(
				signInSuccess({
					token: responseData.token,
					user: responseData.data.user,
				})
			);
			localStorage.setItem('JWT', responseData.token);
		}
	} catch (error) {
		yield put(toggleUserLoading());
		const errorResponse = error.response.data;

		showSnackbar(errorResponse.message);
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
	localStorage.removeItem('GR_USER_ID');
	yield takeLatest(types.LOG_OUT, logOutSaga);
}

export function* userSagas() {
	yield all([call(onSignInStart)]);
}
