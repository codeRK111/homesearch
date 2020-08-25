import { takeLatest, put, call, all } from 'redux-saga/effects';
import { CityActionTypes as types } from './city.types';
import axios from 'axios';
import {
	setAllStates,
	setError,
	toggleLoading,
	cityLoading,
	locationLoading,
	fetchCitiesLoading,
	fetchLocationLoading,
} from './city.actions';

function* getAllStates() {
	try {
		yield put(toggleLoading());
		let url = `/api/v1/cities/states`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading());
			console.log(responseData);
		} else {
			yield put(toggleLoading());
			yield put(setAllStates(responseData.data.states));
		}
	} catch (error) {
		yield put(toggleLoading());
		const errorResponse = error.response.data;
		yield put(setError(errorResponse.message));
	}
	// console.log({ email, password });
}

export function* addCity({ payload: { city, callback } }) {
	try {
		yield put(cityLoading(true));
		let data = JSON.stringify(city);
		let url = `/api/v1/cities`;

		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(cityLoading(false));
			console.log(responseData);
		} else {
			yield put(cityLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(cityLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* addLocation({ payload: { location, callback } }) {
	try {
		yield put(locationLoading(true));
		let data = JSON.stringify(location);
		let url = `/api/v1/cities/locations`;

		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(locationLoading(false));
			console.log(responseData);
		} else {
			yield put(locationLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(locationLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* fetchCities({ payload: { state, callback } }) {
	try {
		yield put(fetchCitiesLoading(true));
		let url = `/api/v1/cities/states/${state}`;

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchCitiesLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchCitiesLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(fetchCitiesLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* fetchLocations({ payload: { city, callback } }) {
	try {
		yield put(fetchLocationLoading(true));
		let url = `/api/v1/cities/locations/${city}`;

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchLocationLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchLocationLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(fetchLocationLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* ongetAllStates() {
	yield takeLatest(types.FETCH_ALL_STATES_START, getAllStates);
}

export function* onAddCity() {
	yield takeLatest(types.ADD_CITY, addCity);
}

export function* onAddLocation() {
	yield takeLatest(types.ADD_LOCATION, addLocation);
}

export function* onFetchCities() {
	yield takeLatest(types.FETCH_CITIES, fetchCities);
}
export function* onFetchLocations() {
	yield takeLatest(types.FETCH_LOCATIOS, fetchLocations);
}

export function* citySagas() {
	yield all([
		call(ongetAllStates),
		call(onAddCity),
		call(onFetchCities),
		call(onAddLocation),
		call(onFetchLocations),
	]);
}
