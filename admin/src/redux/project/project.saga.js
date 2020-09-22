import { takeLatest, put, call, all } from 'redux-saga/effects';
import { projectActionTypes as types } from './project.types';
import axios from 'axios';
import {
	toggleAddProjectFlatLoading,
	toggleFetchProjectsLoading,
	toggleFetchProjectDetailsLoading,
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

export function* fetchProjectDetails({ payload: { callback, projectId } }) {
	try {
		yield put(toggleFetchProjectDetailsLoading(true));
		let url = `/api/v1/projects/${projectId}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleFetchProjectDetailsLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleFetchProjectDetailsLoading(false));
			callback('success', responseData.data);
		}
	} catch (error) {
		yield put(toggleFetchProjectDetailsLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* onAddProjectFlat() {
	yield takeLatest(types.ADD_PROJECT_FLAT_START, addProjectFlat);
}

export function* onFetchProjects() {
	yield takeLatest(types.FETCH_PROJECTS_START, fetchProjects);
}
export function* onFetchProjectsDetails() {
	yield takeLatest(types.FETCH_PROJECT_DETAILS, fetchProjectDetails);
}

export function* projectSagas() {
	yield all([
		call(onAddProjectFlat),
		call(onFetchProjects),
		call(onFetchProjectsDetails),
		// call(onFetchBuilderInfo),
	]);
}
