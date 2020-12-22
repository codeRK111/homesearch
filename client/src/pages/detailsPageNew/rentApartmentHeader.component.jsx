import { Box, Grid, Paper } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { capitalizeFirstLetter } from '../../utils/render.utils';
import { useMediaQuery } from '@material-ui/core';
import useStyles from './detailsPage.styles';

const Header = ({ property }) => {
	const mobile = useMediaQuery('(max-width:600px)');
	const classes = useStyles();
	return (
		<div>
			{!mobile && (
				<Paper elevation={1} className={classes.p1}>
					<Grid container>
						<Grid
							item
							xs={6}
							md={1}
							className={[
								classes.borderRight,
								classes.center,
							].join(' ')}
						>
							<h3 className={classes.title}>
								{capitalizeFirstLetter(property.for)}
							</h3>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
							className={[classes.borderRight].join(' ')}
						>
							<Box ml="1rem">
								<h3 className={classes.title}>
									{property.title}
								</h3>
								<Box mt="0.3rem">
									<span>
										{property.location &&
											property.location.name}
										,{property.city && property.city.name}
									</span>
								</Box>
							</Box>
						</Grid>
						<Grid
							item
							xs={6}
							md={2}
							className={[
								classes.borderRight,
								classes.center,
							].join(' ')}
						>
							<Box ml="1rem">
								<h3 className={classes.title}>
									{' '}
									₹{property.rent / 1000}K
								</h3>
								<Box mt="0.3rem">
									Security Deposit: ₹{' '}
									{property.securityDeposit / 1000}K
								</Box>
							</Box>
						</Grid>

						<Grid
							item
							xs={6}
							md={2}
							className={[classes.center].join(' ')}
						>
							<Box ml="1rem">
								<h3 className={classes.title}>
									{' '}
									{property.carpetArea
										? `${property.carpetArea} Sq.ft`
										: 'Not Specified'}
								</h3>
								<Box mt="0.3rem">(Carpet)</Box>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			)}
			{mobile && (
				<Paper elevation={1} className={classes.p1}>
					<Grid container>
						<Grid item xs={12}>
							<Box mb="1.5rem">
								<h3 className={classes.title}>
									{property.title}
								</h3>
								<Box mt="0.3rem">
									<span>
										{property.location &&
											property.location.name}
										,{property.city && property.city.name}
									</span>
								</Box>
							</Box>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={6}>
							<h3 className={classes.title}>
								{capitalizeFirstLetter(property.for)}
							</h3>
						</Grid>
						<Grid item xs={6}>
							<Box>
								<h3 className={classes.title}>
									{' '}
									₹{property.rent / 1000}K
								</h3>
								<Box mt="0.3rem">
									Security Deposit: ₹{' '}
									{property.securityDeposit / 1000}K
								</Box>
							</Box>
						</Grid>

						<Grid item xs={6}>
							<Box>
								<h3 className={classes.title}>
									{property.carpetArea
										? `${property.carpetArea} Sq.ft`
										: 'Not Specified'}
								</h3>
								<Box mt="0.3rem">(Carpet)</Box>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			)}
		</div>
	);
};
Header.propTypes = {
	property: PropTypes.object.isRequired,
};

export default Header;
