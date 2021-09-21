import { APIV2, V2EndPoint, asyncError } from '../instance';
import {
	DashboardData,
	ServerResponse,
} from '../../model/apiResponse.interface';

import { AxiosResponse } from 'axios';

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
