import {
	addUserFailed,
	addUserSuccess,
	fetchAllUsersSTart,
	setAllUsers,
	toggleAddUserLoading,
	toggleLoading,
} from './users.actions';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { UserActionTypes as types } from './users.types';

function* getAllUsers({ payload = null }) {
	try {
		const jwt = localStorage.getItem('JWT');
		yield put(toggleLoading());
		let url = `/api/v1/admin/users?sort=serialNumber&fields=number,googleId,photoStatus,createdAt,status,paymentStatus,numberVerified,name,email,serialNumber,gender,role,mobileStatus,registerThrough,registerVia,photo,createdBy${
			payload && '&role=' + payload
		}`;

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
			yield put(toggleLoading());
			console.log(responseData);
		} else {
			yield put(toggleLoading());
			yield put(setAllUsers(responseData.data.users));
		}
	} catch (error) {
		yield put(toggleLoading());
		const errorResponse = error.response.data;

		console.log(errorResponse.message);
	}
	// console.log({ email, password });
}

function* filterUsers({ payload: { filterObj } }) {
	try {
		yield put(toggleLoading());
		let data = JSON.stringify(filterObj);

		const url = `/api/v1/admin/users/filter-user`;
		console.log(url);
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading());
			console.log(responseData);
		} else {
			yield put(toggleLoading());
			yield put(setAllUsers(responseData.data.users));
		}
	} catch (error) {
		yield put(toggleLoading());
		const errorResponse = error.response.data;

		console.log(errorResponse.message);
	}
}

function* updateUser({ payload: { user, userId, callback } }) {
	try {
		const jwt = localStorage.getItem('JWT');
		yield put(toggleLoading());
		let data = JSON.stringify(user);
		let url = `/api/v1/admin/users/${userId}`;

		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading());
			console.log(responseData);
		} else {
			if (user.image) {
				var formData = new FormData();
				formData.append('image', user.image);
				console.log(responseData);
				const imageResponse = yield axios.patch(
					`/api/v1/users/profile-picture/${responseData.data.user.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				console.log(imageResponse.data);
			}
			callback();
			yield put(toggleLoading());
			yield put(fetchAllUsersSTart());
		}
	} catch (error) {
		yield put(toggleLoading());
		const errorResponse = error.response.data;

		console.log(errorResponse.message);
	}
}

function* toggleStatus({ payload: { user, userId, callback } }) {
	try {
		const jwt = localStorage.getItem('JWT');
		yield put(toggleLoading());
		let data = JSON.stringify(user);
		let url = `/api/v1/admin/users/${userId}`;

		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading());
		} else {
			callback('');
			yield put(toggleLoading());
			yield put(fetchAllUsersSTart());
		}
	} catch (error) {
		yield put(toggleLoading());
		const errorResponse = error.response.data;
		callback(errorResponse.message);
	}
}

function* removeUser({ payload: { userId, callback } }) {
	try {
		yield put(toggleLoading());
		let url = `/api/v1/admin/users/${userId}`;

		const response = yield axios.delete(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading());
			console.log(responseData);
		} else {
			yield put(toggleLoading());
			callback();
			yield put(fetchAllUsersSTart());
		}
	} catch (error) {
		yield put(toggleLoading());
		const errorResponse = error.response.data;

		console.log(errorResponse.message);
	}
}

function* addUser({ payload: { user, callback } }) {
	try {
		const jwt = localStorage.getItem('JWT');
		yield put(toggleAddUserLoading());
		let data = JSON.stringify(user);
		let url = `/api/v1/admin/users`;

		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleAddUserLoading());
			console.log(responseData);
		} else {
			yield put(addUserSuccess());
			if (user.image) {
				var formData = new FormData();
				formData.append('image', user.image);
				console.log(responseData);
				const imageResponse = yield axios.post(
					`/api/v1/users/profile-picture/${responseData.data.user.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				console.log(imageResponse.data);
			}

			yield put(toggleAddUserLoading());
			yield put(fetchAllUsersSTart());
			callback('success');
		}
	} catch (error) {
		yield put(toggleAddUserLoading());
		const errorResponse = error.response.data;
		yield put(addUserFailed(errorResponse.message));
		callback('fail', errorResponse.message);
		console.log(errorResponse.message);
	}
}

export function* onGetAllUsers() {
	yield takeLatest(types.FETCH_ALL_USERS_START, getAllUsers);
}

export function* onUpdateUser() {
	yield takeLatest(types.UPDATE_USER, updateUser);
}

export function* onRemoveUser() {
	yield takeLatest(types.REMOVE_USER, removeUser);
}

export function* onAddUser() {
	yield takeEvery(types.ADD_USER, addUser);
}

export function* onFilterUsers() {
	yield takeEvery(types.FILTER_USERS, filterUsers);
}

export function* onToggleUserStatus() {
	yield takeEvery(types.TOGGLE_USER_STATUS, toggleStatus);
}

export function* usersSagas() {
	yield all([
		call(onGetAllUsers),
		call(onUpdateUser),
		call(onRemoveUser),
		call(onAddUser),
		call(onFilterUsers),
		call(onToggleUserStatus),
	]);
}
