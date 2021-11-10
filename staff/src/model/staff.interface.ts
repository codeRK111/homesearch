export interface IStaff {
	id?: string;
	name: string;
	number: string;
	username: string;
	email: string;
	photo?: string;
	type: StaffType;
}

export enum StaffType {
	Staff = 'staff',
	ClientSupport = 'clientSupport',
	DigitalMarketing = 'digitalMarketing',
	BDM = 'bdm',
	GM = 'gm',
	LeadStrategist = 'leadStrategist',
	SalesExecutive = 'salesExecutive',
	AssistantSalesManager = 'assistantSalesManager',
	Accountant = 'accountant',
	SuperAdmin = 'super-admin',
}

export type FetchAdminResponse = {
	totalDocs: number;
	admins: IStaff[];
};
