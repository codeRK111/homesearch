import { APIV2, V2EndPoint, asyncError } from '../instance';
import { PaymentLink, RazorpayPayment } from '../../model/payment.interface';

import { AxiosResponse } from 'axios';
import { IcreateSubscriptionData } from '../../components/Forms/createSubscription';
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
	filter: any
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
export const asyncFetchSubscriptionRevenue = async (
	filter: any
): Promise<any> => {
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
		const resp = await APIV2.get<any, AxiosResponse<ServerResponse<any>>>(
			`${V2EndPoint.Payment}/get-revenue${b}`,

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
export const asyncCreateSubscription = async (
	data: IcreateSubscriptionData
): Promise<Subscription> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<Subscription>>
		>(
			`${V2EndPoint.Payment}/subscription`,
			data,

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

type VerifyPaymentResponse = {
	paymentDetails: RazorpayPayment;
};

export const asyncVerifyPayment = async (
	id: string
): Promise<RazorpayPayment> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			string,
			AxiosResponse<ServerResponse<VerifyPaymentResponse>>
		>(
			`${V2EndPoint.Payment}/verify-payment/${id}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data.paymentDetails;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
