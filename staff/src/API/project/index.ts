import { APIV2, V2EndPoint, asyncError } from '../instance';

import { AppException } from '../error';
import { AxiosResponse } from 'axios';
import { Project } from '../../model/project.interface';
import { ServerResponse } from '../../model/apiResponse.interface';

export const asyncAddProjectBasicInfo = async (data: any): Promise<Project> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.post<
			any,
			AxiosResponse<ServerResponse<{ project: Project }>>
		>(`${V2EndPoint.Project}`, data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
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

export type HandleProjectImageInput = {
	thumbnailImage?: File;
	masterFloorPlan?: File;
	geogrophicalImage?: File;
	photos?: File[];
};

export const asyncUpdateProjectPhoto = async (
	imageData: HandleProjectImageInput,
	id: string
): Promise<Project> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const formData = new FormData();
		if (imageData.thumbnailImage) {
			formData.append('thumbnailImage', imageData.thumbnailImage);
		}
		if (imageData.masterFloorPlan) {
			formData.append('masterFloorPlan', imageData.masterFloorPlan);
		}
		if (imageData.geogrophicalImage) {
			formData.append('geogrophicalImage', imageData.geogrophicalImage);
		}
		if (imageData.photos) {
			imageData.photos.forEach((c) => {
				formData.append('photos', c);
			});
		}
		const resp = await APIV2.patch<
			any,
			AxiosResponse<ServerResponse<{ project: Project }>>
		>(`${V2EndPoint.Project}/upload-photos/${id}`, formData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		return resp.data.data.project;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};

export const asyncUpdateProjectTower = async (
	towers: { name: string }[],
	id: string
): Promise<Project> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.patch<
			any,
			AxiosResponse<ServerResponse<{ project: Project }>>
		>(
			`${V2EndPoint.Project}/handle-towers/${id}`,
			{ towerNames: towers },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return resp.data.data.project;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};

export type AsyncGetProjectDetailsTesponse = {
	project: Project;
	properties: any[];
};

export const asyncGetProjectDetails = async (
	id: string
): Promise<AsyncGetProjectDetailsTesponse> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');

		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<AsyncGetProjectDetailsTesponse>>
		>(`${V2EndPoint.Project}/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		return resp.data.data;
	} catch (error: any) {
		throw new Error(asyncError(error));
	}
};
