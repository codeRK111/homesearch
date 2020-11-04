import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { searchCitiesLoading, searchLocationsLoading } from './city.actions';

import axios from 'axios';
import { cityActionTypes as types } from './city.types';

function* searchCitiesSaga({ payload: { name, callback } }) {
	yield put(searchCitiesLoading(true));
	const url = '/api/v1/cities/searchCity';
	const data = JSON.stringify({ name });
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(searchCitiesLoading(false));
		callback('success', responseData.data.cities);
	} catch (error) {
		yield put(searchCitiesLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* searchLocationsSaga({ payload: { name, city, callback } }) {
	yield put(searchLocationsLoading(true));
	const url = '/api/v1/cities/searchLocation';
	const data = JSON.stringify({ name, city });
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		yield put(searchLocationsLoading(false));
		callback('success', responseData.data.locations);
	} catch (error) {
		yield put(searchLocationsLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* onSearchCities() {
	yield takeLatest(types.SEARCH_CITY_START, searchCitiesSaga);
}

function* onSearchLocations() {
	yield takeEvery(types.SEARCH_LOCATION_START, searchLocationsSaga);
}

export function* citySagas() {
	yield all([call(onSearchCities), call(onSearchLocations)]);
}
