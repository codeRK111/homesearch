export interface StaffTarget {
	id: string;
	month: number;
	year: number;
	targetAmount: number;
	completedAmount: number;
	incentivePercentage: number;
	staff: { id: string; name: string };
}
