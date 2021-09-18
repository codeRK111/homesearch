import { APIV2, V2EndPoint, asyncError } from '../instance';
import { FetchMyLeadsResponseData, ILead } from './../../model/lead.interface';

import { AxiosResponse } from 'axios';
import { ServerResponse } from '../../model/apiResponse.interface';

const token = localStorage.getItem('JWT_STAFF');

export const asyncAddLead = async (lead: ILead): Promise<ILead> => { 
	try {
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

type InputType = {
	limit: number;
	page: number;
};

export const asyncFetchMyLeads = async (
	page: number,
	limit: number
): Promise<FetchMyLeadsResponseData> => {
	try {
		const resp = await APIV2.post<
			InputType,
			AxiosResponse<ServerResponse<FetchMyLeadsResponseData>>
		>(
			`${V2EndPoint.Lead}/get-assigned-leads`,
			{ page, limit },
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
