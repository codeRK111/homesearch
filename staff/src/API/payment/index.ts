import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { PaymentLink } from '../../model/payment.interface';
import { ServerResponse } from '../../model/apiResponse.interface';
import { Subscription } from '../../model/subscription.interface';

export type FetchBasicInput = {
	page: number;
	limit: number;
};
export type FetchSubscriptionResponse = {
	totalDocs: number;
	subscriptions: Array<Subscription>;
};

export const asyncFetchSubscriptions = async (
	filter: FetchBasicInput
): Promise<FetchSubscriptionResponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let a = Object.keys(filter);
		let b = '';
		a.forEach((c, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${filter[c as keyof FetchBasicInput]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<FetchSubscriptionResponse>>
		>(
			`${V2EndPoint.Payment}/subscription${b}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export type FetchPaymentLinksResponse = {
	totalDocs: number;
	links: Array<PaymentLink>;
};

export const asyncFetchPaymentLinks = async (
	filter: FetchBasicInput
): Promise<FetchPaymentLinksResponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let a = Object.keys(filter);
		let b = '';
		a.forEach((c, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${filter[c as keyof FetchBasicInput]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<FetchPaymentLinksResponse>>
		>(
			`${V2EndPoint.Payment}/payment-links${b}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export type CreatePaymentLinkInputType = {
	amount: string;
	name: string;
	phone: string;
	notes: string;
	expiryDate: Date | null;
};

export const asyncCreatePaymentLink = async (
	data: CreatePaymentLinkInputType
): Promise<string> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<{ link: string }>>
		>(`${V2EndPoint.Payment}/create-payment-link`, data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return resp.data.data.link;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncSendFeedbackForm = async (
	id: string
): Promise<Subscription> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<Subscription>>
		>(
			`${V2EndPoint.Payment}/send-feedback-mail/${id}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
