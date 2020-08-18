import { takeLatest, put, call, all, takeEvery } from 'redux-saga/effects';
import { AdminActionTypes as types } from './admins.types';
import axios from 'axios';
import {
	setAllAdmins,
	setAllAdminsError,
	setUpdateAdminError,
	setAddAdminError,
	toggleAllAdminsLoading,
	toggleUpdateAdminLoading,
	toggleAddAdminLoading,
	fetchAllAdminsStart,
} from './admins.actions';

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

export function* adminsSagas() {
	yield all([
		call(onGetAllAdmins),
		call(onUpdateAdmin),
		call(onAddAdmin),
		call(onRemoveAdmin),
		call(onToggleAdminStatus),
	]);
}
