import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { ChanelPartner } from '../../model/cp.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

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
		>(`${V2EndPoint.CP}/login`, { username, password });
		const staffData = resp.data.data;
		console.log({ token: resp.data.token });
		console.log(resp.data);
		if (resp.data.token) {
			console.log({ token2: resp.data.token });
			localStorage.setItem('JWT_STAFF', resp.data.token);
		}
		return staffData.cp;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
