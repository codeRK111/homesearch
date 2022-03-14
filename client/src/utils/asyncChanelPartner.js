import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

export const asyncCreateCP = async (data) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.post(
			apiUrl(`/chanel-partner`, 2),
			data,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data.cp;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
