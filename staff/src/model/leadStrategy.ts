import { IStaff } from './staff.interface';

export interface ILeadStrategy {
	id: string;
	url: string;
	description: string;
	photo: string;
	status: 'active' | 'inactive';
	createdAt: Date;
	updatedAt: Date;
	docNumber: number;
	docID: string;
	staff: IStaff;
}

export type FetchMyLeadStrategiesResponseData = {
	leads: ILeadStrategy[];
	totalDocs: number;
};
