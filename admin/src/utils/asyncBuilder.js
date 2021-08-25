import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

const token = localStorage.getItem('JWT');

export const updateBuilderBasicDetails = (
	id,
	data,
	cancelToken,
	setLoading
) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/builder/${id}`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.builder);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
export const removeBuilderPhoto = (id, data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/builder/remove-photo/${id}`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.builder);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
export const handleBuilderImages = (id, data, cancelToken, setLoading) => {
	const formData = new FormData();
	if (data.logo) {
		formData.append('logo', data.logo);
	}
	if (data.photos && data.photos.length > 0) {
		data.photos.forEach((c) => {
			formData.append('photos', c);
		});
	}
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/builder/handle-images/${id}`, 'v2'), formData, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.builder);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};

export const getBuilderDetails = (id, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/builder/${id}`, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.builder);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
