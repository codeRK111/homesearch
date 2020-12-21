import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { addFeedbackLoading } from './feedback.actions';
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

function* addFeedback() {
	yield takeLatest(types.ADD_FEEDBACK_START, addFeedbackSaga);
}

export function* feedbackSagas() {
	yield all([call(addFeedback)]);
}
