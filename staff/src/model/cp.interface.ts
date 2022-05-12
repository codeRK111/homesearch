import { City } from './city.interface';

export interface ChanelPartner {
	_id: string;
	name: string;
	email: string;
	number: string;
	chanelNumber: number;
	status: 'active' | 'inactive' | 'unverified' | 'declined';
	declinedReason?: string;
	photo?: string;
	city: City;
}
