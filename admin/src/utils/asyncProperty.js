import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

export const searchByName = (title, cancelToken, setLoading) => {
	const token = localStorage.getItem('JWT');
	return new Promise((resolve, reject) => {
		const url = `/property/admin/search-by-name`;
		setLoading(true);
		axios
			.post(
				apiUrl(url, 'v2'),
				{ title },
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
				return resolve(resp.data.data.properties);
			})
			.catch((error) => {
				setLoading(false);

				return reject(asyncError(error));
			});
	});
};
