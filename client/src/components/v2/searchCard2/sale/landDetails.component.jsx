import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderBool,
} from '../../../../utils/render.utils';

import ImageCarousel from '../../imageCarousel';
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
import tag from '../../../../assets/icons/tag2.svg';
import tub from '../../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../searchCard.style';
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
		img: `/assets/properties/${defaultImage.image}`,
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
				image={`/assets/properties/${defaultImage.image}`}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					{smallScreen ? (
						<ImageCarousel
							photos={
								property.photos[0]
									? property.photos.map(
											(c) =>
												`/assets/properties/${c.image}`
									  )
									: [city]
							}
							title={property.title}
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
								For Resale
							</span>
						</div>
						<div>
							<h2>{property.title}</h2>
							<span
								className={clsx(
									classes.smallText,
									classes.colorGray
								)}
							>
								{`${property.plotArea} Sq. Ft Land For Sale`}
							</span>
						</div>
					</div>
					<Box mt="1rem" className={globalClasses.justifyCenter}>
						<div className={globalClasses.alignCenterOnly}>
							<img
								src={location}
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
								Land, &nbsp;&nbsp;{property.plotArea}
								Sq.Ft,&nbsp;&nbsp;{property.usp}
							</h4>
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
										<Box className="test">
											<h1>{property.plotArea}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Sq. Ft Plot Area
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
										<Box className="test">
											<h1>
												{property.salePrice / 100000}L
											</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.flexCenter}
									>
										<span className={classes.smallText}>
											Price [ Refistration Extra ]
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
										<Box className="test">
											<h1>
												{property.govermentValuation /
													100000}
												L
											</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Goverment Valuation
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
										<Box className="test">
											<h1>1.5K</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.flexCenter}
									>
										<span className={classes.smallText}>
											Maintainance Fee Per Month
										</span>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
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
										{property.length} sqft.
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
										{property.plotFrontage} sqft.
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
										{property.widthOfRoad} sqft.
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
										{capitalizeFirstLetter(property.facing)}
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
										{property.width} sqft.
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
										{renderBool(property.constructionDone)}
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
										{renderBool(property.boundaryWallMade)}
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
										{renderBool(property.gatedCommunity)}
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
