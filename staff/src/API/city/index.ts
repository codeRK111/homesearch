import { APIV1, V1EndPoint, asyncError } from '../instance';

import { AxiosResponse } from 'axios';
import { City } from '../../model/city.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

type FetchCityResponseTYpe = {
	cities: City[];
};

export const asyncSearchCity = async (name: string): Promise<City[]> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV1.post<
			any,
			AxiosResponse<ServerResponse<FetchCityResponseTYpe>>
		>(
			`${V1EndPoint.City}/searchCity`,
			{ name },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData.cities;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
