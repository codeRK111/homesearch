import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	renderBool,
	renderToilets,
	shortLength,
} from '../../../../utils/render.utils';

import ImageCarousel from '../../imageCarousel';
import { Link } from 'react-router-dom';
import PropertyTypeChip from '../../chip/propertyType.component';
import React from 'react';
import SwipablePhotos from '../../swipableViews';
import ViewFullImage from '../../viewFullImage';
import area from '../../../../assets/icons/area.svg';
import bed from '../../../../assets/icons/bed.svg';
import car from '../../../../assets/icons/car.svg';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../../assets/icons/location2.svg';
import logoIcon from '../../../../assets/icons/logo.svg';
import moment from 'moment';
import tub from '../../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard.style';
import { useTheme } from '@material-ui/core/styles';

const PropertyCard = ({ project }) => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const m = moment(project.createdAt);
	const img = project.photos[0]
		? project.photos[0]
		: {
				id: null,
				image: city,
		  };
	const [defaultImage, setDefaultImage] = React.useState(img);
	const classes = useStyles({
		img: `/assets/projects/${defaultImage.image}`,
	});
	const globalClasses = useGlobalStyles({ img: city });

	const toggleFullImage = (status) => () => {
		setFullImageOpen(status);
	};
	return (
		<div className={classes.wrapper}>
			<ViewFullImage
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={project.title}
				image={`/assets/projects/${defaultImage.image}`}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					{smallScreen ? (
						<ImageCarousel
							photos={
								project.photos[0]
									? project.photos.map(
											(c) => `/assets/projects/${c.image}`
									  )
									: [city]
							}
						/>
					) : (
						<div className={clsx(classes.imageWrapper)}>
							<div
								className={clsx(classes.overlay, 'parentImage')}
							>
								<div className={classes.dateWrapper}>
									<span>{m.format('D')}</span>
									<span>{m.format('MMM')}</span>
								</div>
								<button
									className={'fullImageButton'}
									onClick={toggleFullImage(true)}
								>
									View Full Image
								</button>
								<Box className={classes.swipableWrapper}>
									<SwipablePhotos
										photos={project.photos}
										selected={defaultImage}
										setSelected={setDefaultImage}
										dir="projects"
									/>
								</Box>
							</div>
						</div>
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
