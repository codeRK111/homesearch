import { takeLatest, put, call, all } from 'redux-saga/effects';
import { projectActionTypes as types } from './project.types';
import axios from 'axios';
import {
	toggleAddProjectFlatLoading,
	toggleFetchProjectsLoading,
	toggleFetchProjectDetailsLoading,
	toggleUpdateProjectDetailsLoading,
	toggleUpdateProjectPropertyDetailsLoading,
	toggleremovePropertyFloorplansLoading,
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
			if (project.image) {
				console.log(project.image);
				let dataPresent = false;
				var formData = new FormData();
				for (const key in project.image) {
					if (project.image[key]) {
						dataPresent = true;
						formData.append(key, project.image[key]);
					}
				}
				if (dataPresent) {
					console.log(responseData);
					const imageResponse = yield axios.patch(
						`/api/v1/projects/handle-image/${responseData.data.project.id}`,
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

export function* updateProjectDetails({
	payload: { callback, projectId, project },
}) {
	try {
		yield put(toggleUpdateProjectDetailsLoading(true));
		let url = `/api/v1/projects/${projectId}`;
		let data = JSON.stringify(project);
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleUpdateProjectDetailsLoading(false));
			console.log(responseData);
		} else {
			if (project.image) {
				console.log(project.image);
				let dataPresent = false;
				var formData = new FormData();
				for (const key in project.image) {
					if (project.image[key]) {
						dataPresent = true;
						formData.append(key, project.image[key]);
					}
				}
				if (dataPresent) {
					console.log(responseData);
					const imageResponse = yield axios.patch(
						`/api/v1/projects/handle-image/${projectId}`,
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
			yield put(toggleUpdateProjectDetailsLoading(false));
			callback('success', responseData.data.project);
		}
	} catch (error) {
		yield put(toggleUpdateProjectDetailsLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* updateProjectPropertyDetails({
	payload: { callback, projectId, project },
}) {
	try {
		yield put(toggleUpdateProjectPropertyDetailsLoading(true));
		let url = `/api/v1/projects/properties/${projectId}`;
		let data = JSON.stringify(project);
		const response = yield axios({
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleUpdateProjectPropertyDetailsLoading(false));
			console.log(responseData);
		} else {
			if (project.floorplans) {
				console.log(project.floorplans);
				let dataPresent = false;
				var formData = new FormData();
				for (const key in project.floorplans) {
					if (project.floorplans[key]) {
						dataPresent = true;
						formData.append(key, project.floorplans[key]);
					}
				}
				if (dataPresent) {
					console.log(responseData);
					const imageResponse = yield axios.patch(
						`/api/v1/projects/handle-image/property/floorplan/${projectId}`,
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
			if (project.propertyImages) {
				console.log(project.propertyImages);
				let dataPresentImage = false;
				var formData = new FormData();
				for (const key in project.propertyImages) {
					if (project.propertyImages[key]) {
						dataPresentImage = true;
						formData.append(key, project.propertyImages[key]);
					}
				}
				if (dataPresentImage) {
					console.log(responseData);
					const imageResponse = yield axios.patch(
						`/api/v1/projects/handle-image/property/${projectId}`,
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
			yield put(toggleUpdateProjectPropertyDetailsLoading(false));
			callback('success', responseData.data.property);
		}
	} catch (error) {
		yield put(toggleUpdateProjectPropertyDetailsLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* removePropertyFloorplan({
	payload: { callback, floorplan, id, type = 'property' },
}) {
	try {
		yield put(toggleremovePropertyFloorplansLoading(true));
		let url =
			type === 'property'
				? `/api/v1/projects/handle-image/property/remove-floorplan/${floorplan}/${id}`
				: `/api/v1/projects/handle-image/remove-image/${floorplan}/${id}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleremovePropertyFloorplansLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleremovePropertyFloorplansLoading(false));
			yield put(setProjects(responseData.data.projects));
			callback('success', floorplan);
		}
	} catch (error) {
		yield put(toggleremovePropertyFloorplansLoading(false));
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
export function* onUpdateProjectsDetails() {
	yield takeLatest(types.UPDATE_PROJECT_DETAILS, updateProjectDetails);
}
export function* onUpdateProjectPropertyDetails() {
	yield takeLatest(
		types.UPDATE_PROJECT_PROPERTY_DETAILS,
		updateProjectPropertyDetails
	);
}
export function* onFloorplanDelete() {
	yield takeLatest(types.REMOVE_PROPERTY_FLOORPLAN, removePropertyFloorplan);
}

export function* projectSagas() {
	yield all([
		call(onAddProjectFlat),
		call(onFetchProjects),
		call(onFetchProjectsDetails),
		call(onUpdateProjectsDetails),
		call(onUpdateProjectPropertyDetails),
		call(onFloorplanDelete),
	]);
}
