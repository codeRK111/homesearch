import { apiUrl } from './render.utils';
import axios from 'axios';

// import queryString from 'query-string';

export const addProject = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				console.log({ error });
				setLoading(false);
				let message = '';
				let validation = false;
				let validationFields = [];
				if (!!error.response) {
					if (error.response.data.validationError) {
						validation = true;
						validationFields = error.response.data.errors;
						message = 'Invalid input fields';
					} else {
						validation = false;
						validationFields = [];
						message = error.response.data.message;
					}
				} else {
					validation = false;
					validationFields = [];
					message = error.message;
				}
				return reject({ message, validation, validationFields });
			});
	});
};
export const addProjectProperty = (project, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project/${project}/units`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.property);
			})
			.catch((error) => {
				console.log({ error });
				setLoading(false);
				let message = '';
				let validation = false;
				let validationFields = [];
				if (!!error.response) {
					if (error.response.data.validationError) {
						validation = true;
						validationFields = error.response.data.errors;
						message = 'Invalid input fields';
					} else {
						validation = false;
						validationFields = [];
						message = error.response.data.message;
					}
				} else {
					validation = false;
					validationFields = [];
					message = error.message;
				}
				return reject({ message, validation, validationFields });
			});
	});
};
export const updateProject = (
	project,
	data,
	cancelToken,
	setLoading,
	type = 'photo'
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url =
			type === 'photo'
				? `/project/upload-photos/${project}`
				: `/project/${project}`;
		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const updateProjectProperty = (id, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/units/${id}`;
		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.property);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const updateTowerNumbers = (project, data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/handle-towers/${project}`;

		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const updateTowerName = (
	project,
	tower,
	data,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/project/handle-tower-name/${project}/${tower}`;

		setLoading(true);
		axios
			.patch(apiUrl(url, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.project);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
export const getProject = (project, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/project/${project}`, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve({
					project: resp.data.data.project,
					properties: resp.data.data.properties,
				});
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};

export const removeProjectPhoto = (
	projectId,
	imageId,
	cancelToken,
	setLoading
) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading({
			id: imageId,
			loading: true,
			error: null,
		});
		axios
			.get(
				apiUrl(
					`/projects/remove-project-photos/${projectId}/${imageId}`,
					'v1'
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
				setLoading({
					id: null,
					loading: false,
					error: null,
				});
				return resolve(resp.data.property);
			})
			.catch((error) => {
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setLoading({
					id: null,
					loading: false,
					error: message,
				});
				return reject(message);
			});
	});
};
