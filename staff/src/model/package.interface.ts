export interface PackageDetails {
	id: string;
	name: string;
	actualPrice: number;
	price: number;
	packageDetails: Array<{ detail: string; detailType: 'present' | 'absent' }>;
	status: 'active' | 'inactive';
	createdAt: string;
	updatedAt: string;
	mostPopular: boolean;
	category: 'tenant' | 'builder' | 'realtor' | 'owner' | 'buyer';
}
