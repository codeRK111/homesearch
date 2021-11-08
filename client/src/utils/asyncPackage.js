import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

export const asyncGetSubscriptionDetails = async (
	id,
	cancelToken,
	setLoading
) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		setLoading(true);
		const resp = await axios.get(apiUrl(`/payment/subscription/${id}`, 2), {
			cancelToken: cancelToken.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		setLoading(false);
		return resp.data.data;
	} catch (error) {
		setLoading(false);
		throw new Error(asyncError(error));
	}
};
export const asyncSubmitFeedack = async (id, data, cancelToken, setLoading) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		setLoading(true);
		const resp = await axios.post(
			apiUrl(`/payment/submit-feedback/${id}`, 2),
			data,
			{
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		setLoading(false);
		return resp.data.data;
	} catch (error) {
		setLoading(false);
		throw new Error(asyncError(error));
	}
};
