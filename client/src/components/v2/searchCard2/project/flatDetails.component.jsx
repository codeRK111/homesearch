import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	StaticPaths,
	capitalizeFirstLetter,
	isReraApproved,
	projectCompletionStatusLabel,
	renderReraId,
	renderTypes,
	toHumanReadble,
} from '../../../../utils/render.utils';
import { area, bed, location2, logo, tag, tub } from '../../../../utils/statc';

import ApartmentIcon from '@material-ui/icons/Apartment';
import ImageCarousel from '../../imageCarousel';
import ImageLightBoxCarousel from '../../lightBox/carousel.component';
import React from 'react';
import SwipablePhotos from '../../swipableViews/project';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'dayjs';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard.style';
import { useTheme } from '@material-ui/core/styles';

// import { area, bed, location2, logo, tag, tub } from '../../../../utils/statc';

// import car from '../../../../assets/icons/car.svg';

const PropertyCard = ({ project, info }) => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const [allImages, setAllImages] = React.useState([]);
	const m = moment(project.createdAt);
	const previewImages = React.useMemo(() => {
		return [
			{
				_id: 'default',
				image: project.thumbnailImage,
			},
			{
				_id: 'master',
				image: project.masterFloorPlan,
			},
			{
				_id: 'geography',
				image: project.geogrophicalImage,
			},
		];
	}, [project]);
	const img = {
		_id: 'default',
		image: project.thumbnailImage,
	};
	const [defaultImage, setDefaultImage] = React.useState(img);
	const [index, setIndex] = React.useState(0);
	const classes = useStyles({
		img: StaticPaths.project(defaultImage.image),
	});
	const globalClasses = useGlobalStyles({ img: city });

	const toggleFullImage = (status) => () => {
		setFullImageOpen(status);
	};
	const onImageClick = (img) => {
		const i = allImages.findIndex((element) => {
			if (element._id === img._id) {
				return true;
			} else {
				return false;
			}
		});
		setDefaultImage(img);
		setIndex(i);
		toggleFullImage(true)();
	};
	React.useEffect(() => {
		if (project) {
			setAllImages([...previewImages, ...project.photos]);
		}
	}, [project, previewImages]);
	return (
		<div className={classes.wrapper}>
			{/* <ViewFullImage
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={project.title}
				image={`/assets/projects/${defaultImage.image}`}
			/> */}
			<ImageLightBoxCarousel
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={project.title}
				photos={allImages.map((c) => StaticPaths.project(c.image))}
				index={index}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					{smallScreen ? (
						<ImageCarousel
							title={project.title}
							photos={[...previewImages, ...project.photos].map(
								(c) => StaticPaths.project(c.image)
							)}
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
										<span>
											{
												projectCompletionStatusLabel[
													project.complitionStatus
												]
											}
										</span>
									</div>
								</div>
							</div>
							<Box className={classes.swipableWrapper}>
								<SwipablePhotos
									photos={[
										...previewImages,
										...project.photos,
									]}
									selected={defaultImage}
									setSelected={onImageClick}
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
								src={logo}
								alt="Logo"
								className={classes.logo}
							/>

							<span
								className={clsx(
									classes.smallText2,
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
								<span className={clsx(classes.colorGray)}>
									{`${renderTypes(
										project.projectType
									)} For Sale`}
								</span>
							</div>
						</Box>
					</div>
					<Box mt="1.5rem" className={globalClasses.justifyCenter}>
						<div className={globalClasses.alignCenterOnly}>
							<img
								src={location2}
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
					{isReraApproved(project.legalClearance) && (
						<Box className={globalClasses.justifyCenter}>
							<div className={globalClasses.alignCenterOnly}>
								<h4 className={classes.locationText}>
									{`RERA ID - ${renderReraId(
										project.legalClearance
									)}`}
									,
								</h4>
							</div>
						</Box>
					)}
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
										<span className={classes.smallText2}>
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
										<span className={classes.smallText2}>
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
											<h1>{project.emi / 1000} K</h1>
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
										<span className={classes.smallText2}>
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
										<span className={classes.smallText2}>
											Total Land Area (Arces)
										</span>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
					<Box mt="1rem">
						<h4 className={clsx(classes.colorSecondary)}>
							Overview
						</h4>
					</Box>
					<Grid container spacing={3}>
						{/* Super built up min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.minArea} sqft.
									</span>
								</Box>
							</div>
						</Grid>
						{/* Price min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.minPrice / 100000} L
									</span>
								</Box>
							</div>
						</Grid>
						{/* Bedroom min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={bed}
									alt="Bed"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.bedRoomsMin}
									</span>
								</Box>
							</div>
						</Grid>
						{/* Toilet min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={tub}
									alt="Tub"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.toiletMin}
									</span>
								</Box>
							</div>
						</Grid>
						{/* Max  */}
						{/* Super built up min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.maxArea} sqft.
									</span>
								</Box>
							</div>
						</Grid>
						{/* Price min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.maxPrice / 100000} L
									</span>
								</Box>
							</div>
						</Grid>
						{/* Bedroom min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={bed}
									alt="Bed"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
										)}
									>
										{info.bedRoomsMax}
									</span>
								</Box>
							</div>
						</Grid>
						{/* Toilet min  */}
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={tub}
									alt="Tub"
									className={classes.iconImage}
								/>
								<Box ml="0.3rem">
									<span
										className={clsx(
											classes.smallText2,
											classes.bolder
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
		</div>
	);
};

export default PropertyCard;
