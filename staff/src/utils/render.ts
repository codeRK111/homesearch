import { StaffType } from '../model/staff.interface';
import dayjs from 'dayjs';

export const renderCellData = (value: any) => {
	return !!value ? value : '-';
};

export const parseDate = (date: Date | undefined) => {
	if (!date) {
		return '-';
	}
	const m = dayjs(date);
	return m.format('DD MMM YYYY hh:mm a');
};
export const renderLeadStage = (stage?: number): string => {
	switch (stage) {
		case 0:
			return 'Not Assigned';
		case 1:
			return 'Client Support';
		case 2:
			return 'Hold';
		case 3:
			return 'BDM';

		default:
			return 'Not Found';
	}
};
export const renderStaffRole = (type: StaffType): string => {
	switch (type) {
		case StaffType.AssistantSalesManager:
			return 'Assistant Sales Manager';
		case StaffType.SalesExecutive:
			return 'Sales Executive';
		case StaffType.LeadStrategist:
			return 'Lead Strategist';
		case StaffType.GM:
			return 'General Manager';
		case StaffType.BDM:
			return 'BDM';
		case StaffType.DigitalMarketing:
			return 'Digital Marketing';
		case StaffType.ClientSupport:
			return 'Client Support';
		case StaffType.Staff:
			return 'Staff';

		default:
			return 'Not Found';
	}
};
