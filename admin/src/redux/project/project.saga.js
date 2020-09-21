import { takeLatest, put, call, all } from 'redux-saga/effects';
import { projectActionTypes as types } from './project.types';
import axios from 'axios';
import {
	toggleAddProjectFlatLoading,
	toggleFetchProjectsLoading,
	setProjects,
} from './project.action';

function* addProjectFlat({ payload: { project, callback, type = 'flat' } }) {
	try {
		yield put(toggleAddProjectFlatLoading(true));
		let data = JSON.stringify(project);
		let url = `/api/v1/projects/${type}`;
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
			yield put(toggleAddProjectFlatLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleAddProjectFlatLoading(false));
			callback('success');
		}
	} catch (error) {
		yield put(toggleAddProjectFlatLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
	// console.log({ email, password });
}

export function* fetchProjects({ payload: { callback, param = {} } }) {
	try {
		yield put(toggleFetchProjectsLoading(true));
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
		let url = `/api/v1/projects${b}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleFetchProjectsLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleFetchProjectsLoading(false));
			yield put(setProjects(responseData.data.projects));
			callback('success', responseData.count);
		}
	} catch (error) {
		yield put(toggleFetchProjectsLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

// export function* getBuilderInfo({ payload: { builderId, callback } }) {
// 	try {
// 		yield put(toggleFetchBuilderInfoLoading(true));

// 		let url = `/api/v1/builders/${builderId}`;
// 		const response = yield axios.get(url);
// 		const responseData = response.data;
// 		if (responseData.status === 'fail') {
// 			yield put(toggleFetchBuilderInfoLoading(false));
// 			console.log(responseData);
// 		} else {
// 			yield put(toggleFetchBuilderInfoLoading(false));
// 			callback('success', responseData.data.builder);
// 		}
// 	} catch (error) {
// 		yield put(toggleFetchBuilderInfoLoading(false));
// 		const errorResponse = error.response.data;
// 		callback(errorResponse);
// 		callback('fail', errorResponse.message);
// 	}
// }

// export function* updateBuilder({ payload: { builderId, builder, callback } }) {
// 	try {
// 		yield put(toggleUpdateBuilderLoading(true));
// 		let url = `/api/v1/builders/${builderId}`;
// 		let data = JSON.stringify(builder);
// 		const response = yield axios({
// 			method: 'patch',
// 			headers: { 'Content-Type': 'application/json' },
// 			url,
// 			data,
// 		});
// 		const responseData = response.data;
// 		if (responseData.status === 'fail') {
// 			yield put(toggleUpdateBuilderLoading(false));
// 			console.log(responseData);
// 		} else {
// 			if (builder.image) {
// 				console.log(builder.image);
// 				let dataPresent = false;
// 				var formData = new FormData();
// 				for (const key in builder.image) {
// 					if (builder.image[key]) {
// 						dataPresent = true;
// 						formData.append(key, builder.image[key]);
// 					}
// 				}
// 				if (dataPresent) {
// 					console.log(responseData);
// 					const imageResponse = yield axios.patch(
// 						`/api/v1/builders/handle-image/${responseData.data.builder.id}`,
// 						formData,
// 						{
// 							headers: {
// 								'Content-Type': 'multipart/form-data',
// 							},
// 						}
// 					);

// 					console.log(imageResponse.data);
// 				}
// 			}

// 			yield put(toggleUpdateBuilderLoading(false));
// 			callback('success', responseData.data);
// 		}
// 	} catch (error) {
// 		yield put(toggleUpdateBuilderLoading(false));
// 		const errorResponse = error.response.data;
// 		callback(errorResponse);
// 		callback('fail', errorResponse.message);
// 	}
// }

export function* onAddProjectFlat() {
	yield takeLatest(types.ADD_PROJECT_FLAT_START, addProjectFlat);
}

export function* onFetchProjects() {
	yield takeLatest(types.FETCH_PROJECTS_START, fetchProjects);
}

export function* projectSagas() {
	yield all([
		call(onAddProjectFlat),
		call(onFetchProjects),
		// call(onUpdateBuilder),
		// call(onFetchBuilderInfo),
	]);
}
