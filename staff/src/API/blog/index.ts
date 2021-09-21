import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { Blog } from './../../model/blog.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddBlog = async (lead: any): Promise<Blog> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<any, AxiosResponse<ServerResponse<Blog>>>(
			`${V2EndPoint.Blog}`,
			lead,
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
