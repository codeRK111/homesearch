import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AddPackageFormState } from '../../components/Forms/addPackage';
import { AxiosResponse } from 'axios';
import { PackageDetails } from '../../model/package.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddPackage = async (
	packageDetails: AddPackageFormState
): Promise<PackageDetails> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			AddPackageFormState,
			AxiosResponse<ServerResponse<{ package: PackageDetails }>>
		>(`${V2EndPoint.Package}/create-package`, packageDetails, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const packageData = resp.data.data;

		return packageData.package;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncGetPackages = async (): Promise<PackageDetails[]> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<{ packages: PackageDetails[] }>>
		>(`${V2EndPoint.Package}/get-packages`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const packageData = resp.data.data;

		return packageData.packages;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncGetActivePackages = async (): Promise<PackageDetails[]> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<{ packages: PackageDetails[] }>>
		>(`${V2EndPoint.Package}/get-active-packages`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const packageData = resp.data.data;

		return packageData.packages;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncGetPackageDetails = async (
	id: string
): Promise<PackageDetails> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<{ package: PackageDetails }>>
		>(`${V2EndPoint.Package}/get-package-details/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const packageData = resp.data.data;

		return packageData.package;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncUpdatePackageDetails = async (
	packageData: PackageDetails
): Promise<PackageDetails> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.patch<
			PackageDetails,
			AxiosResponse<ServerResponse<{ package: PackageDetails }>>
		>(
			`${V2EndPoint.Package}/update-package-details/${packageData.id}`,
			packageData,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return resp.data.data.package;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncSetPopularPackage = async (
	id: string,
	mostPopular: boolean
): Promise<PackageDetails> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.patch<
			PackageDetails,
			AxiosResponse<ServerResponse<PackageDetails>>
		>(
			`${V2EndPoint.Package}/set-popular/${id}`,
			{ mostPopular },
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
