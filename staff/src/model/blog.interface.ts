import { IStaff } from './staff.interface';

export interface Blog {
	id?: string;
	title?: string;
	shortDesc?: string;
	description?: string;
	tags?: string[];
	slug?: string;
	views?: number;
	admin?: string | IStaff;
	status?: 'active' | 'inactive';
	photo?: string;
	createdAt?: Date;
	updatedAtAt?: Date;
}
