import {
	addRequestPhotoLoading,
	validateRequestPhotoLoading,
} from './request.actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { requestActionTypes as types } from './request.types';

function* addRequestPhotosSaga({ payload: { body, callback } }) {
	console.log('object');
	yield put(addRequestPhotoLoading(true));
	const url = '/api/v1/requests/photo';
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data: body,
		});
		const responseData = response.data;
		yield put(addRequestPhotoLoading(false));
		callback('success', responseData.data.request);
	} catch (error) {
		yield put(addRequestPhotoLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}
function* validateRequestPhotosSaga({ payload: { body, callback } }) {
	yield put(validateRequestPhotoLoading(true));
	const url = '/api/v1/requests/validate-photo-request';
	try {
		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data: body,
		});
		const responseData = response.data;
		yield put(validateRequestPhotoLoading(false));
		callback('success', responseData.data.request);
	} catch (error) {
		yield put(validateRequestPhotoLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* addRequestPhoto() {
	yield takeLatest(types.ADD_REQUEST_PHOTO_START, addRequestPhotosSaga);
}
function* validateRequestPhoto() {
	yield takeLatest(
		types.VALIDATE_REQUEST_PHOTO_START,
		validateRequestPhotosSaga
	);
}

export function* requestSagas() {
	yield all([call(addRequestPhoto), call(validateRequestPhoto)]);
}
