import { apiUrl } from './render.utils';
import axios from 'axios';

export const getProjectProperty = (data, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.post(apiUrl(`/project/property`, 2), data, {
				cancelToken: cancelToken.token,
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.properties);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				return reject(message);
			});
	});
};
