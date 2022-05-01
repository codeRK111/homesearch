export interface GST {
	id: string;
	number: string;
	cgst: null | number;
	sgst: null | number;
	igst: null | number;
	gstNumber: number;
	createdBy: {
		id: string;
		name: string;
	};
	status: 'active' | 'inactive';
	createdAt: Date;
	updatedAt: Date;
}
