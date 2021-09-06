import '../extra.css';

import { Box, Grid } from '@material-ui/core';

import PropertyTypeChip from '../../chip/propertyType.component';
import React from 'react';
import ViewFullImage from '../../viewFullImage';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import logoIcon from '../../../../assets/icons/logo.svg';
import moment from 'dayjs';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard.style';
import { useTheme } from '@material-ui/core/styles';

const PropertyCard = ({ property, edit = false }) => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const m = moment(property.createdAt);
	const img = property.floorPlan
		? {
				id: null,
				image: property.floorPlan,
		  }
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
			{/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
			<ViewFullImage
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={property.title}
				image={`/assets/projects/${defaultImage.image}`}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					{smallScreen ? (
						<div></div>
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
						</div>
						<div>
							<h2>{property.title}</h2>
							<PropertyTypeChip
								title={property.project.projectType}
							/>
						</div>
					</div>
					<Box mt="1rem" className={globalClasses.justifyCenter}>
						<div>
							{/* <div className={globalClasses.alignCenter}>
								<img
									src={location}
									alt="Location"
									className={classes.icon}
								/>
								<h4 className={classes.locationText}>
									{property.location.name},
									{property.city.name}
								</h4>
							</div> */}
							{/* <div className={globalClasses.alignCenter}>
								<img
									src={tag}
									alt="Tag"
									className={clsx(classes.icon)}
								/>
								<h4 className={classes.locationText}>
									Apartment,3BHK,Swimming Pool
								</h4>
							</div> */}
						</div>
					</Box>
					<Box mt="2rem">
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={5}
										className={classes.keyValue}
									>
										<Box className="projectValueWrapper">
											<h1>{property.numberOfUnits}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<span className={classes.smallText}>
											Units
										</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={0}>
									<Grid
										item
										xs={5}
										style={{
											position: 'relative',
											height: '80px',
										}}
									>
										<Box className="projectValueWrapper">
											<h1>{property.price / 100000}L</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Price
										</span>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={5}
										className={classes.keyValue}
									>
										<Box className="projectValueWrapper">
											<h1>{property.numberOfBedrooms}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Number of bedroom
										</span>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={5}
										className={classes.keyValue}
									>
										<Box className="projectValueWrapper">
											<h1>{property.superBuiltupArea}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Super built up area (Sq.ft)
										</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={5}
										className={classes.keyValue}
									>
										<Box className="projectValueWrapper">
											<h1>{property.carpetArea}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Carpet area (Sq.ft)
										</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={5}
										className={classes.keyValue}
									>
										<Box className="projectValueWrapper">
											<h1>{property.numberOfToilets}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Toilets
										</span>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
