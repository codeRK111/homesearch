import { APIV2, V2EndPoint, asyncError } from '../instance';
import { PaymentLink, RazorpayPayment } from '../../model/payment.interface';

import { AxiosResponse } from 'axios';
import FileDownload from 'js-file-download';
import { IcreateSubscriptionData } from '../../components/Forms/createSubscription';
import { Invoice } from '../../model/invoice.interface';
import { ServerResponse } from '../../model/apiResponse.interface';
import { StaffTarget } from '../../model/staffTarget.interface';
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

export type SendProposalData = {
	proposalPackage: 'b' | 'oc' | 'custom';
	proposalPrice: number;
	propertyToBeShown: number;
	leadId: string;
};

export const asyncsendProposal = async (
	data: SendProposalData
): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			SendProposalData,
			AxiosResponse<ServerResponse<any>>
		>(
			`${V2EndPoint.Payment}/send-proposal`,
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

export interface AssignTargetData {
	targetAmount: number | string;
	incentivePercentage: number;
	year: number;
	month: number;
	staff: string;
}

export const asyncAssignTarget = async (
	data: AssignTargetData
): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			SendProposalData,
			AxiosResponse<ServerResponse<any>>
		>(
			`${V2EndPoint.Payment}/assign-target`,
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

export interface FetchTargetDetailsData {
	year: number;
	month: number;
	staff: string;
}

export const asyncFetchTargetDetails = async (
	data: FetchTargetDetailsData
): Promise<StaffTarget> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			SendProposalData,
			AxiosResponse<ServerResponse<StaffTarget>>
		>(
			`${V2EndPoint.Payment}/fetch-target-details`,
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
export const asyncsendInvoice = async (id: string): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		await APIV2.get<SendProposalData, AxiosResponse<ServerResponse<any>>>(
			`${V2EndPoint.Payment}/send-invoice/${id}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				responseType: 'blob',
			}
		);
		return { status: 'success' };
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncDownloadInvoice = async (id: string): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			SendProposalData,
			AxiosResponse<ServerResponse<any>>
		>(
			`${V2EndPoint.Payment}/admin/download-invoice/${id}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				responseType: 'blob',
			}
		);
		FileDownload(resp.data as any, 'invoice.pdf');
		return { status: 'success' };
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncCreateAndDownloadInvoice = async (
	data: any
): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			SendProposalData,
			AxiosResponse<ServerResponse<any>>
		>(
			`${V2EndPoint.Payment}/admin/create-invoice-manually`,
			data,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				responseType: 'blob',
			}
		);
		FileDownload(resp.data as any, 'invoice.pdf');
		return { status: 'success' };
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncDownloadInvoiceFromDB = async (id: string): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			SendProposalData,
			AxiosResponse<ServerResponse<any>>
		>(
			`${V2EndPoint.Payment}/admin/download-invoice-db/${id}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				responseType: 'blob',
			}
		);
		FileDownload(resp.data as any, 'invoice.pdf');
		return { status: 'success' };
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export type FetchAllInvoices = {
	invoices: Invoice[];
	totalDocs: number;
};
export const asyncGetAllInvoices = async (
	data: any
): Promise<FetchAllInvoices> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			SendProposalData,
			AxiosResponse<ServerResponse<FetchAllInvoices>>
		>(
			`${V2EndPoint.Payment}/invoice`,

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

export type UpdateInvoiceData = Omit<
	Invoice,
	'id' | 'invoiceNumber' | 'status' | 'createdAt'
>;

export const asyncupdateInvoice = async (
	id: string,
	data: UpdateInvoiceData
): Promise<Invoice> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.patch<
			SendProposalData,
			AxiosResponse<ServerResponse<{ invoice: Invoice }>>
		>(`${V2EndPoint.Payment}/invoice/${id}`, data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return resp.data.data.invoice;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
