import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	area,
	bed,
	car,
	location2,
	logo,
	tag,
	tub,
} from '../../../../utils/statc';
import {
	capitalizeFirstLetter,
	renderBool,
	renderTransactionType,
} from '../../../../utils/render.utils';

import React from 'react';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'moment';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../searchCard.style';

const PropertyCard = ({ property, edit = false }) => {
	const m = moment(property.createdAt);
	const img = property.photos[0]
		? property.photos.find((c) => c.default)
			? `/assets/properties/${
					property.photos.find((c) => c.default).image
			  }`
			: `/assets/properties/${property.photos[0].image}`
		: city;
	const classes = useStyles({ img });
	const globalClasses = useGlobalStyles({ img: city });

	const onClick = () => {
		const url = `/v2/property-details/${property.id}`;
		var win = window.open(url, '_blank');
		win.focus();
	};

	return (
		<div
			className={clsx(classes.wrapper, globalClasses.pointer)}
			onClick={onClick}
		>
			{/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
			<Grid container spacing={0}>
				<Grid item xs={12} md={7}>
					<div className={classes.imageContainerCard}>
						<div className={classes.imageWrapperCard}>
							<div className={classes.overlay}>
								<div className={classes.dateWrapperCard}>
									<span>{m.format('D')}</span>
									<span>{m.format('MMM')}</span>
								</div>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} md={5}>
					<div className={classes.cardContentWrapper}>
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
									{renderTransactionType(
										property.transactionType
									)}
								</span>
							</div>
							<div>
								<h2
									className={clsx(
										globalClasses.textCenter,
										classes.propertyName
									)}
								>
									{property.title}
								</h2>
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
									src={location2}
									alt="Location"
									className={classes.icon}
								/>
								<h4 className={classes.locationText}>
									{property.location.name},
									{property.city.name}
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
											className={
												globalClasses.alignCenter
											}
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
													{property.salePrice /
														100000}
													L
												</h1>
											</Box>
										</Grid>
										<Grid
											item
											xs={7}
											className={globalClasses.flexCenter}
										>
											<span className={classes.smallText}>
												Price <br /> Refistration Extra
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
											className={
												globalClasses.alignCenter
											}
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
												<h3>
													{capitalizeFirstLetter(
														property.facing
													)}
												</h3>
											</Box>
										</Grid>
										<Grid
											item
											xs={7}
											className={
												globalClasses.alignCenter
											}
										>
											<span className={classes.smallText}>
												Facing
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
											{capitalizeFirstLetter(
												property.landUsingZoning
											)}
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
											{renderBool(
												property.constructionDone
											)}
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
											{renderBool(
												property.boundaryWallMade
											)}
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
											{renderBool(
												property.gatedCommunity
											)}
										</span>
									</Box>
								</div>
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
