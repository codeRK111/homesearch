import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	getMyPropertiesLoading,
	getPropertyDetailsLoading,
	getPropertyResourcesLoading,
	postPropertyLoading,
	searchPropertiesLoading,
	setPropertyResources,
} from './property.actions';

import axios from 'axios';
import { propertyActionTypes as types } from './property.types';

function* searchPropertySaga({ payload: { body, callback } }) {
	yield put(searchPropertiesLoading(true));
	const url = '/api/v1/properties/searchProperties';
	const data = JSON.stringify(body);
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(searchPropertiesLoading(false));
		callback('success', {
			properties: responseData.data.properties,
			count: responseData.count,
			propertyItems: responseData.data.propertyItems
				? responseData.data.propertyItems
				: [],
		});
	} catch (error) {
		yield put(searchPropertiesLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* getPropertyDetailsSaga({ payload: { id, callback } }) {
	yield put(getPropertyDetailsLoading(true));
	const url = `/api/v1/properties/${id}`;
	try {
		const response = yield axios.get(url);
		const responseData = response.data;
		yield put(getPropertyDetailsLoading(false));
		callback('success', responseData.data.property);
	} catch (error) {
		yield put(getPropertyDetailsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* getPropertyResourcesSaga({ payload: { callback } }) {
	yield put(getPropertyResourcesLoading(true));
	const url = `/api/v1/properties/resources/get-property-resources`;
	try {
		const response = yield axios.get(url);
		const responseData = response.data;
		yield put(getPropertyResourcesLoading(false));
		yield put(setPropertyResources(responseData.data));
		callback('success', responseData.data);
	} catch (error) {
		yield put(getPropertyResourcesLoading(false));
		yield put(setPropertyResources({ furnishes: [], amenities: [] }));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* onPostPropertySaga({ payload: { data, callback } }) {
	const token = localStorage.getItem('JWT_CLIENT');
	yield put(postPropertyLoading(true));
	let url;
	if (data['for'] === 'rent') {
		url = '/api/v1/properties/user/rent';
	} else {
		url = '/api/v1/properties/user/sale';
	}

	try {
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: JSON.stringify(data),
		});
		const responseData = response.data;
		if (data.propertyImages) {
			const formData = new FormData();
			for (const key in data.propertyImages) {
				formData.append(key, data.propertyImages[key]);
			}
			yield axios.patch(
				`/api/v1/properties/handle-property-image/${responseData.data.property.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);
		}

		yield put(postPropertyLoading(false));

		callback('success', responseData.data.property);
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(postPropertyLoading(false));
		callback('fail', errorResponse.message);
	}
}

function* onGetMyPropertiesSaga({ payload: { callback } }) {
	const token = localStorage.getItem('JWT_CLIENT');
	yield put(getMyPropertiesLoading(true));
	const url = `/api/v1/properties/user/my-properties`;
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
		yield put(getMyPropertiesLoading(false));

		callback('success', {
			properties: responseData.data.properties,
			count: responseData.count,
		});
	} catch (error) {
		yield put(getMyPropertiesLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* onSearchProperties() {
	yield takeEvery(types.SEARCH_PROPERTY_START, searchPropertySaga);
}

function* onGetPropertyDetails() {
	yield takeEvery(types.GET_PROPERTY_DETAILS_START, getPropertyDetailsSaga);
}

function* onGetPropertyResources() {
	yield takeEvery(
		types.GET_PROPERTY_RESOURCES_START,
		getPropertyResourcesSaga
	);
}

function* onPostProperty() {
	yield takeEvery(types.POST_PROPERTY_START, onPostPropertySaga);
}

function* onGetMyProperties() {
	yield takeEvery(types.GET_MY_PROPERTIES_START, onGetMyPropertiesSaga);
}

export function* propertySagas() {
	yield all([
		call(onSearchProperties),
		call(onGetPropertyDetails),
		call(onGetPropertyResources),
		call(onPostProperty),
		call(onGetMyProperties),
	]);
}
