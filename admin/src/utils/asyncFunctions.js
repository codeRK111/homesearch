import { apiUrl } from './render.utils';
import axios from 'axios';
import queryString from 'query-string';

export const addProjectSpeciality = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project/speciality`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.speciality);
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
export const updateProjectSpeciality = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/project/speciality/${data.id}`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.speciality);
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
export const getProjectSpecialities = (cancelToken, setLoading, filter) => {
	const token = localStorage.getItem('JWT');
	const url = `/project/speciality?${queryString.stringify(filter)}`;
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(url, 'v2'), {
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

export const getAddProjectPageInfo = (
	cancelToken,
	setLoading,
	setError = null
) => {
	const token = localStorage.getItem('JWT');
	const url = `/page/project/add-project`;
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(url, 'v2'), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				if (setError) {
					setError(null);
				}
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				if (setError) {
					setError(message);
				}
				return reject(message);
			});
	});
};

export const searchPlace = (data, cancelToken, setLoading, type = 'city') => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(
				apiUrl(
					`/cities/${
						type === 'city' ? 'searchCity' : 'searchLocation'
					}`
				),
				data,
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
				return type === 'city'
					? resolve(resp.data.data.cities)
					: resolve(resp.data.data.locations);
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
