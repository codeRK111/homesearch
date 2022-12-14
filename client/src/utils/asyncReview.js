import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';
import queryString from 'query-string';

const token = localStorage.getItem('JWT_CLIENT');

export const addReview = (data, cancelToken, setLoading) => {
	setLoading(true);
	return new Promise((resolve, reject) => {
		axios
			.post(apiUrl(`/review/user`, 2), data, {
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.review);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};

export const getReviews = (id, data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		const stringified = queryString.stringify(data);
		setLoading(true);
		axios
			.get(apiUrl(`/review/user/property/${id}?${stringified}`, 2), {
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
