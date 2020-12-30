import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	cityLoading,
	deleteCityLoading,
	deleteLocationLoading,
	fetchCitiesLoading,
	fetchCityDependenciesLoading,
	fetchCityDetailsLoading,
	fetchLocationDependenciesLoading,
	fetchLocationDetailsLoading,
	fetchLocationLoading,
	locationLoading,
	searchCitiesLoading,
	setAllStates,
	setError,
	toggleLoading,
	updateCityLoading,
	updateLocationLoading,
} from './city.actions';

import axios from 'axios';
import { CityActionTypes as types } from './city.types';

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

function* getAllStates() {
	try {
		yield put(toggleLoading());
		let url = `/api/v1/cities/states/all`;
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

export function* updateCity({ payload: { cityId, city, callback } }) {
	try {
		yield put(updateCityLoading(true));
		let url = `/api/v1/cities/${cityId}`;
		let data = JSON.stringify(city);
		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(updateCityLoading(false));
		} else {
			yield put(updateCityLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(updateCityLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* updateLocation({
	payload: { locationId, location, callback },
}) {
	try {
		yield put(updateLocationLoading(true));
		let url = `/api/v1/cities/locations/manage/${locationId}`;
		let data = JSON.stringify(location);
		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(updateLocationLoading(false));
		} else {
			yield put(updateLocationLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(updateLocationLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* fetchCityDetails({ payload: { cityId, callback } }) {
	try {
		yield put(fetchCityDetailsLoading(true));
		let url = `/api/v1/cities/${cityId}`;

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchCityDetailsLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchCityDetailsLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(fetchCityDetailsLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* fetchLocationDetails({ payload: { locationId, callback } }) {
	try {
		yield put(fetchLocationDetailsLoading(true));
		let url = `/api/v1/cities/locations/fetch/${locationId}`;

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchLocationDetailsLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchLocationDetailsLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(fetchLocationDetailsLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* fetchCityDependencies({ payload: { cityId, callback } }) {
	try {
		yield put(fetchCityDependenciesLoading(true));
		let url = `/api/v1/cities/${cityId}/check-dependencies`;

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchCityDependenciesLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchCityDependenciesLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(fetchCityDependenciesLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* deleteCity({ payload: { cityId, callback } }) {
	try {
		yield put(deleteCityLoading(true));

		let url = `/api/v1/cities/${cityId}`;
		const response = yield axios.delete(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(deleteCityLoading(false));
			console.log(responseData);
		} else {
			yield put(deleteCityLoading(false));
			callback('success', null);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(deleteCityLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* fetchLocationDependencies({
	payload: { locationId, callback },
}) {
	try {
		yield put(fetchLocationDependenciesLoading(true));
		let url = `/api/v1/cities/locations/${locationId}/check-dependencies`;

		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchLocationDependenciesLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchLocationDependenciesLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(fetchLocationDependenciesLoading(false));
		callback('fail', errorResponse.message);
	}
}

export function* deleteLocation({ payload: { locationId, callback } }) {
	try {
		yield put(deleteLocationLoading(true));

		let url = `/api/v1/cities/locations/manage/${locationId}`;
		const response = yield axios.delete(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(deleteLocationLoading(false));
			console.log(responseData);
		} else {
			yield put(deleteLocationLoading(false));
			callback('success', null);
		}
	} catch (error) {
		const errorResponse = error.response.data;
		yield put(deleteLocationLoading(false));
		callback('fail', errorResponse.message);
	}
}

function* onSearchCities() {
	yield takeLatest(types.SEARCH_CITY_START, searchCitiesSaga);
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

export function* onUpdateCity() {
	yield takeLatest(types.UPDATE_CITY, updateCity);
}
export function* onUpdateLocation() {
	yield takeLatest(types.UPDATE_LOCATION, updateLocation);
}
export function* onFetchCityDetails() {
	yield takeLatest(types.FETCH_CITY_DETAILS_START, fetchCityDetails);
}
export function* onFetchLocationDetails() {
	yield takeLatest(types.FETCH_LOCATION_DETAILS_START, fetchLocationDetails);
}
export function* onFetchCityDependenciesStart() {
	yield takeLatest(
		types.CHECK_CITY_DEPENDENCIES_START,
		fetchCityDependencies
	);
}

export function* onDeleteCity() {
	yield takeLatest(types.DELETE_CITY_START, deleteCity);
}

export function* onFetchLocationDependenciesStart() {
	yield takeLatest(
		types.CHECK_LOCATION_DEPENDENCIES_START,
		fetchLocationDependencies
	);
}

export function* onDeleteLocation() {
	yield takeLatest(types.DELETE_LOCATION_START, deleteLocation);
}

export function* citySagas() {
	yield all([
		call(onSearchCities),
		call(ongetAllStates),
		call(onAddCity),
		call(onFetchCities),
		call(onAddLocation),
		call(onFetchLocations),
		call(onUpdateCity),
		call(onUpdateLocation),
		call(onFetchCityDetails),
		call(onFetchLocationDetails),
		call(onFetchCityDependenciesStart),
		call(onDeleteCity),
		call(onFetchLocationDependenciesStart),
		call(onDeleteLocation),
	]);
}
