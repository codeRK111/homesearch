import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { ServerResponse } from '../../model/apiResponse.interface';
import { Subscription } from '../../model/subscription.interface';

export type FetchSubscriptionInput = {
	page: number;
	limit: number;
};
export type FetchSubscriptionResponse = {
	totalDocs: number;
	subscriptions: Array<Subscription>;
};

export const asyncFetchSubscriptions = async (
	filter: FetchSubscriptionInput
): Promise<FetchSubscriptionResponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		let a = Object.keys(filter);
		let b = '';
		a.forEach((c, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${filter[c as keyof FetchSubscriptionInput]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<FetchSubscriptionResponse>>
		>(
			`${V2EndPoint.Payment}${b}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
