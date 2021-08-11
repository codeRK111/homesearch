import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderTypes,
	toHumanReadble,
} from '../../../../utils/render.utils';

import Apartment from '../../searchResultCardNewProjectApartment/searchResultCard.component';
import ApartmentIcon from '@material-ui/icons/Apartment';
import React from 'react';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../../assets/icons/location2.svg';
import logoIcon from '../../../../assets/icons/logo.svg';
import moment from 'moment';
import tag from '../../../../assets/icons/tag2.svg';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../searchCard.style';

// import area from '../../../../assets/icons/area.svg';
// import bed from '../../../../assets/icons/bed.svg';
// import car from '../../../../assets/icons/car.svg';

// import tub from '../../../../assets/icons/tub.svg';

const PropertyCard = ({ property, propertyItems }) => {
	const m = moment(property.createdAt);

	const img = `/assets/projects/${property.thumbnailImage}`;
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
									{capitalizeFirstLetter(
										property.complitionStatus
									)}
								</span>
							</div>
							<div>
								<h2 className={clsx(classes.propertyName)}>
									{property.title}
								</h2>
								<span
									className={clsx(
										classes.smallText,
										classes.colorGray
									)}
								>
									{`${renderTypes(
										property.projectType
									)} For Sale`}
								</span>
							</div>
						</div>
						<Box
							mt="1rem"
							className={clsx(
								globalClasses.justifyCenter,
								globalClasses.xsTopMargin
							)}
						>
							<div className={globalClasses.alignCenterOnly}>
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
						</Box>
						<Box className={globalClasses.justifyCenter}>
							<div className={globalClasses.alignCenterOnly}>
								<img
									src={tag}
									alt="Tag"
									className={clsx(classes.icon)}
								/>
								<h4 className={classes.locationText}>
									{renderTypes(property.projectType)},
									&nbsp;&nbsp;
									{toHumanReadble(property.totalLandArea)}
									Acres, &nbsp;&nbsp;{property.usp}
								</h4>
							</div>
						</Box>
						<Box className={globalClasses.justifyCenter}>
							<div className={globalClasses.alignCenterOnly}>
								<ApartmentIcon
									className={globalClasses.colorUtil}
								/>
								<h4 className={classes.locationText}>
									{property.builder.developerName},
								</h4>
							</div>
						</Box>

						<Box mt="2rem" className={globalClasses.smTopMargin}>
							<Apartment
								property={property}
								propertyItems={propertyItems}
							/>
						</Box>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
