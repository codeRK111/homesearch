export interface Invoice {
	id: string;
	number: string;
	email?: string;
	name: string;
	amount: number;
	serviceProvidedBy: string;
	description: string;
	discount: number;
	gst: string;
	invoiceId?: number;
	date?: Date;
	paymentStatus: 'paid' | 'unpaid';
	amountAfterGST: number;
	sgstPercentage: number;
	sgstAmount: number;
	cgstPercentage: number;
	cgstAmount: number;
	igstPercentage: number;
	igstAmount: number;
	amountAfterDiscount: number;
	createdAt: Date | string;
	invoiceNumber: number;
}
