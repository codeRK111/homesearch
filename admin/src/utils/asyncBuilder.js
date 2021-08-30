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
	if (data.teamPhoto) {
		formData.append('teamPhoto', data.teamPhoto);
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
export const addDirector = (id, data, cancelToken, setLoading) => {
	const formData = new FormData();
	if (data.image) {
		formData.append('image', data.image);
	}
	if (data.name) {
		formData.append('name', data.name);
	}

	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/builder/director/${id}`, 'v2'), formData, {
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
export const updateDirector = (id, data, cancelToken, setLoading) => {
	const formData = new FormData();
	if (data.image) {
		formData.append('image', data.image);
	}
	if (data.id) {
		formData.append('id', data.id);
	}
	if (data.name) {
		formData.append('name', data.name);
	}

	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/builder/director/${id}`, 'v2'), formData, {
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
export const removeDirector = (
	builderId,
	directorId,
	cancelToken,
	setLoading
) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.delete(
				apiUrl(
					`/builder/remove-director/${builderId}/${directorId}`,
					'v2'
				),
				{
					cancelToken: cancelToken.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
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

export const mangePrimaryPhoto = (id, data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/builder/manage-primary-photo/${id}`, 'v2'), data, {
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

export const getAllBuilders = (data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/builder/get-all`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
