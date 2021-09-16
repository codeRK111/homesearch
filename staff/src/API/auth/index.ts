import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { IStaff } from '../../model/staff.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

type LoginType = {
	username: string;
	password: string;
};
type LoginResponseData = {
	admin: IStaff;
};
export const asyncLogIn = async (
	username: string,
	password: string
): Promise<IStaff> => {
	try {
		const resp = await APIV2.post<
			LoginType,
			AxiosResponse<ServerResponse<LoginResponseData>>
		>(`${V2EndPoint.Staff}/login`, { username, password });
		const staffData = resp.data.data;
		if (resp.data.token) {
			localStorage.setItem('JWT_STAFF', resp.data.token);
		}
		return staffData.admin;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
