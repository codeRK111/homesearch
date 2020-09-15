import { takeLatest, put, call, all } from 'redux-saga/effects';
import { builderActionTypes as types } from './builder.types';
import axios from 'axios';
import {
	toggleAddBuilderLoading,
	toggleFetchBuildersLoading,
	toggleUpdateBuilderLoading,
	toggleFetchBuilderInfoLoading,
	setBuilders,
} from './builder.action';

function* addBuilder({ payload: { builder, callback } }) {
	try {
		yield put(toggleAddBuilderLoading(true));
		let data = JSON.stringify(builder);
		let url = `/api/v1/builders`;
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleAddBuilderLoading(false));
			console.log(responseData);
		} else {
			if (builder.image) {
				let dataPresent = false;
				console.log(builder.image);
				var formData = new FormData();
				for (const key in builder.image) {
					if (builder.image[key]) {
						dataPresent = true;
						formData.append(key, builder.image[key]);
					}
				}
				if (dataPresent) {
					console.log(responseData);
					const imageResponse = yield axios.patch(
						`/api/v1/builders/handle-image/${responseData.data.builder.id}`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					);
					console.log(imageResponse.data);
				}
			}
			yield put(toggleAddBuilderLoading(false));
			callback('success');
		}
	} catch (error) {
		yield put(toggleAddBuilderLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
	// console.log({ email, password });
}

export function* getBuilders({ payload: { callback, param = {} } }) {
	try {
		yield put(toggleFetchBuildersLoading(true));
		let a = Object.keys(param);
		let b = '';
		a.forEach((c, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${param[c]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		let url = `/api/v1/builders${b}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleFetchBuildersLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleFetchBuildersLoading(false));
			yield put(setBuilders(responseData.data.builders));
			callback('success', responseData.count);
		}
	} catch (error) {
		yield put(toggleFetchBuildersLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* getBuilderInfo({ payload: { builderId, callback } }) {
	try {
		yield put(toggleFetchBuilderInfoLoading(true));

		let url = `/api/v1/builders/${builderId}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleFetchBuilderInfoLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleFetchBuilderInfoLoading(false));
			callback('success', responseData.data.builder);
		}
	} catch (error) {
		yield put(toggleFetchBuilderInfoLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* updateBuilder({ payload: { builderId, builder, callback } }) {
	try {
		yield put(toggleUpdateBuilderLoading(true));
		let url = `/api/v1/builders/${builderId}`;
		let data = JSON.stringify(builder);
		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleUpdateBuilderLoading(false));
			console.log(responseData);
		} else {
			if (builder.image) {
				console.log(builder.image);
				let dataPresent = false;
				var formData = new FormData();
				for (const key in builder.image) {
					if (builder.image[key]) {
						dataPresent = true;
						formData.append(key, builder.image[key]);
					}
				}
				if (dataPresent) {
					console.log(responseData);
					const imageResponse = yield axios.patch(
						`/api/v1/builders/handle-image/${responseData.data.builder.id}`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					);

					console.log(imageResponse.data);
				}
			}

			yield put(toggleUpdateBuilderLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		yield put(toggleUpdateBuilderLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* onAddBuilder() {
	yield takeLatest(types.ADD_BUILDER_START, addBuilder);
}
export function* onFetchBuilders() {
	yield takeLatest(types.FETCH_BUILDERS_START, getBuilders);
}

export function* onUpdateBuilder() {
	yield takeLatest(types.UPDATE_BUILDER_START, updateBuilder);
}
export function* onFetchBuilderInfo() {
	yield takeLatest(types.FETCH_BUILDER_INFO_START, getBuilderInfo);
}

export function* builderSagas() {
	yield all([
		call(onAddBuilder),
		call(onFetchBuilders),
		call(onUpdateBuilder),
		call(onFetchBuilderInfo),
	]);
}
