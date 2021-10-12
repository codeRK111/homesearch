export enum Ptype {
	Apartment = 'flat',
	Villa = 'independenthouse',
	GuestHouse = 'guestHouse',
	Land = 'land',
	Hostel = 'hostel',
	PG = 'pg',
}
export enum POwnership {
	Freehold = 'freehold',
	Leashed = 'leashed',
}
export enum PCarParking {
	Open = 'open',
	Covered = 'covered',
}
export enum PTransactionType {
	NewBooking = 'newbooking',
	Resale = 'resale',
}
export enum LegalClearance {
	ApprovalOfBuilding = 'approvalOfBuilding',
	NOCFromFireDepts = 'nocFromFireDepts',
	ElectricityConnUse = 'electricityConnUse',
	StructuralStatbilityCertificate = 'StructuralStatbilityCertificate',
	NOCFromPollutionDepts = 'nocFromPollutionDepts',
	FunctionalCertificate = 'functionalCertificate',
	HoldingTax = 'holdingTax',
	CompletionCertificate = 'completionCertificate',
	RERAapproved = 'reraapproved',
	NumberOfOwner = 'numberOfOwner',
	WithinBlockArea = 'withinBlockArea',
	ApprovedByDevelopmentAutority = 'approvedByDevelopmentAutority',
	WithinAreaOfDevelopmentAuthrity = 'withinAreaOfDevelopmentAuthrity',
}

export type PLegalClearance = {
	name: LegalClearance;
	label: string;
	details: string;
	value: string;
};

export enum PFacing {
	East = 'east',
	West = 'west',
	North = 'north',
	South = 'south',
}
export enum PLandUsingZoning {
	Yellow = 'yellow',
}
export enum PTypeOfToilets {
	Attached = 'Attached',
	Common = 'Common',
}
export type PToiletType = {
	toiletType: 'indian' | 'western';
	numbers: number;
};

export enum PFurnishingType {
	Unfurnished = 'unfurnished',
	Furnished = 'furnished',
	Semifurnished = 'semifurnished',
}
export enum PFooding {
	Veg = 'veg',
	NonVeg = 'nonveg',
	None = 'none',
	Both = 'both',
}
export enum PFoodSchedule {
	BedTea = 'bedtea',
	Breakfast = 'breakfast',
	Lunch = 'lunch',
	EvengSnacks = 'evngsnacks',
	Dinner = 'dinner',
}
export enum PAvailability {
	Immediately = 'immediately',
	Specificdate = 'specificdate',
}
export enum PStatus {
	Active = 'active',
	Expired = 'expired',
	UnderScreening = 'underScreening',
}

interface Property {
	id: string;
	for: 'rent' | 'sale';
	title: string;
	usp: string;
}

interface AddPropertyData {
	for: 'rent' | 'sale';
	title: string;
	usp: string;
	sale_type?: Array<Ptype>;
}
