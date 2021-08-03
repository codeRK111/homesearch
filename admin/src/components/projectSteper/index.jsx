import React from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return [
		'Upload project information',
		'Add unit and floorplan',
		'Project created',
	];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return 'Upload project information';
		case 1:
			return 'Add unit and floorplan';
		case 2:
			return 'Project created';
		default:
			return 'Unknown step';
	}
}

export default function ProjectSteper({ activeStep }) {
	const classes = useStyles();
	const steps = getSteps();

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};

					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</div>
	);
}
