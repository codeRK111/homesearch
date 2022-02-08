import { APIV2, V2EndPoint, asyncError } from '../instance';
import {
	FetchTestimonialResponseData,
	ITestimonial,
} from '../../model/testimonial';

import { AxiosResponse } from 'axios';
import { IAddTestimonialData } from '../../components/Forms/addTestimonial';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddTestimonial = async (
	lead: IAddTestimonialData
): Promise<ITestimonial> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		for (const key in lead) {
			if (Object.prototype.hasOwnProperty.call(lead, key)) {
				const element = lead[key as keyof IAddTestimonialData];
				if (typeof element === 'string') {
					formData.append(key, `${element}`);
				} else if (element) {
					formData.append(key, element);
				}
			}
		}

		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<ITestimonial>>
		>(`${V2EndPoint.Testimonial}`, formData, {
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
	status: null | ITestimonial['status'];
	date?: string;
}

export const asyncFetchTestimonial = async (
	filters: fetchStrategiesFilter
): Promise<FetchTestimonialResponseData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let url = `${V2EndPoint.Testimonial}`;
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
			AxiosResponse<ServerResponse<FetchTestimonialResponseData>>
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

export interface IUpdateTestimonialData {
	id: string;
	name?: string;
	description?: string;
	photo?: string | File;
}

export const asyncUpdateTestimonial = async (
	lead: IUpdateTestimonialData
): Promise<ITestimonial> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		for (const key in lead) {
			if (Object.prototype.hasOwnProperty.call(lead, key)) {
				const element = lead[key as keyof IUpdateTestimonialData];
				if (typeof element === 'string') {
					formData.append(key, `${element}`);
				} else if (element) {
					formData.append(key, element);
				}
			}
		}

		const resp = await APIV2.patch<
			any,
			AxiosResponse<ServerResponse<ITestimonial>>
		>(`${V2EndPoint.Testimonial}/${lead.id}`, formData, {
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

export const asyncDeleteTestimonial = async (leadId: string): Promise<null> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		await APIV2.delete<any, AxiosResponse<ServerResponse<null>>>(
			`${V2EndPoint.Testimonial}/${leadId}`,
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
