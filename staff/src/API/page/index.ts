import { APIV2, V2EndPoint, asyncError } from '../instance';
import { Amenity, Furnish } from '../../model/util';
import {
	DashboardData,
	ServerResponse,
} from '../../model/apiResponse.interface';

import { AxiosResponse } from 'axios';
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
