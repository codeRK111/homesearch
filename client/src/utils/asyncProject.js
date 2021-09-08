import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

const token = localStorage.getItem('JWT_CLIENT');

export const getProjectAgents = (id, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/project/get-agents/${id}`, 2), {
				cancelToken: cancelToken.token,
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.projectAgents);
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
export const addOpinion = (id, data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project/add-opinion/${id}`, 2), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.opinion);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
export const getOpinion = (id, userId, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(
				apiUrl(
					`/project/get-opinion/${id}${userId ? `/${userId}` : ''}`,
					2
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
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
