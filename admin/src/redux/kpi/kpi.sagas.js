import { all, call, put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';
import { fetchAllLeadsLoading } from './kpi.actions';
import { kpiActionTypes as types } from './kpi.types';

function* onFetchAllLeadsSaga({ payload: { callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(fetchAllLeadsLoading(true));
	const url = `/api/v1/kpi/leads`;
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
		yield put(fetchAllLeadsLoading(false));

		callback('success', responseData.data.leads);
	} catch (error) {
		yield put(fetchAllLeadsLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* onFetchAllLeads() {
	yield takeEvery(types.FETCH_ALL_LEADS, onFetchAllLeadsSaga);
}

export function* kpiSagas() {
	yield all([call(onFetchAllLeads)]);
}
