import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import ViewFullImage from '../viewFullImage';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		display: 'block',
		maxWidth: 400,
		overflow: 'hidden',
		width: '100%',
	},
}));

function SwipeableTextMobileStepper({ photos, title }) {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = photos.length;
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const [image, setImage] = React.useState(null);

	const toggleFullImage = (status) => () => {
		setFullImageOpen(status);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	const onImageClick = (img) => () => {
		// alert('Hello');
		setImage(img);
		toggleFullImage(true)();
	};

	return (
		<div className={classes.root}>
			<ViewFullImage
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={title}
				image={image}
			/>
			<AutoPlaySwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{photos.map((step, index) => (
					<div key={step.label}>
						{Math.abs(activeStep - index) <= 2 ? (
							<img
								onClick={onImageClick(step)}
								className={classes.img}
								src={step}
								alt={'PropertyPhoto'}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<MobileStepper
				steps={maxSteps}
				position="static"
				variant="text"
				activeStep={activeStep}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}
					>
						Next
						{theme.direction === 'rtl' ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				}
				backButton={
					<Button
						size="small"
						onClick={handleBack}
						disabled={activeStep === 0}
					>
						{theme.direction === 'rtl' ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
						Back
					</Button>
				}
			/>
		</div>
	);
}

export default SwipeableTextMobileStepper;
