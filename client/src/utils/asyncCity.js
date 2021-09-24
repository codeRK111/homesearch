import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

// const token = localStorage.getItem('JWT_CLIENT');

export const searchPlace = (data, cancelToken, setLoading, type = 'city') => {
	const token = localStorage.getItem('JWT_CLIENT');
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(
				apiUrl(
					`/cities/${
						type === 'city' ? 'searchCity' : 'searchLocation'
					}`
				),
				data,
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
				return type === 'city'
					? resolve(resp.data.data.cities)
					: resolve(resp.data.data.locations);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
