import { IStaff, StaffType } from './../model/staff.interface';

import { ILead } from '../model/lead.interface';
import { PackageDetails } from '../model/package.interface';
import { SubscriptionPackageType } from '../model/subscription.interface';
import dayjs from 'dayjs';

export const renderCellData = (value: any) => {
	return !!value ? value : '-';
};
export const toHumanReadable = (value: number) => {
	return !!value
		? Number(value).toLocaleString('en-IN', {
				style: 'currency',
				currency: 'INR',
				minimumFractionDigits: 0,
		  })
		: '-';
};

export const isToday = (date: any) => {
	return dayjs().isSame(dayjs.unix(Date.parse(date) / 1000), 'day');
};
export const isReschedule = (date: any, days = 2) => {
	if (!date) return false;
	const before2Day = dayjs(date).subtract(days, 'd');
	return before2Day.isBefore(dayjs());
};

export const parseDate = (date: Date | undefined | number) => {
	if (!date) {
		return '-';
	}
	const m = dayjs(date);
	return m.format('DD MMM YYYY hh:mm a');
};

export const dateFormat = {
	day: (date: Date | undefined | null) => {
		if (!date) {
			return '-';
		}
		const m = dayjs(date);
		return m.format('ddd');
	},
	time: (date: Date | undefined | null) => {
		if (!date) {
			return '-';
		}
		const m = dayjs(date);
		return m.format('h:mm A');
	},
	fullDate: (date: Date | undefined | null) => {
		if (!date) {
			return '-';
		}
		const m = dayjs(date);
		return m.format('DD/MM/YYYY');
	},
};
export const parseDateUnixSecond = (date: number) => {
	if (!date) {
		return '-';
	}
	const m = dayjs.unix(date);
	return m.format('DD MMM YYYY hh:mm a');
};
export const parseAndShowOnlyDate = (date: Date | undefined) => {
	if (!date) {
		return '-';
	}
	const m = dayjs(date);
	return m.format('DD MMM YY');
};
export const isExpired = (date?: Date): boolean => {
	if (!date) {
		return true;
	}
	const m = dayjs(date);
	return dayjs().isAfter(m);
};

export const renderPackageName = (
	packageType: SubscriptionPackageType,
	packageName?: PackageDetails
) => {
	if (packageType === SubscriptionPackageType.TenantPackage) {
		return packageName ? packageName.name : 'Other City';
	} else if (packageType === SubscriptionPackageType.ConsultantFee) {
		return 'Consultant Fee';
	} else {
		return 'Payment Link';
	}
};
export const renderLeadStage = (lead?: ILead): string => {
	switch (lead?.stage) {
		case 0:
			return 'Not Assigned';
		case 1:
			return `Client Support (${lead.clientSupport?.name})`;
		case 2:
			return `Hold (${lead.clientSupport?.name})`;
		case 3:
			if (lead.saleStaffType === StaffType.AssistantSalesManager) {
				return `ASM (${(lead.bdm as IStaff).name})`;
			} else {
				return `BDM (${(lead.bdm as IStaff).name})`;
			}
		case 4:
			return `Sales Executive (${(lead.executive as IStaff).name})`;

		default:
			return 'Not Found';
	}
};
export const renderPType = (t: string): string => {
	switch (t) {
		case 'flat':
			return 'Flat';
		case 'independenthouse':
			return `Duplex`;

		default:
			return 'Flat';
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
		case StaffType.Accountant:
			return 'Accountant';

		default:
			return 'Not Found';
	}
};

export const renderPropertyOnFoor = (totalFloors: number) => {
	const numbers = [
		{
			value: 'Ground Fooor',
			label: 'Ground Fooor',
		},
	];
	for (let index = 1; index <= totalFloors; index++) {
		numbers.push({
			value: `${index}`,
			label: `${index}`,
		});
	}

	if (totalFloors > 1) {
		numbers.push({
			value: 'Entire Building',
			label: 'Entire Building',
		});
	}
	return numbers;
};

export const StaticPaths = {
	property: (image: string) => `/assets/properties/${image}`,
	domain: 'https://homesearch18.com',
};

export const capitalizeFirstLetter = (input: string): string =>
	input.charAt(0).toUpperCase() + input.slice(1);

export const years = ['2021', '2022'];
export const futureYears = [2022, 2023, 2024, 2025, 2026, 2027, 2028];
export const months = [
	'Jan',
	'Feb',
	'March',
	'April',
	'May',
	'June',
	'July',
	'Aug',
	'Sept',
	'Oct',
	'Nov',
	'Dec',
];
export const paymentModes = ['cash', 'online', 'gateway'];

export const typeOfPackages = [
	{
		label: 'Bhubaneswar (2999)',
		value: 'b',
	},
	{
		label: 'Other City (999)',
		value: 'oc',
	},
	{
		label: 'Brokerage / Consultant Fee',
		value: 'consultantFee',
	},
];

export const getEmbedId = (url: string): string | null => {
	const regExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return match && match[2].length === 11 ? match[2] : null;
};
