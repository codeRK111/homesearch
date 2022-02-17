import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';
import queryString from 'query-string';

const token = localStorage.getItem('JWT_CLIENT');

export const getBuilderDetails = (slug, cancelToken, setLoading) => {
	setLoading(true);
	return new Promise((resolve, reject) => {
		axios
			.get(apiUrl(`/builder/slug/${slug}`, 2), {
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
				console.log(error);
				return reject(asyncError(error));
			});
	});
};

export const searchBuilder = (data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		const stringified = queryString.stringify(data);
		setLoading(true);
		axios
			.get(apiUrl(`/builder/search-builder?${stringified}`, 2), {
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
export const getProjectsOfABuilder = async (id) => {
	try {
		const resp = await axios.get(apiUrl(`/builder/get-projects/${id}`, 2), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return resp.data.data.projects;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
