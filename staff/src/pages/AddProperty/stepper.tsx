import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import React from 'react';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		button: {
			marginRight: theme.spacing(1),
		},
		completed: {
			display: 'inline-block',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
	})
);

function getSteps() {
	return ['Basic Information', 'Property Details', 'Upload Images'];
}

interface IAddPropertyStepper {
	step: number;
}

export default function AddPropertyStepper({ step }: IAddPropertyStepper) {
	const classes = useStyles();

	const steps = getSteps();

	return (
		<Stepper nonLinear activeStep={step}>
			{steps.map((label, index) => (
				<Step key={label}>
					<StepButton>{label}</StepButton>
				</Step>
			))}
		</Stepper>
	);
}
