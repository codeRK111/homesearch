import React, { useState } from 'react';
import RentBasicInfo, { RentBasicInfoData } from './basicInfo';

import AddPropertyStepper from '../stepper';
import { Box } from '@material-ui/core';
import RentDetailsWrapper from './PropertyDetails';

const AddPropertyRent = () => {
	const [step, setStep] = useState(0);
	const [basicInfo, setBasicInfo] = useState<RentBasicInfoData | null>(null);

	// onSubmit
	const onBasicSubmit = (values: RentBasicInfoData) => {
		setStep(step + 1);
		setBasicInfo(values);
	};
	const onBack = () => {
		setStep(step - 1);
	};
	return (
		<div>
			<AddPropertyStepper step={step} />
			<Box mt="1rem">
				<div style={{ display: step === 0 ? 'block' : 'none' }}>
					<RentBasicInfo onSubmit={onBasicSubmit} />;
				</div>
				<div style={{ display: step === 1 ? 'block' : 'none' }}>
					<RentDetailsWrapper
						type={basicInfo?.type}
						onSubmit={onBasicSubmit}
						onBack={onBack}
					/>
				</div>
			</Box>
		</div>
	);
};

export default AddPropertyRent;
