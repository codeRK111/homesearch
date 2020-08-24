import { takeLatest, put, call, all } from 'redux-saga/effects';
import { PropertyActionTypes as types } from './property.types';
import axios from 'axios';
import {
	setAllAmenities,
	setAllFurnishes,
	toggleLoading,
} from './property.actions';

function* getPropertyResources({ payload: { callback } }) {
	try {
		yield put(toggleLoading(true));
		let url = `/api/v1/properties/get-property-resources`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleLoading(false));
			yield put(setAllAmenities(responseData.data.amenities));
			yield put(setAllFurnishes(responseData.data.furnishes));
		}
	} catch (error) {
		yield put(toggleLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
	}
	// console.log({ email, password });
}

function* addProperty({ payload: { property, callback } }) {
	try {
		yield put(toggleLoading(true));
		let data = JSON.stringify(property);
		let url = `/api/v1/properties`;
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzUzMzFiZTQ3YjhhN2UxODE4ZWVhNyIsImlhdCI6MTU5ODI3NzU0OSwiZXhwIjoxNjA2MDUzNTQ5fQ.kzqo1ZAGwqD1fZfZs2pkKpRMOQtMquKpjr2y4NM8Cq0`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleLoading(false));
			callback('success');
		}
	} catch (error) {
		yield put(toggleLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse);
	}
	// console.log({ email, password });
}

export function* onGetPropertyResources() {
	yield takeLatest(
		types.FETCH_PROPERTIES_RESOURCES_START,
		getPropertyResources
	);
}

export function* onAddProperty() {
	yield takeLatest(types.ADD_PROPERTY, addProperty);
}

export function* propertySagas() {
	yield all([call(onGetPropertyResources), call(onAddProperty)]);
}
