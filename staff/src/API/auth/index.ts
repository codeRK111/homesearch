import { APIV2, V2EndPoint, asyncError } from '../instance';
import {
	FetchAdminResponse,
	IStaff,
	StaffType,
} from './../../model/staff.interface';

import { AxiosResponse } from 'axios';
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
		console.log({ token: resp.data.token });
		console.log(resp.data);
		if (resp.data.token) {
			console.log({ token2: resp.data.token });
			localStorage.setItem('JWT_STAFF', resp.data.token);
		}
		return staffData.admin;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

type FetchAdminInputType = {
	status?: 'active' | 'inactive';
	type: StaffType;
};
export const asyncFetchAdmins = async (
	filter: FetchAdminInputType
): Promise<FetchAdminResponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<
			FetchAdminInputType,
			AxiosResponse<ServerResponse<FetchAdminResponse>>
		>(`${V2EndPoint.Admin}`, filter, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;

		return staffData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncLogout = async (): Promise<null> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.get<
			unknown,
			AxiosResponse<ServerResponse<null>>
		>(`${V2EndPoint.Admin}/logout`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;

		return staffData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
