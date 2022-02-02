import { makeStyles, useTheme } from '@material-ui/core/styles';

import React from 'react';
import { StaticPaths } from '../../../utils/render.utils';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
	{
		label: 'San Francisco – Oakland Bay Bridge, United States',
		imgPath:
			'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Bird',
		imgPath:
			'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Bali, Indonesia',
		imgPath:
			'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
	},
	{
		label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
		imgPath:
			'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Goč, Serbia',
		imgPath:
			'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
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
		display: 'block',
		overflow: 'hidden',
		width: '100%',
		height: '80vh',
		objectFit: 'cover',
	},
}));

const BuilderImages = ({ images }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	return (
		<div className={classes.root}>
			<AutoPlaySwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{images.map((image, index) => (
					<div key={image.id}>
						{Math.abs(activeStep - index) <= 2 ? (
							<img
								className={classes.img}
								src={StaticPaths.builder(image['image'])}
								alt={'Builder'}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
		</div>
	);
};

export default BuilderImages;
