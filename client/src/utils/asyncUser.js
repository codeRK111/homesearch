import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

export const setLastActive = (id, cancelToken) => {
	const token = localStorage.getItem('JWT_CLIENT');
	return new Promise((resolve, reject) => {
		axios
			.patch(
				apiUrl(`/user/by-user/${id}`, 2),
				{
					lastActive: Date.now(),
				},
				{
					cancelToken: cancelToken.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((resp) => {
				return resolve(resp.data.data);
			})
			.catch((error) => {
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
export const getRealtors = (data, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT_CLIENT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/user/get-realtors`, 2), data, {
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
export const getRealtorDetails = (id, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT_CLIENT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/user/realtor/${id}`, 2), {
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
