import '../extra.css';

import { Box, Grid } from '@material-ui/core';

import Apartment from '../../searchResultCardNewProjectApartment/searchResultCard.component';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { Link } from 'react-router-dom';
import React from 'react';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../../assets/icons/location2.svg';
import logoIcon from '../../../../assets/icons/logo.svg';
import moment from 'moment';
import { shortLength } from '../../../../utils/render.utils';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../searchCard.style';

// import area from '../../../../assets/icons/area.svg';
// import bed from '../../../../assets/icons/bed.svg';
// import car from '../../../../assets/icons/car.svg';

// import tub from '../../../../assets/icons/tub.svg';

const PropertyCard = ({ property, propertyItems }) => {
	const m = moment(property.createdAt);
	const img = property.photos[0]
		? `/assets/projects/${property.photos[0].image}`
		: city;
	const classes = useStyles({ img });
	const globalClasses = useGlobalStyles({ img: city });

	const onClick = () => {
		const url = `/v2/project-details/${property.id}`;
		var win = window.open(url, '_blank');
		win.focus();
	};
	return (
		<div
			className={clsx(classes.wrapper, globalClasses.pointer)}
			onClick={onClick}
		>
			{/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
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
								For Rent
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
									src={location}
									alt="Location"
									className={classes.icon}
								/>
								<h4 className={classes.locationText}>
									{property.location.name},
									{property.city.name}
								</h4>
							</div>
							<div className={globalClasses.alignCenter}>
								<ApartmentIcon
									className={globalClasses.colorUtil}
								/>
								<h4 className={classes.locationText}>
									{property.builder.developerName},
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

					<Box mt="1rem">
						<h4 className={classes.colorSecondary}>Overview</h4>
					</Box>
					<Apartment
						property={property}
						propertyItems={propertyItems}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
