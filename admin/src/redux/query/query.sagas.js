import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	deleteExpertQueryLoading,
	deleteQueryLoading,
	getExpertQueriesLoading,
	getQueriesLoading,
	setExpertQueries,
	setQueries,
} from './query.actions';

import axios from 'axios';
import { queryActionTypes as types } from './query.types';

function* onGetQueriesSaga({ payload: { body, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(getQueriesLoading(true));
	const url = `/api/v1/admins/get-queries`;
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
		yield put(getQueriesLoading(false));
		yield put(setQueries(responseData.data.queries));
		callback('success', responseData.data.queries);
	} catch (error) {
		yield put(getQueriesLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onGetExpertQueriesSaga({ payload: { body, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(getExpertQueriesLoading(true));
	const url = `/api/v1/admins/get-expert-queries`;
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
		yield put(getExpertQueriesLoading(false));
		yield put(
			setExpertQueries({
				queries: responseData.data.queries,
				count: responseData.count,
			})
		);
		callback('success', responseData.data.queries);
	} catch (error) {
		yield put(getExpertQueriesLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* onDeleteQuerySaga({ payload: { id, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(deleteQueryLoading(true));
	const url = `/api/v1/admins/delete-query/${id}`;
	try {
		const response = yield axios({
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
		});
		console.log(response);
		const responseData = response.data;
		yield put(deleteQueryLoading(false));
		callback('success', responseData.data.queries);
	} catch (error) {
		yield put(deleteQueryLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onDeleteExpertQuerySaga({ payload: { id, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(deleteExpertQueryLoading(true));
	const url = `/api/v1/admins/delete-expert-query/${id}`;
	try {
		const response = yield axios({
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
		});
		console.log(response);
		const responseData = response.data;
		yield put(deleteExpertQueryLoading(false));
		callback('success', responseData.data.queries);
	} catch (error) {
		yield put(deleteExpertQueryLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* onGetQueries() {
	yield takeEvery(types.GET_QUERIES, onGetQueriesSaga);
}
function* onGetExpertQueries() {
	yield takeEvery(types.GET_EXPERT_QUERIES, onGetExpertQueriesSaga);
}
function* oDeleteQuery() {
	yield takeEvery(types.DELETE_QUERY, onDeleteQuerySaga);
}
function* oDeleteExpertQuery() {
	yield takeEvery(types.DELETE_EXPERT_QUERY, onDeleteExpertQuerySaga);
}

export function* querySagas() {
	yield all([
		call(onGetQueries),
		call(onGetExpertQueries),
		call(oDeleteQuery),
		call(oDeleteExpertQuery),
	]);
}
