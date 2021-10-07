import { APIV2, V2EndPoint, asyncError } from '../instance';
import { AxiosResponse, CancelTokenSource } from 'axios';
import {
	FetchAdminResponse,
	IStaff,
	StaffType,
} from './../../model/staff.interface';

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
	type?: StaffType;
	types?: StaffType[];
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

export interface IMyTarget {
	leadTarget: number;
	completeLeadTarget: number;
	dealTarget: number;
	completeDealTarget: number;
}

export const asyncGetMyTargets = async (
	setLoading: (val: boolean) => void,
	cancelToken: CancelTokenSource
): Promise<IMyTarget> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		setLoading(true);

		const resp = await APIV2.get<
			unknown,
			AxiosResponse<ServerResponse<IMyTarget>>
		>(`${V2EndPoint.Admin}/targets`, {
			cancelToken: cancelToken.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const staffData = resp.data.data;
		setLoading(false);
		return staffData;
	} catch (e: any) {
		setLoading(false);
		throw new Error(asyncError(e));
	}
};
