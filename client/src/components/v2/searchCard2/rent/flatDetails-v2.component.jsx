import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	StaticPaths,
	renderBool,
	renderToilets,
	renderTypes,
} from '../../../../utils/render.utils';
import {
	area,
	bed,
	car,
	location2,
	logo,
	tag,
	tub,
} from '../../../../utils/statc';

import ImageCarousel from '../../imageCarousel';
import React from 'react';
import SwipablePhotos from '../../swipableViews';
import ViewFullImage from '../../viewFullImage';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'dayjs';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard-v2.style';
import { useTheme } from '@material-ui/core/styles';

const PropertyCard = ({ property, edit = false }) => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const m = moment(property.createdAt);
	const img = property.photos[0]
		? property.photos.find((c) => c.default)
			? property.photos.find((c) => c.default)
			: property.photos[0]
		: {
				id: null,
				image: city,
		  };
	const [defaultImage, setDefaultImage] = React.useState(img);
	const classes = useStyles({
		img: StaticPaths.property(defaultImage.image),
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
				title={property.title}
				image={StaticPaths.property(defaultImage.image)}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					{smallScreen ? (
						<ImageCarousel
							photos={
								property.photos[0]
									? property.photos.map((c) =>
											StaticPaths.property(c.image)
									  )
									: [city]
							}
						/>
					) : (
						<div className={classes.detailsImageContainer}>
							<div className={clsx(classes.detailsImageWrapper)}>
								<div
									className={clsx(
										classes.overlay,
										'parentImage',
										globalClasses.pointer
									)}
									onClick={toggleFullImage(true)}
								>
									<div className={classes.dateWrapper}>
										<span>{m.format('D')}</span>
										<span>{m.format('MMM')}</span>
									</div>
								</div>
							</div>
							<Box className={classes.detailsSwipableWrapper}>
								<SwipablePhotos
									photos={property.photos}
									selected={defaultImage}
									setSelected={setDefaultImage}
								/>
							</Box>
						</div>
					)}
				</Grid>
				<Grid item xs={12} md={4}>
					<div className={classes.titleWrapper}>
						<div className={classes.mr1}>
							<img
								src={logo}
								alt="Logo"
								className={classes.logo}
							/>

							<span
								className={clsx(
									classes.smallText,
									classes.colorPrimary,
									globalClasses.textCenter
								)}
							>
								For Rent
							</span>
						</div>
						<div>
							<h2 className={globalClasses.textCenter}>
								{property.title}
							</h2>
							<span
								className={clsx(
									classes.smallText,
									classes.colorGray
								)}
							>
								{`${property.numberOfBedRooms}BHK ${renderTypes(
									property.type
								)} For Rent`}
							</span>
						</div>
					</div>
					<Box mt="1rem" className={globalClasses.justifyCenter}>
						<div className={globalClasses.alignCenterOnly}>
							<img
								src={location2}
								alt="Location"
								className={classes.icon}
							/>
							<h4 className={classes.locationText}>
								{property.location.name},{property.city.name}
							</h4>
						</div>
					</Box>
					<Box className={globalClasses.justifyCenter}>
						<div className={globalClasses.alignCenterOnly}>
							<img
								src={tag}
								alt="Tag"
								className={clsx(classes.icon)}
							/>
							<h4 className={classes.locationText}>
								{renderTypes(property.type)}, &nbsp;&nbsp;
								{property.superBuiltupArea}
								Sq.Ft, &nbsp;&nbsp;{property.usp}
							</h4>
						</div>
					</Box>

					<Box mt="1rem">
						<h4 className={classes.colorSecondary}>Overview</h4>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{property.superBuiltupArea} sqft.
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={bed}
									alt="Bed"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{property.numberOfBedRooms}
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={tub}
									alt="Tub"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{renderToilets(property.toiletTypes)}
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={car}
									alt="Car"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										1
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{property.carpetArea} sqft.
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={bed}
									alt="Bed"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{property.noOfFloors}
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={tub}
									alt="Tub"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{renderBool(property.verified)}
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={car}
									alt="Car"
									className={classes.iconImage}
								/>
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										{property.floor}
									</span>
								</Box>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
