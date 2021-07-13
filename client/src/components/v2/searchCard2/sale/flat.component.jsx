import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	renderBool,
	renderToilets,
	renderTransactionType,
	shortLength,
} from '../../../../utils/render.utils';

import { Link } from 'react-router-dom';
import React from 'react';
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
import useStyles from '../searchCard.style';

const furnisingLabels = {
	unfurnished: 'Unfurnished',
	furnished: 'Furnished',
	semifurnished: 'Semi furnished',
};

const PropertyCard = ({ property, edit = false }) => {
	const m = moment(property.createdAt);
	const img = property.photos[0]
		? `/assets/properties/${property.photos[0].image}`
		: city;
	const classes = useStyles({ img });
	const globalClasses = useGlobalStyles({ img: city });
	return (
		<div className={classes.wrapper}>
			<Grid container spacing={5}>
				<Grid item xs={12} md={7}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							<div className={classes.dateWrapper}>
								<span>{m.format('D')}</span>
								<span>{m.format('MMM')}</span>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} md={5}>
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
								{renderTransactionType(
									property.transactionType
								)}
							</span>
						</div>
						<div>
							<h2 className={globalClasses.textCenter}>
								<Link
									to={`/v2/property-details/${property.id}`}
									className={classes.link}
									target="_blank"
								>
									{property.title}
								</Link>
							</h2>
							<span
								className={clsx(
									classes.smallText,
									classes.colorGray,
									globalClasses.textCenter
								)}
							>
								{shortLength(property.description, 50)}
							</span>
						</div>
					</div>
					<Box mt="1rem" className={globalClasses.justifyCenter}>
						<div>
							<div className={globalClasses.alignCenter}>
								<img
									src={location}
									alt="Location"
									className={classes.icon}
								/>
								<h4 className={classes.locationText}>
									{property.location.name},
									{property.city.name}
								</h4>
							</div>
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
										<Box className="test">
											<h1>{property.superBuiltupArea}</h1>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.flexCenter}
									>
										<span className={classes.smallText}>
											Sq. Ft Super Built Up Area
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
											{property.availability ===
											'immediately' ? (
												<h5
													className={
														globalClasses.textCenter
													}
												>
													Ready to move
												</h5>
											) : (
												<h1>
													<span>
														{moment(
															property.availableDate
														).format('D')}
													</span>{' '}
													<br />
													<span>
														{moment(
															property.availableDate
														).format('MMM')}
													</span>
												</h1>
											)}
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Available from
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
											<h5
												className={
													globalClasses.textCenter
												}
											>
												{
													furnisingLabels[
														property.furnished
													]
												}
											</h5>
										</Box>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.alignCenter}
									>
										<span className={classes.smallText}>
											Furnishing
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
