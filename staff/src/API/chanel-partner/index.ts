import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { ChanelPartner } from '../../model/cp.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncFetchCpInfo = async (): Promise<ChanelPartner> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<{ cp: ChanelPartner }>>
		>(`${V2EndPoint.CP}/getCpInfo`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data.cp;
		return staffData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

type LoginType = {
	username: string;
	password: string;
};
type LoginResponseData = {
	cp: ChanelPartner;
};
export const asyncCPLogIn = async (
	username: string,
	password: string
): Promise<ChanelPartner> => {
	try {
		const resp = await APIV2.post<
			LoginType,
			AxiosResponse<ServerResponse<LoginResponseData>>
		>(`${V2EndPoint.CP}/login`, { email: username, password });
		const staffData = resp.data.data;
		console.log({ token: resp.data.token });
		console.log(resp.data);
		if (resp.data.token) {
			console.log({ token2: resp.data.token });
			localStorage.setItem('JWT_CP', resp.data.token);
			localStorage.removeItem('JWT_STAFF');
		}
		return staffData.cp;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
