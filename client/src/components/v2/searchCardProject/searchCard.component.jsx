import { Box, CardMedia, Grid } from '@material-ui/core';
import {
	area,
	bed,
	car,
	location2,
	logo,
	tag,
	tub,
} from '../../../utils/statc';

import React from 'react';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './searchCard.style';

const PropertyCard = () => {
	const classes = useStyles({ img: city });
	const globalClasses = useGlobalStyles({ img: city });
	return (
		<div className={classes.wrapper}>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							<div className={classes.dateWrapper}>
								<span>16</span>
								<span>JAN</span>
							</div>
						</div>
					</div>
					<Box mt="1rem" className={classes.otherImages}>
						<Grid container spacing={3}>
							<Grid item xs={6} md={3}>
								<CardMedia
									image={city}
									className={classes.cardMedia}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<CardMedia
									image={city}
									className={classes.cardMedia}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<CardMedia
									image={city}
									className={classes.cardMedia}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<CardMedia
									image={city}
									className={classes.cardMedia}
								/>
							</Grid>
						</Grid>
					</Box>
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
								New Property
							</span>
						</div>
						<div>
							<h2 className={globalClasses.textCenter}>
								Casa Living Villa
							</h2>
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
					<Box mt="2rem" className={globalClasses.justifyCenter}>
						<div>
							<div className={globalClasses.alignCenter}>
								<img
									src={location2}
									alt="Location"
									className={classes.icon}
								/>
								<h4 className={classes.locationText}>
									234, 2nd Floor, Trishulia, Bhubaneswar
								</h4>
							</div>
							<Box
								mt="1rem"
								className={globalClasses.alignCenter}
							>
								<img
									src={tag}
									alt="Tag"
									className={clsx(classes.icon)}
								/>
								<h4 className={classes.locationText}>
									Apartment, 3BHK, Swimming Pool
								</h4>
							</Box>
						</div>
					</Box>
					<Box mt="3rem">
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
					<Box mt="2rem" mb="2rem">
						<h4 className={classes.colorSecondary}>Overview</h4>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={3}>
							<div className={globalClasses.alignCenter}>
								<img
									src={area}
									alt="Area"
									className={classes.overviewIcon}
								/>
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
								<img
									src={bed}
									alt="Bed"
									className={classes.overviewIcon}
								/>
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
								<img
									src={tub}
									alt="Tub"
									className={classes.overviewIcon}
								/>
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
								<img
									src={car}
									alt="Car"
									className={classes.overviewIcon}
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
									className={classes.overviewIcon}
								/>
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
								<img
									src={bed}
									alt="Bed"
									className={classes.overviewIcon}
								/>
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
								<img
									src={tub}
									alt="Tub"
									className={classes.overviewIcon}
								/>
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
								<img
									src={car}
									alt="Car"
									className={classes.overviewIcon}
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
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
