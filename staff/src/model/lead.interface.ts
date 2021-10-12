import { IStaff, StaffType } from './staff.interface';

import { City } from './city.interface';
import { Ptype } from './property.interface';

export type LeadComment = {
	_id: string;
	from: IStaff;
	message: string;
	date: Date;
	reschedule: Date | null;
};

export enum LeadUserCategory {
	Tenant = 'tenant',
	Buyer = 'buyer',
	Owner = 'owner',
	Realtor = 'realtor',
	Builder = 'builder',
	Unknown = 'unknown',
}

export interface ILead {
	id?: string;
	city?: null | City | string;
	name?: string;
	email?: string;
	message?: string;
	feedback?: string;
	number: string;
	attended?: boolean;
	status?: 'active' | 'inactive';
	createdAt?: Date | string;
	updatedAt?: Date;
	clientSupport?: IStaff;
	createdBy?: IStaff;
	assignedAt?: Date;
	requirement?: ClientRequirementType;
	category?: ClientRequirementCategory;
	pType?: Ptype;
	minPrice?: number | string;
	maxPrice?: number | string;
	comments?: Array<LeadComment>;
	hold?: boolean;
	holdDate?: Date;
	saleAssignedAt?: Date;
	saleExecutiveAssignedAt?: Date;
	stage?: number;
	bdm?: string | IStaff | null;
	executive?: string | IStaff | null;
	source?: LeadSource;
	images?: Array<string>;
	preferedLocation?: string;
	userCategory?: LeadUserCategory;
	propertyRequirements?: string[];
	saleStaffType?: StaffType;
	notInterested?: boolean;
	postProperty?: boolean;
}

export type FetchLeadsInputType = {
	userCategory?: null | string;
	preferedLocation?: string;
	timeInterval?: null | string;
	leadStatus?: null | string;
	limit: number;
	page: number;
	stage?: number;
	city?: string;
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
	Homesearch = 'homesearch',
}
