import { IStaff } from './staff.interface';

export interface ILead {
	id?: string;
	name?: string;
	email?: string;
	message?: string;
	feedback?: string;
	number: string;
	attended?: boolean;
	status?: 'active' | 'inactive';
	createdAt?: Date;
	updatedAt?: Date;
	clientSupport?: IStaff;
	assignedAt?: Date;
	requirement?: 'hvp' | 'ndp';
	category?: 'sale' | 'rent' | 'project';
	pType?: 'flat' | 'land' | 'independenthouse' | 'hostel' | 'pg';
	min?: number;
	max?: number;
}

export type FetchMyLeadsResponseData = {
	leads: ILead[];
	totalDocs: number;
};
