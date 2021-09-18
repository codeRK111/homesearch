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
