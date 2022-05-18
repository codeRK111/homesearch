export interface UserQuery {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	message?: string;
	createdAt: string | Date;
	verified: boolean;
}
