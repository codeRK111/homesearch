export interface PaymentLink {
	id: string;
	amount: number;
	phone: string;
	name: string;
	notes: string;
	paymentLinkNumber: string;
	statis: 'active' | 'inactive';
	expiryDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
