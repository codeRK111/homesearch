import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { ServerResponse } from '../../model/apiResponse.interface';
import { UserQuery } from '../../model/userQuery.interface';

export interface FetchUserQueriesFilter {
	page: number;
	limit: number;
	date?: string;
}

export interface FetchUserQueriesResponseData {
	contacts: UserQuery[];
	totalDocs: number;
}

export const asyncFetchQueries = async (
	filters: FetchUserQueriesFilter
): Promise<FetchUserQueriesResponseData> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let url = `${V2EndPoint.UserContact}`;
		let a = Object.keys(filters);
		let b = '';
		a.forEach((c: any, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${filters[c as keyof FetchUserQueriesFilter]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<FetchUserQueriesResponseData>>
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
