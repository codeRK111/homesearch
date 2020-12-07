import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	deleteQueryLoading,
	getQueriesLoading,
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

function* onGetQueries() {
	yield takeEvery(types.GET_QUERIES, onGetQueriesSaga);
}
function* oDeleteQuery() {
	yield takeEvery(types.DELETE_QUERY, onDeleteQuerySaga);
}

export function* querySagas() {
	yield all([call(onGetQueries), call(oDeleteQuery)]);
}
