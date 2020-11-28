import { Avatar, Box, Divider, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderInfo,
	renderToilets,
} from '../../utils/render.utils';
import {
	faBed,
	faCalendarAlt,
	faPersonBooth,
	faToilet,
	faUtensils,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from './detailsPage.styles';

const ResaleApartmentDetails = ({ property }) => {
	const classes = useStyles();
	return (
		<div>
			<Box
				display="flex"
				width="100%"
				alignItems="center"
				mb="1rem"
				mt="1rem"
			>
				<Box flexGrow={1}>
					<Divider />
				</Box>
				<Box pl="0.5rem" pr="0.5rem">
					<h3 className={classes.title}>Property Details</h3>
				</Box>
				<Box flexGrow={1}>
					<Divider />
				</Box>
			</Box>
			<Grid container>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faBed} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Room type</Box>
							<h4 className={classes.title}>
								{capitalizeFirstLetter(
									renderInfo(property.roomType)
								)}
							</h4>
						</Box>
					</Box>
				</Grid>

				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faPersonBooth} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Available For</Box>
							<ul className="ul">
								{property.availableFor.map((c, i) => (
									<li key={i}>
										<h4 className={classes.title}>
											{capitalizeFirstLetter(c)}
										</h4>
									</li>
								))}
							</ul>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faUtensils} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Fooding</Box>
							{property.fooding.length === 0 ? (
								<b>Not available</b>
							) : (
								<ul className="ul">
									{property.fooding.map((c, i) => (
										<li key={i}>
											<h4 className={classes.title}>
												{capitalizeFirstLetter(c)}
											</h4>
										</li>
									))}
								</ul>
							)}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faUtensils} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Food Schdule</Box>
							{property.foodSchedule.length === 0 ? (
								<b>Not available</b>
							) : (
								<ul className="ul">
									{property.foodSchedule.map((c, i) => (
										<li key={i}>
											<h4 className={classes.title}>
												{capitalizeFirstLetter(c)}
											</h4>
										</li>
									))}
								</ul>
							)}
						</Box>
					</Box>
				</Grid>

				<Grid item xs={6} md={3}>
					<Box
						className={classes.p1Details}
						display="flex"
						flexWrap="wrap"
					>
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faToilet} />
							</Avatar>
						</Box>
						<Box
							display="flex"
							flexDirection="column"
							flexWrap="wrap"
						>
							<Box>Toilets</Box>
							<h4 className={classes.title}>
								{renderToilets(property.toiletTypes)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faToilet} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Toilet type</Box>
							<h4 className={classes.title}>
								{capitalizeFirstLetter(
									renderInfo(property.typeOfToilets)
								)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faCalendarAlt} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Notice Period</Box>
							<h4 className={classes.title}>
								{property.noticePeriod}
							</h4>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

ResaleApartmentDetails.propTypes = {
	property: PropTypes.object.isRequired,
};

export default ResaleApartmentDetails;
