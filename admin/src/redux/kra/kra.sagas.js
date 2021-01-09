import {
	addProjectAdvertisementLoading,
	deleteProjectAdvertisementLoading,
	fetchProjectAdvertisementDetailsLoading,
	fetchProjectAdvertisementsLoading,
	updateProjectAdvertisementDetailsLoading,
} from './kra.actions';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';
import { kraActionTypes as types } from './kra.types';

function* onAddProjectAdvertisementSaga({ payload: { body, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(addProjectAdvertisementLoading(true));
	const url = `/api/v1/kra/project-magements`;
	try {
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: JSON.stringify(body),
		});
		const responseData = response.data;
		yield put(addProjectAdvertisementLoading(false));

		callback('success', responseData.data.projectAdvertisement);
	} catch (error) {
		yield put(addProjectAdvertisementLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onFetchProjectAdvertisementsSaga({ payload: { page, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(fetchProjectAdvertisementsLoading(true));
	const url = `/api/v1/kra/project-magements?page=${page}`;
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
		yield put(fetchProjectAdvertisementsLoading(false));

		callback('success', {
			projectAdvertisements: responseData.data.projectAdvertisements,
			count: responseData.count,
		});
	} catch (error) {
		yield put(fetchProjectAdvertisementsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onFetchProjectAdvertisementDetailsSaga({
	payload: { id, callback },
}) {
	const token = localStorage.getItem('JWT');
	yield put(fetchProjectAdvertisementDetailsLoading(true));
	const url = `/api/v1/kra/project-magements/${id}`;
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
		yield put(fetchProjectAdvertisementDetailsLoading(false));
		const data =
			responseData.data.projectAdvertisement.length > 0
				? responseData.data.projectAdvertisement[0]
				: null;
		callback('success', data);
	} catch (error) {
		yield put(fetchProjectAdvertisementDetailsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onUpdateProjectAdvertisementDetailsSaga({
	payload: { id, body, callback },
}) {
	const token = localStorage.getItem('JWT');
	yield put(updateProjectAdvertisementDetailsLoading(true));
	const url = `/api/v1/kra/project-magements/${id}`;
	try {
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: JSON.stringify(body),
		});
		const responseData = response.data;
		yield put(updateProjectAdvertisementDetailsLoading(false));
		const data = responseData.data.projectAdvertisement;
		callback('success', data);
	} catch (error) {
		yield put(updateProjectAdvertisementDetailsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onDeleteProjectAdvertisementSaga({ payload: { id, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(deleteProjectAdvertisementLoading(true));
	const url = `/api/v1/kra/project-magements/${id}`;
	try {
		const response = yield axios({
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
		});
		const responseData = response.data;
		yield put(deleteProjectAdvertisementLoading(false));
		const data = responseData.data.projectAdvertisement;
		callback('success', data);
	} catch (error) {
		yield put(deleteProjectAdvertisementLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* onAddProjectAdvertisement() {
	yield takeEvery(
		types.ADD_PROJECT_ADVERTISEMENT,
		onAddProjectAdvertisementSaga
	);
}
function* onFetchProjectAdvertisements() {
	yield takeEvery(
		types.FETCH_PROJECT_ADVERTISEMENTS,
		onFetchProjectAdvertisementsSaga
	);
}
function* onFetchProjectAdvertisementDetails() {
	yield takeEvery(
		types.FETCH_PROJECT_ADVERTISEMENT_DETAILS,
		onFetchProjectAdvertisementDetailsSaga
	);
}
function* onUpdateProjectAdvertisementDetails() {
	yield takeEvery(
		types.UPDATE_PROJECT_ADVERTISEMENT_DETAILS,
		onUpdateProjectAdvertisementDetailsSaga
	);
}
function* onDeleteProjectAdvertisement() {
	yield takeEvery(
		types.DELETE_PROJECT_ADVERTISEMENT,
		onDeleteProjectAdvertisementSaga
	);
}

export function* kraSagas() {
	yield all([
		call(onAddProjectAdvertisement),
		call(onFetchProjectAdvertisements),
		call(onFetchProjectAdvertisementDetails),
		call(onUpdateProjectAdvertisementDetails),
		call(onDeleteProjectAdvertisement),
	]);
}
