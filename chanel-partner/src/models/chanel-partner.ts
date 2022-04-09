import { City } from './city';

export interface ChanelPartner {
	_id: string;
	name: string;
	email: string;
	number: string;
	chanelNumber: number;
	photo: string;
	city: City;
}
