import { APIV2, V2EndPoint, asyncError } from '../instance';
import { AxiosResponse, CancelTokenSource } from 'axios';
import {
	CommentStatus,
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
	ILead,
} from './../../model/lead.interface';

import { PropertyLead } from '../../model/propertyLead.interface';
import { ServerResponse } from '../../model/apiResponse.interface';
import { StaffType } from '../../model/staff.interface';

export const asyncAddLead = async (
	lead: ILead,
	images?: any
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		for (const key in lead) {
			if (Object.prototype.hasOwnProperty.call(lead, key)) {
				const element = lead[key as keyof ILead];
				if (key === 'propertyRequirements' || key === 'tags') {
					const c = element as string[];
					c.forEach((b) => {
						formData.append(key, `${b}`);
					});
				} else {
					formData.append(key, `${element}`);
				}
			}
		}
		console.log(images);
		if (images) {
			images.forEach((c: any) => {
				formData.append('images', c);
			});
		}
		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<ILead>>
		>(`${V2EndPoint.Lead}`, formData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

// Get all the leads assigned to the specific user

export const asyncFetchMyLeads = async (
	filters: FetchLeadsInputType
): Promise<FetchMyLeadsResponseData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		console.log({ myToken: token });
		const resp = await APIV2.post<
			FetchLeadsInputType,
			AxiosResponse<ServerResponse<FetchMyLeadsResponseData>>
		>(
			`${V2EndPoint.Lead}/get-assigned-leads`,
			{ ...filters },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = resp.data.data;

		return data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export interface BrowseLeadInputType extends FetchLeadsInputType {
	city?: string;
	location?: string;
	propertyRequirements?: string[];
}

export const asyncBrowseLeads = async (
	filters: BrowseLeadInputType
): Promise<FetchMyLeadsResponseData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		console.log({ myToken: token });
		const resp = await APIV2.post<
			FetchLeadsInputType,
			AxiosResponse<ServerResponse<FetchMyLeadsResponseData>>
		>(
			`${V2EndPoint.Lead}/browse-leads`,
			{ ...filters },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = resp.data.data;

		return data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncFetchMyPostedLeads = async (
	filters: FetchLeadsInputType,

	cancelToken: CancelTokenSource
): Promise<FetchMyLeadsResponseData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			FetchLeadsInputType,
			AxiosResponse<ServerResponse<FetchMyLeadsResponseData>>
		>(
			`${V2EndPoint.Lead}/get-posted-leads`,
			{ ...filters },
			{
				cancelToken: cancelToken.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = resp.data.data;

		return data;
	} catch (e: any) {
		console.log(e);
		throw new Error(asyncError(e));
	}
};

interface FetchMyLeadDetailsData {
	lead: ILead;
}

export const asyncGetLeadDetails = async (id: string): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<FetchMyLeadDetailsData>>
		>(
			`${V2EndPoint.Lead}/${id}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = resp.data.data;

		return data.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export interface UpdateLeadData
	extends Omit<ILead, 'reschedules' | 'leadStatus' | 'assigns'> {
	reschedule?: null | Date;
	commentStatus?: CommentStatus;
}

export const asyncUpdateLead = async (
	id: string,
	lead: UpdateLeadData
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			ILead,
			AxiosResponse<ServerResponse<{ lead: ILead }>>
		>(`${V2EndPoint.Lead}/support-update/${id}`, lead, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncAddLeadMessage = async (
	id: string,
	message: string
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			ILead,
			AxiosResponse<ServerResponse<{ lead: ILead }>>
		>(
			`${V2EndPoint.Lead}/support-update/${id}`,
			{ message },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncRescheduleLead = async (
	id: string,
	reschedule: Date
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			ILead,
			AxiosResponse<ServerResponse<{ lead: ILead }>>
		>(
			`${V2EndPoint.Lead}/manage-reschedule/${id}`,
			{ reschedule },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncManageStatusLead = async (
	id: string,
	status: string
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			ILead,
			AxiosResponse<ServerResponse<{ lead: ILead }>>
		>(
			`${V2EndPoint.Lead}/manage-status/${id}`,
			{ status },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncManageAssignLead = async (
	id: string,
	staff: string
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			ILead,
			AxiosResponse<ServerResponse<{ lead: ILead }>>
		>(
			`${V2EndPoint.Lead}/manage-assign/${id}`,
			{ staff },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncDeleteLead = async (id: string): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.delete<
			any,
			AxiosResponse<ServerResponse<ILead>>
		>(`${V2EndPoint.Lead}/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
type CloseLeadData = {
	revenue: number;
	revenueFeedback: string;
};
export const asyncCloseLead = async (
	id: string,
	inputData: CloseLeadData
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			CloseLeadData,
			AxiosResponse<ServerResponse<ILead>>
		>(`${V2EndPoint.Lead}/close-deal/${id}`, inputData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

type AssignSupportServerResponse = {
	lead: ILead;
};
export const asyncAssignSupport = async (
	leads: string[],
	clientSupport: string,
	staffType: StaffType
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			ILead,
			AxiosResponse<ServerResponse<AssignSupportServerResponse>>
		>(
			`${V2EndPoint.Lead}/assign-support`,
			{ leads, id: clientSupport, staffType },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.lead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export type GMLeadCounts = {
	Tenant: number;
	Associate: number;
	Buyer: number;
	Owner: number;
	Realtor: number;
	Builder: number;
	Unknown: number;
	Active: number;
	Inactive: number;
};

export const asyncGetGMLeadCounts = async (
	setLoading: (val: boolean) => void,
	cancelToken: CancelTokenSource
): Promise<GMLeadCounts[]> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		setLoading(true);

		const resp = await APIV2.get<
			unknown,
			AxiosResponse<ServerResponse<GMLeadCounts[]>>
		>(`${V2EndPoint.Lead}/gm-lead-count`, {
			cancelToken: cancelToken.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;
		setLoading(false);
		return staffData;
	} catch (e: any) {
		setLoading(false);
		throw new Error(asyncError(e));
	}
};

export type SearchAllResponse = {
	leads: Array<ILead>;
	sales: Array<PropertyLead>;
	totalLeadDocs: number;
	totalSalesDocs: number;
};

export const searchAll = async (input: any): Promise<SearchAllResponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			unknown,
			AxiosResponse<ServerResponse<SearchAllResponse>>
		>(`${V2EndPoint.Lead}/search-all`, input, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;

		return staffData;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};

type GetPropertyLeadDetailsResponse = {
	propertyLead: PropertyLead;
};
export const getPropertyLeadDetails = async (
	id: string
): Promise<PropertyLead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.get<
			unknown,
			AxiosResponse<ServerResponse<GetPropertyLeadDetailsResponse>>
		>(`${V2EndPoint.Lead}/property-lead/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;

		return staffData.propertyLead;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};
export const updatePropertyLeadDetails = async (
	id: string,
	inputData: any
): Promise<PropertyLead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			unknown,
			AxiosResponse<ServerResponse<GetPropertyLeadDetailsResponse>>
		>(`${V2EndPoint.Lead}/property-lead/${id}`, inputData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;

		return staffData.propertyLead;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};

type CheckNumberResponse = {
	exists: boolean;
};
export const asyncCheckNumber = async (
	number: string
): Promise<CheckNumberResponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.get<
			unknown,
			AxiosResponse<ServerResponse<CheckNumberResponse>>
		>(`${V2EndPoint.Lead}/check-number/${number}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;

		return staffData;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};
