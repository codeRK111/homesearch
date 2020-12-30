import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	fetchPropertyDetailsLoading,
	setAllAmenities,
	setAllFurnishes,
	setAllProperties,
	toggleAddPropertySaleLoading,
	toggleLoading,
	updatePropertyLoading,
} from './property.actions';

import axios from 'axios';
import { PropertyActionTypes as types } from './property.types';

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
		const jwt = localStorage.getItem('JWT');
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			if (property.propertyImages) {
				console.log('object');
				const formData = new FormData();
				for (const key in property.propertyImages) {
					formData.append(key, property.propertyImages[key]);
				}
				yield axios.patch(
					`/api/v1/properties/handle-property-image-by-admin/${responseData.data.property.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${jwt}`,
						},
					}
				);
			}
			// if (property.image) {
			// 	console.log(property.image);
			// 	var formData = new FormData();
			// 	for (let index = 0; index < property.image.length; index++) {
			// 		formData.append('image', property.image[index]);
			// 	}
			// 	console.log(responseData);
			// 	const imageResponse = yield axios.post(
			// 		`/api/v1/properties/upload-images/${responseData.data.property.id}`,
			// 		formData,
			// 		{
			// 			headers: {
			// 				'Content-Type': 'multipart/form-data',
			// 			},
			// 		}
			// 	);

			// 	console.log(imageResponse.data);
			// }
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
		const jwt = localStorage.getItem('JWT');
		const response = yield axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			url,
			data,
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleAddPropertySaleLoading(false));
			console.log(responseData);
		} else {
			if (property.propertyImages) {
				console.log('object');
				const formData = new FormData();
				for (const key in property.propertyImages) {
					formData.append(key, property.propertyImages[key]);
				}
				yield axios.patch(
					`/api/v1/properties/handle-property-image-by-admin/${responseData.data.property.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${jwt}`,
						},
					}
				);
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
		const jwt = localStorage.getItem('JWT');
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
		const response = yield axios({
			method: 'get',
			url,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${jwt}`,
			},
		});
		const responseData = response.data;
		if (responseData.status === 'fail') {
			yield put(toggleLoading(false));
			console.log(responseData);
		} else {
			yield put(toggleLoading(false));
			yield put(setAllProperties(responseData.data.properties));
			callback('success', responseData.count);
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
		const jwt = localStorage.getItem('JWT');
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
			if (property.propertyImages) {
				console.log('object');
				const formData = new FormData();
				for (const key in property.propertyImages) {
					formData.append(key, property.propertyImages[key]);
				}
				yield axios.patch(
					`/api/v1/properties/handle-property-image-by-admin/${responseData.data.property.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${jwt}`,
						},
					}
				);
			}
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
