import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import { renderPriceOver } from '../../../utils/render.utils';
import { useMediaQuery } from '@material-ui/core';
import useStyles from '../propertyDetails.style';

const Header = ({ property }) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	return (
		<Box>
			{!mobile && (
				<Paper elevation={1} className={classes.p1}>
					<Grid container>
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
							</Box>
						</Grid>
						<Grid
							item
							xs={6}
							md={3}
							className={[
								classes.borderRight,
								classes.center,
							].join(' ')}
						>
							<Box ml="1rem">
								<h3 className={classes.title}>
									{' '}
									₹
									{`${property.minPrice / 100000} - ${
										property.maxPrice / 100000
									}`}{' '}
									Lacs {renderPriceOver(property.priceOver)}
								</h3>
							</Box>
						</Grid>
						<Grid
							item
							xs={6}
							md={3}
							className={[classes.center].join(' ')}
						>
							<Box ml="1rem">
								<h3 className={classes.title}>
									{' '}
									{property.carpetArea} Sq.ft (Carpet)
								</h3>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			)}
			{mobile && (
				<Paper elevation={1} className={classes.p1}>
					<Grid container>
						<Grid item xs={12}>
							<Box
								mb="1.5rem"
								display="flex"
								justifyContent="center"
							>
								<h3 className={classes.title}>
									{property.title}
								</h3>
							</Box>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={6}>
							<Box>
								<h3 className={classes.title}>
									{' '}
									₹{' '}
									{`${property.minPrice / 100000} - ${
										property.maxPrice / 100000
									}`}{' '}
									Lacs
								</h3>
								<Box>{renderPriceOver(property.priceOver)}</Box>

								{/* <Box mt="0.3rem">{renderPriceOver(property.priceOver)}</Box> */}
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box>
								<h3 className={classes.title}>
									{' '}
									{property.carpetArea} Sq. ft
								</h3>
								<Box mt="0.3rem">(Carpet)</Box>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			)}
		</Box>
	);
};

export default Header;
