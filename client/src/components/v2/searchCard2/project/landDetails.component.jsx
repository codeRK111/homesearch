import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import { area, location2, logo, tag } from '../../../../utils/statc';
import {
	capitalizeFirstLetter,
	renderLandAreaGrid,
	renderTypes,
	toHumanReadble,
} from '../../../../utils/render.utils';

import ApartmentIcon from '@material-ui/icons/Apartment';
import ImageCarousel from '../../imageCarousel';
import ImageLightBoxCarousel from '../../lightBox/carousel.component';
import React from 'react';
import SwipablePhotos from '../../swipableViews/project';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'moment';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard.style';
import { useTheme } from '@material-ui/core/styles';

const PropertyCard = ({ project, info }) => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [allImages, setAllImages] = React.useState([]);
	const [index, setIndex] = React.useState(0);
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
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
	const classes = useStyles({
		img: `/assets/projects/${defaultImage.image}`,
	});
	const globalClasses = useGlobalStyles({ img: city });

	const toggleFullImage = (status) => () => {
		setFullImageOpen(status);
	};

	const areaInfo = renderLandAreaGrid(project, info);

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
			<ImageLightBoxCarousel
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={project.title}
				photos={allImages.map((c) => `/assets/projects/${c.image}`)}
				index={index}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					{smallScreen ? (
						<ImageCarousel
							title={project.title}
							photos={[...previewImages, ...project.photos].map(
								(c) => `/assets/projects/${c.image}`
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
										<span>{m.format('D')}</span>
										<span>{m.format('MMM')}</span>
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
						<Grid item xs={4} md={3}>
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
												{areaInfo.min} sqft.
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
												{areaInfo.max} sqft.
											</span>
										</Box>
									</div>
								</Grid>
							</Grid>
						</Grid>

						{/* Price  */}
						<Grid item xs={4} md={3}>
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
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
