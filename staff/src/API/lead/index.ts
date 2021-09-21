import { APIV2, V2EndPoint, asyncError } from '../instance';
import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
	ILead,
} from './../../model/lead.interface';

import { AxiosResponse } from 'axios';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddLead = async (lead: ILead): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			ILead,
			AxiosResponse<ServerResponse<ILead>>
		>(`${V2EndPoint.Lead}`, lead, {
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

export const asyncUpdateLead = async (
	id: string,
	lead: ILead
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			ILead,
			AxiosResponse<ServerResponse<ILead>>
		>(`${V2EndPoint.Lead}/support-update/${id}`, lead, {
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
	clientSupport: string
): Promise<ILead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			ILead,
			AxiosResponse<ServerResponse<AssignSupportServerResponse>>
		>(
			`${V2EndPoint.Lead}/assign-support`,
			{ leads, clientSupport },
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
