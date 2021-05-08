import { Box, Grid } from '@material-ui/core';

import React from 'react';
import area from '../../../assets/icons/area.svg';
import bed from '../../../assets/icons/bed.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../assets/icons/location2.svg';
import logoIcon from '../../../assets/icons/logo.svg';
import tag from '../../../assets/icons/tag2.svg';
import tub from '../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './searchCard.style';

const PropertyCard = () => {
	const classes = useStyles({ img: city });
	const globalClasses = useGlobalStyles({ img: city });
	return (
		<div className={classes.wrapper}>
			<Grid container spacing={5}>
				<Grid item xs={12} md={7}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							<div className={classes.dateWrapper}>
								<span>16</span>
								<span>JAN</span>
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
									classes.colorPrimary
								)}
							>
								New Property
							</span>
						</div>
						<div>
							<h2>Casa Living Villa</h2>
							<span
								className={clsx(
									classes.smallText,
									classes.colorGray
								)}
							>
								3BHK Apartment For Rent
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
									234, 2nd Floor, Trishulia, Bhubaneswar
								</h4>
							</div>
							<div className={globalClasses.alignCenter}>
								<img
									src={tag}
									alt="Tag"
									className={clsx(classes.icon)}
								/>
								<h4 className={classes.locationText}>
									Apartment,3BHK,Swimming Pool
								</h4>
							</div>
						</div>
					</Box>
					<Box mt="2rem">
						<Grid container spacing={5}>
							<Grid item xs={6}>
								<Grid container spacing={1}>
									<Grid
										item
										xs={5}
										className={classes.keyValue}
									>
										<span>1080</span>
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
										<span>75L</span>
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
										<span>25K</span>
									</Grid>
									<Grid
										item
										xs={7}
										className={globalClasses.flexCenter}
									>
										<span className={classes.smallText}>
											Expected EMI / Month
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
								<img src={area} alt="Area" />
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										1080 sqft.
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img src={bed} alt="Bed" />
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										3
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img src={tub} alt="Tub" />
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										2
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img src={car} alt="Car" />
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
								<img src={area} alt="Area" />
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										1080 sqft.
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img src={bed} alt="Bed" />
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										3
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img src={tub} alt="Tub" />
								<Box ml="0.2rem">
									<span
										className={clsx(
											classes.smallText,
											classes.bold
										)}
									>
										2
									</span>
								</Box>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img src={car} alt="Car" />
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
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
