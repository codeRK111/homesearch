import { City } from './city.interface';
import { Location } from './location.interface';

export interface AddPropertyLeadData {
	name: string;
	email: string;
	number: string;
	for: 'rent' | 'sale';
	photos: Array<any>;
	propertyRequirements: string[];
	availableFor: string[];
	city: null | City;
	location: null | Location;
	minPrice: number | string;
	maxPrice: number | string;
}
