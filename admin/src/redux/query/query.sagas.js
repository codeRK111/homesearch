import {
	addExpertQueryLoading,
	deleteExpertQueryLoading,
	deleteQueryLoading,
	getExpertQueriesLoading,
	getExpertQueryDetailsLoading,
	getQueriesLoading,
	setExpertQueries,
	setQueries,
	updateExpertQueryDetailsLoading,
} from './query.actions';
import { all, call, put, takeEvery } from 'redux-saga/effects';

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
function* onGetExpertQueryDetailsSaga({ payload: { id, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(getExpertQueryDetailsLoading(true));
	const url = `/api/v1/admins/get-expert-query-details/${id}`;
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
		yield put(getExpertQueryDetailsLoading(false));

		callback('success', responseData.data.query);
	} catch (error) {
		yield put(getExpertQueryDetailsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onUpdateExpertQueryDetailsSaga({ payload: { id, body, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(updateExpertQueryDetailsLoading(true));
	const url = `/api/v1/admins/update-expert-query-details/${id}`;
	try {
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: JSON.stringify(body),
		});
		const responseData = response.data;
		yield put(updateExpertQueryDetailsLoading(false));

		callback('success', responseData.data.query);
	} catch (error) {
		yield put(updateExpertQueryDetailsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}
function* onAddExpertQuerySaga({ payload: { body, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(addExpertQueryLoading(true));
	const url = `/api/v1/admins/add-contact`;
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
		yield put(addExpertQueryLoading(false));

		callback('success', responseData.data.contact);
	} catch (error) {
		yield put(addExpertQueryLoading(false));
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
function* onGetExpertQueryDetails() {
	yield takeEvery(
		types.GET_EXPERT_QUERY_DETAILS,
		onGetExpertQueryDetailsSaga
	);
}
function* onUpdateExpertQueryDetails() {
	yield takeEvery(
		types.UPDATE_EXPERT_QUERY_DETAILS,
		onUpdateExpertQueryDetailsSaga
	);
}
function* onAddExpertQuery() {
	yield takeEvery(types.ADD_EXPERT_QUERY, onAddExpertQuerySaga);
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
		call(onGetExpertQueryDetails),
		call(onUpdateExpertQueryDetails),
		call(onAddExpertQuery),
		call(oDeleteQuery),
		call(oDeleteExpertQuery),
	]);
}
