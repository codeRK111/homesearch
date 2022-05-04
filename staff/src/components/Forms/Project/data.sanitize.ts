import { BasicUnitInfo } from './add-basic-info';

export const sanitizeToSubmit = (values: BasicUnitInfo) => {
	const data: any = {
		...values,
		bookingAmount: Number(values.bookingAmount),
		emi: Number(values.emi),
		totalLandArea: Number(values.totalLandArea),
	};
	if (values.projectType === 'land') {
		const numberOfOwner = values.legalClearancesForLand.find(
			(c) => c.name === 'numberOfOwner'
		);
		if (numberOfOwner && numberOfOwner['value']) {
			data.legalClearance = values.legalClearancesForLand.map((c) => {
				if (c.name === 'numberOfOwner') {
					c.details = values.ownerNumber;
				}
				return c;
			});
		}
	} else {
		const reraApproved = values.legalClearances.find(
			(c) => c.name === 'reraapproved'
		);
		if (reraApproved && reraApproved['value']) {
			data.legalClearance = values.legalClearances.map((c) => {
				if (c.name === 'reraapproved') {
					c.details = values.reraId;
				}
				return c;
			});
		}
	}

	data.thumbnailImage = null;
	data.masterFloorPlan = null;
	data.geogrophicalImage = null;

	return data;
};
