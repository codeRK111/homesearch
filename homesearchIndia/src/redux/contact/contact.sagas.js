import {
	addContactLoading,
	validateContactNumberLoading,
} from './contact.actions';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { contactActionTypes as types } from './contact.types';

function* addContactSaga({ payload: { body, callback } }) {
	console.log('object');
	yield put(addContactLoading(true));
	const url = '/api/v1/contacts';
	try {
		const response = yield axios({
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			url,
			data: body,
		});
		const responseData = response.data;
		yield put(addContactLoading(false));
		callback('success', responseData.data.contact);
	} catch (error) {
		yield put(addContactLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* validateContactNumberSaga({ payload: { number, otp, callback } }) {
	yield put(validateContactNumberLoading(true));
	const url = `/api/v1/contacts/validate/number/${number}/otp/${otp}`;
	try {
		yield put(validateContactNumberLoading(false));
		const response = yield axios.get(url);
		const responseData = response.data;
		yield put(validateContactNumberLoading(false));
		callback('success', responseData);
	} catch (error) {
		yield put(validateContactNumberLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
}

function* onAddContact() {
	yield takeLatest(types.ADD_CONTACT_START, addContactSaga);
}

function* onValidateContactNumber() {
	yield takeEvery(
		types.VALIDATE_CONTACT_NUMBER_START,
		validateContactNumberSaga
	);
}

export function* contactSagas() {
	yield all([call(onAddContact), call(onValidateContactNumber)]);
}
