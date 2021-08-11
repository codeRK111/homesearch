import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import { area, bed, car, location2, logo, tub } from '../../../../utils/statc';
import {
	renderBool,
	renderToilets,
	renderTransactionType,
	shortLength,
} from '../../../../utils/render.utils';

import React from 'react';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'moment';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../searchCard.style';

const PropertyCard = ({ property, edit = false }) => {
	const m = moment(property.createdAt);
	const classes = useStyles({ img: city });
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
							<h2 className={globalClasses.textCenter}>
								{property.title}
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
									src={location2}
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
										<span>{property.superBuiltupArea}</span>
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
										<span>
											{property.salePrice / 100000}L
										</span>
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
										<span>{property.landArea}</span>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.flexCenter}
									>
										<span className={classes.smallText}>
											Land Area
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
										<span>1.5K</span>
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
