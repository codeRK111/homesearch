import dayjs from 'dayjs';

export const renderCellData = (value: any) => {
	return !!value ? value : '-';
};

export const parseDate = (date: Date | undefined) => {
	if (!date) {
		return '-';
	}
	const m = dayjs(date);
	return m.format('DD MMM YYYY hh:mm');
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
