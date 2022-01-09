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
export const asyncGetProposalDetails = async (id) => {
	try {
		const resp = await axios.get(apiUrl(`/payment/proposal/${id}`, 2), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
export const asyncProposalResponse = async (id, data) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.post(
			apiUrl(`/payment/proposal-response/${id}`, 2),
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};

export const asyncFetchPackages = async () => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.get(
			apiUrl(`/package/get-active-packages`, 2),

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data.packages;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};

export const asyncFetchPackageDetails = async (id) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		const resp = await axios.get(
			apiUrl(`/package/get-active-package-details/${id}`, 2),

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data.package;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
