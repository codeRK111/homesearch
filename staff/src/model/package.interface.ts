import { GST } from './gstModel';

export type PackageBenifit = {
	detail: string;
	detailType: 'present' | 'absent';
};

export interface PackageDetails {
	id: string;
	name: string;
	actualPrice: number;
	price: number;
	packageDetails: Array<PackageBenifit>;
	status: 'active' | 'inactive';
	createdAt: string;
	updatedAt: string;
	mostPopular: boolean;
	category: 'tenant' | 'builder' | 'realtor' | 'owner' | 'buyer';
	gst: null | GST;
}
