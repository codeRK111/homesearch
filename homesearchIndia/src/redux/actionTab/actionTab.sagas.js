import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import { cityActionTypes as types } from './city.types';
import { searchCitiesLoading } from './city.actions';

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

function* onSearchCities() {
	yield takeLatest(types.SEARCH_CITY_START, searchCitiesSaga);
}

export function* citySagas() {
	yield all([call(onSearchCities)]);
}
