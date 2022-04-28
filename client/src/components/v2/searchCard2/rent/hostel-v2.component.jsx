import '../extra.css';

import { Box, Grid } from '@material-ui/core';
import { StaticPaths, renderTypes } from '../../../../utils/render.utils';
import { location2, tag } from '../../../../utils/statc';

import HighlightContainer from '../highlightContainer';
import LogoWithText from '../logo';
import React from 'react';
import TitleContainer from '../titleContainer';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'dayjs';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../searchCard-v2.style';

const PropertyCard = ({ property, edit = false }) => {
	const m = moment(property.createdAt);
	const img = property.photos[0]
		? property.photos.find((c) => c.default)
			? StaticPaths.property(property.photos.find((c) => c.default).image)
			: StaticPaths.property(property.photos[0].image)
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
			<Grid container spacing={5}>
				<Grid item xs={12} md={6}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							<div className={classes.dateWrapperCard}>
								<span>{m.format('D')}</span>
								<span>{m.format('MMM')}</span>
							</div>
						</div>
						<img src={img} alt="Flat" />
					</div>
				</Grid>
				<Grid item xs={12} md={5}>
					<Box>
						<Box display="flex">
							<LogoWithText text="For Rent" />
							<TitleContainer
								ml="1rem"
								title={property.title}
								desc={`${
									property.numberOfBedRooms
								}BHK ${renderTypes(property.type)} For Rent`}
							/>
						</Box>
						<Box mt="1rem">
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
						<Box>
							<div className={globalClasses.alignCenterOnly}>
								<img
									src={tag}
									alt="Tag"
									className={clsx(classes.icon)}
								/>
								<h4 className={classes.locationText}>
									{renderTypes(property.type)}, &nbsp;&nbsp;
									{property.superBuiltupArea}
									Sq.Ft, &nbsp;&nbsp;{property.usp}
								</h4>
							</div>
						</Box>
						<Box mt="1rem">
							<Grid container spacing={3}>
								<Grid item xs={12} md={6}>
									<HighlightContainer
										title="Rent / Month"
										value={`${property.rent / 1000}K`}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<HighlightContainer
										title="Security Deposit"
										value={`${
											property.securityDeposit / 1000
										}K`}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<HighlightContainer
										title="Notice Period [In days]"
										value={property.noticePeriod}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<HighlightContainer
										title="Maintainance Fee Per Month"
										value={
											property.maintainanceFee
												? `${
														property.maintainanceFee /
														1000
												  }K`
												: 0
										}
									/>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyCard;
