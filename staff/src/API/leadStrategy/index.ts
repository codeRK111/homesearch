import { APIV2, V2EndPoint, asyncError } from '../instance';
import {
	FetchMyLeadStrategiesResponseData,
	ILeadStrategy,
} from '../../model/leadStrategy';

import { AxiosResponse } from 'axios';
import { IAddLeadStrategyData } from '../../components/Forms/addLeadStrategy';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddLeadStrategy = async (
	lead: IAddLeadStrategyData
): Promise<ILeadStrategy> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		for (const key in lead) {
			if (Object.prototype.hasOwnProperty.call(lead, key)) {
				const element = lead[key as keyof IAddLeadStrategyData];
				if (typeof element === 'string') {
					formData.append(key, `${element}`);
				} else if (element) {
					formData.append(key, element);
				}
			}
		}

		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<ILeadStrategy>>
		>(`${V2EndPoint.LeadStrategy}`, formData, {
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

export interface fetchStrategiesFilter {
	page: number;
	limit: number;
	status: null | ILeadStrategy['status'];
	date?: string;
}

export const asyncFetchMyStrategies = async (
	filters: fetchStrategiesFilter
): Promise<FetchMyLeadStrategiesResponseData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let url = `${V2EndPoint.LeadStrategy}`;
		let a = Object.keys(filters);
		let b = '';
		a.forEach((c: any, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${filters[c as keyof fetchStrategiesFilter]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<FetchMyLeadStrategiesResponseData>>
		>(
			`${url}${b}`,

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

export interface IUpdateLeadStrategyData {
	id: string;
	url?: string;
	description?: string;
	photo?: string | File;
}

export const asyncUpdateLeadStrategy = async (
	lead: IUpdateLeadStrategyData
): Promise<ILeadStrategy> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		for (const key in lead) {
			if (Object.prototype.hasOwnProperty.call(lead, key)) {
				const element = lead[key as keyof IUpdateLeadStrategyData];
				if (typeof element === 'string') {
					formData.append(key, `${element}`);
				} else if (element) {
					formData.append(key, element);
				}
			}
		}

		const resp = await APIV2.patch<
			any,
			AxiosResponse<ServerResponse<ILeadStrategy>>
		>(`${V2EndPoint.LeadStrategy}/${lead.id}`, formData, {
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

export const asyncDeleteLeadStrategy = async (
	leadId: string
): Promise<null> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		await APIV2.delete<any, AxiosResponse<ServerResponse<null>>>(
			`${V2EndPoint.LeadStrategy}/${leadId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return null;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
