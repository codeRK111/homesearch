import { IStaff } from './staff.interface';
import { Ptype } from './property.interface';

export type LeadComment = {
	_id: string;
	from: IStaff;
	message: string;
	date: Date;
};

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
	requirement?: ClientRequirementType;
	category?: ClientRequirementCategory;
	pType?: Ptype;
	minPrice?: number | string;
	maxPrice?: number | string;
	comments?: Array<LeadComment>;
	hold?: boolean;
	holdDate?: Date;
	stage?: number;
	bdm?: string | IStaff | null;
	source?: LeadSource;
}

export type FetchLeadsInputType = {
	limit: number;
	page: number;
	stage?: number;
};
export type FetchMyLeadsResponseData = {
	leads: ILead[];
	totalDocs: number;
};

export enum ClientRequirementType {
	HVP = 'hvp',
	NDP = 'ndp',
}
export enum ClientRequirementCategory {
	Rent = 'rent',
	Sale = 'sale',
	Project = 'project',
}
export enum LeadSource {
	Outsource = 'outsource',
	Consultant = 'consultant',
	Staff = 'staff',
	SocialMedia = 'socialMedia',
	Website = 'website',
}
