import React, { useState } from 'react';
import RentBasicInfo, { SaleBasicInfoData } from './basicInfo';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import AddPropertyStepper from '../stepper';
import { Box } from '@material-ui/core';
import { Property } from '../../../model/property.interface';
import RentImageContainer from './imageContainer';
import { asyncAddPropertyRent } from '../../../API/property';

const AddPropertySale = () => {
	const propertyId = '616d23dea771942f60db0733';
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [step, setStep] = useState(0);
	const [addPropertyLoading, setAddPropertyLoading] = useState(false);
	const [basicInfo, setBasicInfo] = useState<SaleBasicInfoData | null>(null);
	const [propertyDetails, setPropertyDetails] = useState<any | null>(null);
	const [property, setProperty] = useState<Property | null>(null);

	// onSubmit
	const onBasicSubmit = (values: SaleBasicInfoData) => {
		setStep(step + 1);
		setBasicInfo(values);
	};
	const onPropertyDetailsSubmit = (values: any) => {
		//
		setPropertyDetails(values);
		addProperty(values);
	};
	const onBack = () => {
		setStep(step - 1);
	};

	const addProperty = async (values: any) => {
		try {
			setAddPropertyLoading(true);
			const inputData = { ...basicInfo, ...values };
			inputData.city = inputData.city.id;
			inputData.location = inputData.location.id;
			inputData['for'] = 'rent';
			inputData.userId = '616d18d8cb5a982a8c22e4c2';
			const data = await asyncAddPropertyRent(inputData);
			setAddPropertyLoading(false);
			setProperty(data);
			setStep(step + 1);
		} catch (error: any) {
			setAddPropertyLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};
	return (
		<div>
			<AddPropertyStepper step={step} />
			<Box mt="1rem">
				<div style={{ display: step === 0 ? 'block' : 'none' }}>
					<RentBasicInfo onSubmit={onBasicSubmit} />;
				</div>
				<div style={{ display: step === 1 ? 'block' : 'none' }}>
					<h3>Under Testing</h3>
				</div>
				<div style={{ display: step === 2 ? 'block' : 'none' }}>
					<RentImageContainer
						onBack={onBack}
						propertyId={property?.id}
					/>
				</div>
			</Box>
		</div>
	);
};

export default AddPropertySale;
