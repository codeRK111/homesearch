import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

const token = localStorage.getItem('JWT');

export const getAgentQueries = (data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/query/get-agent-queries`, 'v2'), data, {
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
export const updateUserQuery = (id, data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.patch(apiUrl(`/query/update-user-query/${id}`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.query);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
export const getUserQueries = (data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/query/get-all-user-queries`, 'v2'), data, {
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
export const addAgentResponse = (id, data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/query/agent-response/${id}`, 'v2'), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.query);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
