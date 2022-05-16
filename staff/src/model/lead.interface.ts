import { IStaff, StaffType } from './staff.interface';

import { City } from './city.interface';
import { Ptype } from './property.interface';

export type LeadComment = {
	_id: string;
	from: IStaff;
	message: string;
	date: Date;
	reschedule: Date | null;
	status?: CommentStatus;
};
export type LeadReschedule = {
	_id: string;
	from: IStaff;
	date: Date;
	reschedule: Date;
};
export type LeadStatuses = {
	_id: string;
	from: IStaff;
	date: Date;
	value: string;
};
export type LeadAssigns = {
	_id: string;
	from: IStaff;
	to: IStaff;
	date: Date;
};

export enum LeadUserCategory {
	Tenant = 'tenant',
	Associate = 'associate',
	Buyer = 'buyer',
	Owner = 'owner',
	Realtor = 'realtor',
	Builder = 'builder',
	Unknown = 'unknown',
}
export enum CommentStatus {
	Inerested = 'interested',
	NotInterested = 'not-interested',
	CallNotReceived = 'call-not-received',
	Busy = 'busy',
	NotInService = 'not-in-service',
	SwitchOff = 'switch-off',
}

export enum LeadProposalStatus {
	Sent = 'sent',
	NotSent = 'not-sent',
	Accepted = 'accepted',
	Declined = 'declined',
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
	commentStatus?: string;
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
	proposalStatus?: LeadProposalStatus;
	tags?: string[];
	reschedules: LeadReschedule[];
	leadStatus: LeadStatuses[];
	assigns: LeadAssigns[];
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
	number?: string;
	tags?: string[];
	postedBy?: string;
	reschedule?: any;
	commentStatus?: string | CommentStatus;
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
