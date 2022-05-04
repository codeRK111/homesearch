import { APIV2, V2EndPoint, asyncError } from '../instance';
import { Amenity, Furnish } from '../../model/util';
import {
	DashboardData,
	ServerResponse,
} from '../../model/apiResponse.interface';

import { AxiosResponse } from 'axios';
import { Builder } from '../../model/builder.interface';
import { PLegalClearance } from './../../model/property.interface';

export const asyncGetDashboardContent = async (): Promise<DashboardData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.get<
			unknown,
			AxiosResponse<ServerResponse<DashboardData>>
		>(`${V2EndPoint.Page}/admin/workspace`, {
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

export interface AddPropertyPageResponse {
	amenities: Amenity[];
	furnishes: Furnish[];
	legalClearancesForLand: PLegalClearance[];
	legalClearances: PLegalClearance[];
}
export const asyncGetAddPropertyPageResources =
	async (): Promise<AddPropertyPageResponse> => {
		try {
			const token = localStorage.getItem('JWT_STAFF');
			const resp = await APIV2.get<
				unknown,
				AxiosResponse<ServerResponse<AddPropertyPageResponse>>
			>(`${V2EndPoint.Page}/property/add-property`, {
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

export interface AddProjectPageResponse {
	amenities: Amenity[];
	furnishes: Furnish[];
	legalClearancesForLand: PLegalClearance[];
	legalClearances: PLegalClearance[];
	builders: Builder[];
}
export const asyncGetAddProjectPageResources =
	async (): Promise<AddProjectPageResponse> => {
		try {
			const token = localStorage.getItem('JWT_STAFF');
			const resp = await APIV2.get<
				unknown,
				AxiosResponse<ServerResponse<AddProjectPageResponse>>
			>(`${V2EndPoint.Page}/project/add-project`, {
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
