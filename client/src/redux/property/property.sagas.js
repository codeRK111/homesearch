import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	getPropertyDetailsLoading,
	getPropertyResourcesLoading,
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

export function* propertySagas() {
	yield all([
		call(onSearchProperties),
		call(onGetPropertyDetails),
		call(onGetPropertyResources),
	]);
}
