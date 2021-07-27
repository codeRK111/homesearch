import { Box, Grid, Typography } from '@material-ui/core';

import React from 'react';
import { renderMinAndMax } from '../../../utils/render.utils';
import useStyles from './searchResultCard.styles';

const ResultCard = ({ property, propertyItems }) => {
	const classes = useStyles();

	return (
		<div>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Box>
						<Grid container>
							<Grid item xs={12} md={6}>
								<Box display="flex" flexDirection="column">
									{/* {rera['show'] && (
										<Box
											display="flex"
											className={classes.reraWrapper}
										>
											<Box>RERA</Box>
											<DoneIcon
												className={classes.reraIcon}
											/>
										</Box>
									)} */}
								</Box>
							</Grid>
						</Grid>
						<Box>
							<Grid container>
								<Grid item xs={6}>
									<Box>
										<Box>
											<b>
												{renderMinAndMax(
													propertyItems.map(
														(c) =>
															c.superBuiltupArea
													)
												)}{' '}
												Sq.Ft
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6}>
									<Box>
										<Box>
											<b>
												₹{' '}
												{Math.min(
													...propertyItems.map((c) =>
														Number(
															c.minPrice / 100000
														)
													)
												)}{' '}
												Lacs -{' '}
												{Math.max(
													...propertyItems.map((c) =>
														Number(
															c.maxPrice / 100000
														)
													)
												)}{' '}
												Lacs
											</b>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<Grid container className={classes.header}>
								<Grid item xs={4} className={classes.cell}>
									Unit Type
								</Grid>
								<Grid item xs={4} className={classes.cell}>
									Size
								</Grid>
								<Grid item xs={4} className={classes.cell}>
									Price
								</Grid>
							</Grid>
							<Box className={classes.itemWrapper}>
								{propertyItems.map((c) => (
									<Grid
										container
										className={classes.item}
										key={c}
									>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											<Typography variant="caption">
												{c.numberOfBedrooms} BHK
											</Typography>
										</Grid>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											<Typography variant="caption">
												{c.superBuiltupArea} Sq.Ft
											</Typography>
										</Grid>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											<Typography variant="caption">
												₹ {c.minPrice / 100000} L -{' '}
												{c.maxPrice / 100000} L
											</Typography>
										</Grid>
									</Grid>
								))}
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default ResultCard;
