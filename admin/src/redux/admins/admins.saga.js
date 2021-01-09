import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	fetchAllAdminsStart,
	setAddAdminError,
	setAllAdmins,
	setAllAdminsError,
	setUpdateAdminError,
	toggleAddAdminLoading,
	toggleAllAdminsLoading,
	toggleFetchMyStaffLoading,
	toggleUpdateAdminLoading,
} from './admins.actions';

import axios from 'axios';
import { AdminActionTypes as types } from './admins.types';

function* getAllAdmins() {
	try {
		yield put(toggleAllAdminsLoading());

		let url = '/api/v1/admins';

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleAllAdminsLoading());
		} else {
			yield put(toggleAllAdminsLoading());
			yield put(setAllAdmins(responseData.data.admins));
		}
	} catch (error) {
		yield put(toggleAllAdminsLoading());
		const errorResponse = error.response.data;

		yield put(setAllAdminsError(errorResponse.message));
	}
	// console.log({ email, password });
}
function* fetchMyStaffs({ payload: { callback } }) {
	try {
		const jwt = localStorage.getItem('JWT');
		yield put(toggleFetchMyStaffLoading(true));

		let url = '/api/v1/admins/get-my-staffs';
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
			yield put(toggleFetchMyStaffLoading(false));
		} else {
			yield put(toggleFetchMyStaffLoading(false));
			callback('success', responseData.data.staffs);
		}
	} catch (error) {
		yield put(toggleFetchMyStaffLoading(false));
		const errorResponse = error.response.data;

		callback('fail', errorResponse.message);
	}
	// console.log({ email, password });
}

function* addAdmin({ payload: { admin, callback } }) {
	try {
		yield put(toggleAddAdminLoading());
		let data = JSON.stringify(admin);
		let url = `/api/v1/admins`;

		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleAddAdminLoading());
			console.log(responseData);
		} else {
			if (admin.image) {
				var formData = new FormData();
				formData.append('image', admin.image);
				console.log(responseData);
				const imageResponse = yield axios.post(
					`/api/v1/admins/admin-profile-photo/${responseData.data.admin.id}`,
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
			yield put(toggleAddAdminLoading());
			// yield put(fetchAllAdminsStart());
		}
	} catch (error) {
		yield put(toggleAddAdminLoading());
		const errorResponse = error.response.data;

		yield put(setAddAdminError(errorResponse.message));
	}
}

function* updateAdmin({ payload: { admin, adminId, callback } }) {
	try {
		yield put(toggleUpdateAdminLoading());
		let data = JSON.stringify(admin);
		let url = `/api/v1/admins/${adminId}`;

		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleUpdateAdminLoading());
			console.log(responseData);
		} else {
			if (admin.image) {
				var formData = new FormData();
				formData.append('image', admin.image);
				console.log(responseData);
				const imageResponse = yield axios.post(
					`/api/v1/admins/admin-profile-photo/${adminId}`,
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
			yield put(toggleUpdateAdminLoading());
			// yield put(fetchAllAdminsStart());
		}
	} catch (error) {
		yield put(toggleUpdateAdminLoading());
		const errorResponse = error.response.data;

		yield put(setUpdateAdminError(errorResponse.message));
	}
}

function* toggleAdminStatus({ payload: { admin, adminId, callback } }) {
	try {
		yield put(toggleUpdateAdminLoading());
		let data = JSON.stringify(admin);
		let url = `/api/v1/admins/${adminId}`;

		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleUpdateAdminLoading());
		} else {
			callback('');
			yield put(toggleUpdateAdminLoading());
			yield put(fetchAllAdminsStart());
		}
	} catch (error) {
		yield put(toggleUpdateAdminLoading());
		const errorResponse = error.response.data;
		callback(errorResponse.message);
	}
}

function* removeAdmin({ payload: { adminId, callback } }) {
	try {
		let url = `/api/v1/admins/${adminId}`;

		const response = yield axios.delete(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			console.log(responseData);
		} else {
			callback();
			yield put(fetchAllAdminsStart());
		}
	} catch (error) {
		callback();
		const errorResponse = error.response.data;
		console.log(errorResponse.message);
	}
}

export function* onGetAllAdmins() {
	yield takeLatest(types.FETCH_ALL_ADMINS_START, getAllAdmins);
}

export function* onUpdateAdmin() {
	yield takeLatest(types.UPDATE_ADMIN, updateAdmin);
}

export function* onAddAdmin() {
	yield takeLatest(types.ADD_ADMIN, addAdmin);
}

export function* onRemoveAdmin() {
	yield takeLatest(types.REMOVE_ADMIN, removeAdmin);
}

export function* onToggleAdminStatus() {
	yield takeEvery(types.TOGGLE_ADMIN_STATUS, toggleAdminStatus);
}
export function* onFetchMyStaffs() {
	yield takeEvery(types.FETCH_MY_STAFFS_START, fetchMyStaffs);
}

export function* adminsSagas() {
	yield all([
		call(onGetAllAdmins),
		call(onUpdateAdmin),
		call(onAddAdmin),
		call(onRemoveAdmin),
		call(onToggleAdminStatus),
		call(onFetchMyStaffs),
	]);
}
