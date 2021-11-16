import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

const token = localStorage.getItem('JWT_CLIENT');

export const addAgentQuery = (data, cancelToken, setLoading) => {
	setLoading(true);
	return new Promise((resolve, reject) => {
		axios
			.post(apiUrl('/query/agent', 2), data, {
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
export const addUserQuery = (data, cancelToken, setLoading) => {
	setLoading(true);
	return new Promise((resolve, reject) => {
		axios
			.post(apiUrl('/query/user', 2), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
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

export const verifyUserQuery = (id, otp, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/query/validate-user-query/${id}/${otp}`, 2), {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
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

export const addQueryV2 = async (data) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.post(
			apiUrl(`/query/user/add-query`, 2),
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
export const getQueriesV2 = async (data) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.post(
			apiUrl(`/query/user/get-queries`, 2),
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
