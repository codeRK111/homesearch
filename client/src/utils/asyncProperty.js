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

export const asyncGetPropertyOfAUser = async (id, cancelToken) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.get(
			apiUrl(`/property/user/properties/${id}`, 2),
			{
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data.properties;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};

export const asyncGetMyProperties = async () => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const {
			data: {
				data: { properties },
			},
		} = await axios.get(apiUrl('/property/user/my-properties/all', 2), {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return properties;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
