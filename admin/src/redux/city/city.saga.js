import { takeLatest, put, call, all } from 'redux-saga/effects';
import { CityActionTypes as types } from './city.types';
import axios from 'axios';
import { setAllStates, setError, toggleLoading } from './city.actions';

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

export function* ongetAllStates() {
	yield takeLatest(types.FETCH_ALL_STATES_START, getAllStates);
}

export function* citySagas() {
	yield all([call(ongetAllStates)]);
}
