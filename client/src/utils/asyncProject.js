import { apiUrl } from './render.utils';
import axios from 'axios';

export const getProjectAgents = (id, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/project/get-agents/${id}`, 2), {
				cancelToken: cancelToken.token,
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.projectAgents);
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
