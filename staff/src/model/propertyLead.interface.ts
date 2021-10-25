import { Amenity } from './util';
import { City } from './city.interface';
import { IStaff } from './staff.interface';
import { Location } from './location.interface';
import { PFacing } from './property.interface';

export interface AddPropertyLeadData {
	name: string;
	email: string;
	number: string;
	for: 'rent' | 'sale';
	photos: Array<any>;
	propertyRequirements: string[];
	amenities?: string[];
	availableFor?: string[];
	city: null | City;
	location: null | Location;
	minPrice: number | string;
	maxPrice: number | string;
	maintainanceFee?: number | string;
	petAllowed?: BooleanValue;
	facing: PFacing;
	floor?: number | string;
	propertyOnFloor?: number | string;
	superBuiltupArea?: number | string;
	carpetArea?: number | string;
}

export enum BooleanValue {
	True = 1,
	False = 0,
}

export interface PropertyLead {
	id: string;
	name: string;
	email: string;
	number: string;
	for: 'rent' | 'sale';
	photos: Array<any>;
	propertyRequirements: string[];
	amenities: Amenity[];
	availableFor: string[];
	city: City;
	location: Location;
	minPrice: number;
	maxPrice: number;
	lat: number;
	lng: number;
	maintainanceFee: number;
	petAllowed: BooleanValue;
	facing: PFacing;
	floor: number;
	propertyOnFloor: string;
	superBuiltupArea: number;
	carpetArea: number;
	createdBy: IStaff;
	status: 'active' | 'inactive';
	createdAt: Date;
	updatedAt: Date;
}
