import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { Builder } from '../../model/builder.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

export type FetchBuildersResponseType = {
	builders: Array<Builder>;
	totalDocs: number;
};
export type FetchBuildersRequestPayload = {
	page: number;
	limit: number;
	developerName?: string;
	email?: string;
	phoneNumber?: string;
	city?: string;
	status?: 'active' | 'inactive';
};

export const fetchBuilders = async (
	data: FetchBuildersRequestPayload
): Promise<FetchBuildersResponseType> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp: AxiosResponse<ServerResponse<FetchBuildersResponseType>> =
			await APIV2({
				url: `${V2EndPoint.Builder}/get-all`,
				method: 'post',
				data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		return resp.data.data;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};
