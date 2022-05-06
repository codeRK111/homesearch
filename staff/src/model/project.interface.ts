import { Builder } from './builder.interface';
import { City } from './city.interface';
import { PLegalClearance } from './property.interface';

export interface ProjectPhase {
	name: number;
	status: 'active' | 'inactive';
}
export interface ProjectPhaseTower {
	name: string;
	docNumber: number;
	floorPlan: string;
	phase: number;
	status: 'active' | 'inactive';
	_id: string;
}

export interface Project {
	id: string;
	title: string;
	usp: string;
	bookingAmount: number;
	emi: number;
	totalLandArea: number;
	slug: string;
	description: string;
	projectType: 'flat' | 'independenthouse' | 'land';
	amenities: string[];
	legalClearance: PLegalClearance[];
	builder: Builder;
	city: City;
	location: Location;
	phases: ProjectPhase[];
	towerNames: ProjectPhaseTower[];
	photos: string[];
	virtualTours: string[];
	thumbnailImage: null | string;
	masterFloorPlan: null | string;
	geogrophicalImage: null | string;
	status: 'active' | 'inactive';
	complitionStatus: 'upcoming' | 'ongoing' | 'completed';
	lunchingDate?: Date;
}
