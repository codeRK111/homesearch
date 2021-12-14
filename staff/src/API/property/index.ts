import { APIV1, APIV2, V1EndPoint, V2EndPoint, asyncError } from '../instance';
import { Property, RentProperty } from './../../model/property.interface';

import { AxiosResponse } from 'axios';
import { PropertyLead } from '../../model/propertyLead.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

export interface AddPropertyResponse {
	property: Property;
}
export const asyncAddPropertyRent = async (
	propertyData: any
): Promise<Property> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<AddPropertyResponse>>
		>(
			`${V2EndPoint.Property}/homesearch/post-property-rent`,
			propertyData,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.property;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export interface FetchPropertyResponse {
	properties: Array<Property & RentProperty>;
}
export interface FetchPropertyResult {
	properties: Array<Property & RentProperty>;
	totalDocs: number;
}
export const asyncFetchProperties = async (
	param: any
): Promise<FetchPropertyResult> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let a = Object.keys(param);
		let b = '';
		a.forEach((c, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${param[c]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await APIV1.get<
			any,
			AxiosResponse<ServerResponse<FetchPropertyResponse>>
		>(
			`${V1EndPoint.Property}${b}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return {
			properties: leadData.properties,
			totalDocs: resp.data.count as number,
		};
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncAddPropertyImage = async (
	id: string,
	photos: any[],
	defaultPhoto: any
): Promise<Property> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		photos.forEach((c) => {
			formData.append('images', c);
		});
		formData.append('default', defaultPhoto);
		const resp = await APIV1.post<any, AxiosResponse<ServerResponse<any>>>(
			`${V1EndPoint.Property}/add-property-image/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

// Lead
export interface AddPropertyLeadResponse {
	propertyLead: PropertyLead;
}
export const asyncAddPropertyLead = async (
	propertyData: any
): Promise<PropertyLead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<AddPropertyLeadResponse>>
		>(`${V2EndPoint.Property}/property-lead`, propertyData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData.propertyLead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export const asyncPostFromLead = async (
	propertyData: any
): Promise<PropertyLead> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<any, AxiosResponse<ServerResponse<any>>>(
			`${V2EndPoint.Property}/admin/post-from-lead`,
			propertyData,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.property;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
export interface AddPropertyLeadResponse {
	propertyLead: PropertyLead;
}
export const asyncAddPropertyLeadPhoto = async (
	id: string,
	photo: any
): Promise<PropertyLead> => {
	try {
		const formData = new FormData();
		formData.append('photo', photo);
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			any,
			AxiosResponse<ServerResponse<AddPropertyLeadResponse>>
		>(`${V2EndPoint.Property}/property-lead/image/${id}`, formData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData.propertyLead;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
