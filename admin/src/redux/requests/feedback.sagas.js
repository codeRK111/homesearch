import {
	addFeedbackLoading,
	deleteFeedbackLoading,
	fetchFeedbackLoading,
	setFeedback,
} from './feedback.actions';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { feedbackActionTypes as types } from './feedback.types';

function* addFeedbackSaga({ payload: { body, callback } }) {
	yield put(addFeedbackLoading(true));
	const url = '/api/v1/feedbacks';
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data: body,
		});
		const responseData = response.data;
		yield put(addFeedbackLoading(false));
		callback('success', responseData.data.feedback);
	} catch (error) {
		yield put(addFeedbackLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}
function* fetchFeedbackSaga({ payload: { body, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(fetchFeedbackLoading(true));
	const url = '/api/v1/admins/get-feedbacks';
	try {
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
			data: body,
		});
		const responseData = response.data;
		yield put(fetchFeedbackLoading(false));
		yield put(
			setFeedback({
				feedbacks: responseData.data.feedbacks,
				counts: responseData.data.counts,
			})
		);
		callback('success', responseData.data.feedbacks);
	} catch (error) {
		yield put(fetchFeedbackLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* onDeleteQuerySaga({ payload: { id, callback } }) {
	const token = localStorage.getItem('JWT');
	yield put(deleteFeedbackLoading(true));
	const url = `/api/v1/admins/feedbacks/${id}`;
	try {
		const response = yield axios({
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			url,
		});
		console.log(response);
		const responseData = response.data;
		yield put(deleteFeedbackLoading(false));
		callback('success', responseData.data.feedback);
	} catch (error) {
		yield put(deleteFeedbackLoading(false));
		const errorResponse = error.response.data;
		if (typeof errorResponse === 'string') {
			callback('fail', errorResponse);
			return;
		}
		callback('fail', errorResponse.message);
	}
}

function* addFeedback() {
	yield takeLatest(types.ADD_FEEDBACK_START, addFeedbackSaga);
}
function* faetchFeedback() {
	yield takeLatest(types.FETCH_FEEDBACK_START, fetchFeedbackSaga);
}

function* oDeleteFeedback() {
	yield takeEvery(types.DELETE_FEEDBACK_START, onDeleteQuerySaga);
}

export function* feedbackSagas() {
	yield all([call(addFeedback), call(faetchFeedback), call(oDeleteFeedback)]);
}
