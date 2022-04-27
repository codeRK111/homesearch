import { City } from './city.interface';

export interface Builder {
	id: string;
	developerName: string;
	description: string;
	officeAddress: string;
	corporateOfficeAddress: string;
	cin?: string;
	rera?: string;
	phoneNumber: string;
	email: string;
	operatingSince: Date;
	createdAt: Date;
	cities: Array<City>;
	totalProjects: number;
	underConstructionProjects: number;
	completedProjects: number;
	logo: string;
	teamPhoto: string;
	photos: Array<{
		image: string;
		primary: boolean;
	}>;
	directors: Array<{
		image: string;
		name: string;
	}>;
	status: 'active' | 'inactive';
	slug: string;
}
