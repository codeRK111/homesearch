import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AddGSTInputData } from '../../components/Forms/addGST';
import { AxiosResponse } from 'axios';
import { GST } from '../../model/gstModel';
import { ServerResponse } from '../../model/apiResponse.interface';
import queryString from 'query-string';

export const asyncAddGST = async (data: AddGSTInputData): Promise<GST> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			AddGSTInputData,
			AxiosResponse<ServerResponse<{ gst: GST }>>
		>(`${V2EndPoint.GST}`, data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const gstRespData = resp.data.data;

		return gstRespData.gst;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export type GetAllGSTSInputType = {
	page: number;
	limit: number;
	status?: 'active' | 'inactive';
};
export type GetAllGSTSResponseType = {
	gsts: Array<GST>;
	totalDocs: number;
};

export const asyncGetAllGSTs = async (
	data: GetAllGSTSInputType
): Promise<GetAllGSTSResponseType> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const inputString = queryString.stringify(data);

		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<GetAllGSTSResponseType>>
		>(`${V2EndPoint.GST}?${inputString}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const gstRespData = resp.data.data;

		return gstRespData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
