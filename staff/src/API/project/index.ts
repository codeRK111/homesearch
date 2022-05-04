import { APIV2, V2EndPoint } from '../instance';

import { AppException } from '../error';
import { AxiosResponse } from 'axios';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddProjectBasicInfo = async (data: any): Promise<any> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<any, AxiosResponse<ServerResponse<any>>>(
			`${V2EndPoint.Project}`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const projectData = resp.data.data.project;

		return projectData;
	} catch (error: any) {
		console.log({ error });
		let message = '';
		let validation = false;
		let validationFields = [];
		if (!!error.response) {
			if (error.response.data.validationError) {
				validation = true;
				validationFields = error.response.data.errors;
				message = 'Invalid input fields';
			} else {
				validation = false;
				validationFields = [];
				message = error.response.data.message;
			}
		} else {
			validation = false;
			validationFields = [];
			message = error.message;
		}
		throw new AppException(message, validation, validationFields);
	}
};
