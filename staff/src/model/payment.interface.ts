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

export interface RazorpayPayment {
	id: string;
	amount: number;
	currency: 'INR';
	status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
	order_id: string;
	method: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
	email: string;
	contact: string;
	description: string;
	created_at: number;
}
