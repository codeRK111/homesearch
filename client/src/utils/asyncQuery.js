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
