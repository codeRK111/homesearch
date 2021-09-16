export interface IStaff {
	id?: string;
	name: string;
	number: string;
	username: string;
	email: string;
	photo?: string;
	type: 'staff' | 'clientSupport' | 'digitalMarketing';
}
