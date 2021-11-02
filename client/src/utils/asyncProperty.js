import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';
import queryString from 'query-string';

const token = localStorage.getItem('JWT_CLIENT');

export const searchProperty = (data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		const stringified = queryString.stringify(data, {
			arrayFormat: 'comma',
		});
		setLoading(true);
		axios
			.get(apiUrl(`/property/user/search-property?${stringified}`, 2), {
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
