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
}

export type FetchAdminResponse = {
	totalDocs: number;
	admins: IStaff[];
};
