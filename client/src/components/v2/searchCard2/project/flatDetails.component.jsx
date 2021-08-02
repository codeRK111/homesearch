import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderTypes,
	toHumanReadble,
} from '../../../../utils/render.utils';

import ApartmentIcon from '@material-ui/icons/Apartment';
import ImageCarousel from '../../imageCarousel';
import React from 'react';
import SwipablePhotos from '../../swipableViews';
import ViewFullImage from '../../viewFullImage';
import area from '../../../../assets/icons/area.svg';
import bed from '../../../../assets/icons/bed.svg';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../../assets/icons/location2.svg';
import logoIcon from '../../../../assets/icons/logo.svg';
import moment from 'moment';
import tag from '../../../../assets/icons/tag2.svg';
import tub from '../../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard.style';
import { useTheme } from '@material-ui/core/styles';

// import car from '../../../../assets/icons/car.svg';

const PropertyCard = ({ project, info }) => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const m = moment(project.createdAt);
	const img = project.photos[0]
		? project.photos.find((c) => c.default)
			? project.photos.find((c) => c.default)
			: project.photos[0]
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
						<div className={classes.imageContainer}>
							<div className={clsx(classes.imageWrapper)}>
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
							<Box className={classes.swipableWrapper}>
								<SwipablePhotos
									photos={project.photos}
									selected={defaultImage}
									setSelected={setDefaultImage}
									dir="projects"
									title={project.title}
								/>
							</Box>
						</div>
					)}
				</Grid>
				<Grid item xs={12} md={4}>
					<div className={classes.titleWrapper}>
						<div className={classes.mr1}>
							<img
								src={logoIcon}
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
								{capitalizeFirstLetter(
									project.complitionStatus
								)}
							</span>
						</div>
						<Box>
							<div>
								<h2 className={clsx(classes.propertyName)}>
									{project.title}
								</h2>
								<span
									className={clsx(
										classes.smallText,
										classes.colorGray
									)}
								>
									{`${renderTypes(
										project.projectType
									)} For Sale`}
								</span>
							</div>
						</Box>
					</div>
					<Box mt="1rem" className={globalClasses.justifyCenter}>
						<div className={globalClasses.alignCenterOnly}>
							<img
								src={location}
								alt="Location"
								className={classes.icon}
							/>
							<h4 className={classes.locationText}>
								{project.location.name},{project.city.name}
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
								{renderTypes(project.projectType)}, &nbsp;&nbsp;
								{toHumanReadble(project.totalLandArea)}
								Acres, &nbsp;&nbsp;{project.usp}
							</h4>
						</div>
					</Box>
					<Box className={globalClasses.justifyCenter}>
						<div className={globalClasses.alignCenterOnly}>
							<ApartmentIcon
								className={globalClasses.colorUtil}
							/>
							<h4 className={classes.locationText}>
								{project.builder.developerName},
							</h4>
						</div>
					</Box>
					<Box mt="2rem">
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={6}
										className={classes.keyValueProject}
									>
										<Box className="test">
											<h1>{info.totalUnits}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={6}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<span className={classes.smallText}>
											Total Units
										</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={6}
										className={classes.keyValueProject}
									>
										<Box className="test">
											<h1>
												{project.bookingAmount / 100000}{' '}
												L
											</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={6}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<span className={classes.smallText}>
											Booking Amount
										</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={6}
										className={classes.keyValueProject}
									>
										<Box className="test">
											<h1>{project.emi / 100000} L</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={6}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<span className={classes.smallText}>
											EMI
										</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={6}
										className={classes.keyValueProject}
									>
										<Box className="test">
											<h1>{project.totalLandArea}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={6}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<span className={classes.smallText}>
											Total Land Area (Arces)
										</span>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
					<Box mt="1rem">
						<h4 className={classes.colorSecondary}>Overview</h4>
					</Box>
					<Grid container spacing={1}>
						{/* Super builtup area  */}
						<Grid item xs={4} md>
							<Grid
								container
								direction="column"
								spacing={1}
								alignItems="center"
							>
								<Grid item>
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
												{info.minArea} sqft.
											</span>
										</Box>
									</div>
								</Grid>
								<Grid item>
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
												{info.maxArea} sqft.
											</span>
										</Box>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* Carpet Area  */}
						<Grid item xs={4} md>
							<Grid
								container
								direction="column"
								spacing={1}
								alignItems="center"
							>
								<Grid item>
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
												{info.minCarpetArea} sqft.
											</span>
										</Box>
									</div>
								</Grid>
								<Grid item>
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
												{info.maxCarpetArea} sqft.
											</span>
										</Box>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* Price  */}
						<Grid item xs={4} md>
							<Grid
								container
								direction="column"
								spacing={1}
								alignItems="center"
							>
								<Grid item>
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
												{info.minPrice / 100000} L
											</span>
										</Box>
									</div>
								</Grid>
								<Grid item>
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
												{info.maxPrice / 100000} L
											</span>
										</Box>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* Bed rooms  */}
						<Grid item xs={4} md>
							<Grid
								container
								direction="column"
								spacing={1}
								alignItems="center"
							>
								<Grid item>
									<div className={globalClasses.alignCenter}>
										<img
											src={bed}
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
												{info.bedRoomsMin}
											</span>
										</Box>
									</div>
								</Grid>
								<Grid item>
									<div className={globalClasses.alignCenter}>
										<img
											src={bed}
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
												{info.bedRoomsMax}
											</span>
										</Box>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* Toilets  */}
						<Grid item xs={4} md>
							<Grid
								container
								direction="column"
								spacing={1}
								alignItems="center"
							>
								<Grid item xs>
									<div className={globalClasses.alignCenter}>
										<img
											src={tub}
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
												{info.toiletMin}
											</span>
										</Box>
									</div>
								</Grid>
								<Grid item xs>
									<div className={globalClasses.alignCenter}>
										<img
											src={tub}
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
												{info.toiletMax}
											</span>
										</Box>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
