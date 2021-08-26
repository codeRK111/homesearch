import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

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
