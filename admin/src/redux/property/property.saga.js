import { takeLatest, put, call, all } from 'redux-saga/effects';
import { PropertyActionTypes as types } from './property.types';
import axios from 'axios';
import {
	setAllAmenities,
	setAllFurnishes,
	toggleLoading,
	setAllProperties,
	fetchPropertyDetailsLoading,
	updatePropertyLoading,
	toggleAddPropertySaleLoading,
} from './property.actions';

function* getPropertyResources({ payload: { callback } }) {
	try {
		yield put(toggleLoading(true));
		let url = `/api/v1/properties/resources/get-property-resources`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleLoading(false));
			yield put(setAllAmenities(responseData.data.amenities));
			yield put(setAllFurnishes(responseData.data.furnishes));
			callback('success', responseData.data);
		}
	} catch (error) {
		yield put(toggleLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
	// console.log({ email, password });
}

function* addProperty({ payload: { property, callback } }) {
	try {
		yield put(toggleLoading(true));
		let data = JSON.stringify(property);
		let url = `/api/v1/properties`;
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzUzMzFiZTQ3YjhhN2UxODE4ZWVhNyIsImlhdCI6MTU5ODI3NzU0OSwiZXhwIjoxNjA2MDUzNTQ5fQ.kzqo1ZAGwqD1fZfZs2pkKpRMOQtMquKpjr2y4NM8Cq0`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			if (property.image) {
				console.log(property.image);
				var formData = new FormData();
				for (let index = 0; index < property.image.length; index++) {
					formData.append('image', property.image[index]);
				}
				console.log(responseData);
				const imageResponse = yield axios.post(
					`/api/v1/properties/upload-images/${responseData.data.property.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				console.log(imageResponse.data);
			}
			yield put(toggleLoading(false));
			callback('success');
		}
	} catch (error) {
		yield put(toggleLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
	// console.log({ email, password });
}

function* addPropertySale({ payload: { property, callback } }) {
	try {
		yield put(toggleAddPropertySaleLoading(true));
		let data = JSON.stringify(property);
		let url = `/api/v1/properties/add-property/sale`;
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzUzMzFiZTQ3YjhhN2UxODE4ZWVhNyIsImlhdCI6MTU5ODI3NzU0OSwiZXhwIjoxNjA2MDUzNTQ5fQ.kzqo1ZAGwqD1fZfZs2pkKpRMOQtMquKpjr2y4NM8Cq0`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleAddPropertySaleLoading(false));
			console.log(responseData);
		} else {
			if (property.image) {
				console.log(property.image);
				var formData = new FormData();
				for (let index = 0; index < property.image.length; index++) {
					formData.append('image', property.image[index]);
				}
				console.log(responseData);
				const imageResponse = yield axios.post(
					`/api/v1/properties/upload-images/${responseData.data.property.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				console.log(imageResponse.data);
			}
			yield put(toggleAddPropertySaleLoading(false));
			callback('success');
		}
	} catch (error) {
		yield put(toggleAddPropertySaleLoading(false));
		const errorResponse = error.response.data;
		callback('fail', errorResponse.message);
	}
	// console.log({ email, password });
}

export function* getProperties({ payload: { callback, param = {} } }) {
	try {
		yield put(toggleLoading(true));
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
		let url = `/api/v1/properties${b}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleLoading(false));
			yield put(setAllProperties(responseData.data.properties));
			callback('success');
		}
	} catch (error) {
		yield put(toggleLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* getPropertyDetails({ payload: { propertyId, callback } }) {
	try {
		yield put(fetchPropertyDetailsLoading(true));
		let url = `/api/v1/properties/${propertyId}`;
		const response = yield axios.get(url);
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(fetchPropertyDetailsLoading(false));
			console.log(responseData);
		} else {
			yield put(fetchPropertyDetailsLoading(false));
			yield put(setAllProperties(responseData.data.properties));
			callback('success', responseData.data);
		}
	} catch (error) {
		yield put(fetchPropertyDetailsLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* updateProperty({
	payload: { propertyId, property, callback },
}) {
	try {
		yield put(updatePropertyLoading(true));
		let url = `/api/v1/properties/${propertyId}`;
		let data = JSON.stringify(property);
		const response = yield axios({
			method: 'patch',
			headers: { 'Content-Type': 'application/json' },
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(updatePropertyLoading(false));
			console.log(responseData);
		} else {
			yield put(updatePropertyLoading(false));
			yield put(setAllProperties(responseData.data.properties));
			callback('success', responseData.data);
		}
	} catch (error) {
		yield put(updatePropertyLoading(false));
		const errorResponse = error.response.data;
		callback(errorResponse);
		callback('fail', errorResponse.message);
	}
}

export function* onGetPropertyResources() {
	yield takeLatest(
		types.FETCH_PROPERTIES_RESOURCES_START,
		getPropertyResources
	);
}

export function* onAddProperty() {
	yield takeLatest(types.ADD_PROPERTY, addProperty);
}

export function* onAddPropertySale() {
	yield takeLatest(types.ADD_PROPERTY_SALE, addPropertySale);
}

export function* onFetchProperties() {
	yield takeLatest(types.FETCH_PROPERTIES_START, getProperties);
}

export function* onFetchPropertyDetails() {
	yield takeLatest(types.FETCH_PROPERTY_DETAILS_START, getPropertyDetails);
}

export function* onUpdateProperty() {
	yield takeLatest(types.UPDATE_PROPERTY_START, updateProperty);
}

export function* propertySagas() {
	yield all([
		call(onGetPropertyResources),
		call(onAddProperty),
		call(onFetchProperties),
		call(onFetchPropertyDetails),
		call(onUpdateProperty),
		call(onAddPropertySale),
	]);
}
