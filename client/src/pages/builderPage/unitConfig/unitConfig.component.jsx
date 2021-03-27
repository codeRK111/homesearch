import PropTypes from 'prop-types';
import React from 'react';
import { Box, Grid, Card, Button } from '@material-ui/core';
import { useStyles } from '../project.style';
import { renderImage, returnValidImage } from '../../../utils/render.utils';
import clsx from 'clsx';
import useGlobalStyle from '../../../common.style';

const UnitWrapper = ({ project, properties }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyle();

	const renderHighlights = (project) => {
		switch (project.projectType) {
			case 'independenthouse':
			case 'flat':
				return (
					<Card variant="outlined">
						<Box padding="1rem">
							<Grid container spacing={3}>
								{properties.map((c) => (
									<Grid item xs={12} md={4} key={c.id}>
										<Card variant="outlined">
											<Grid container spacing={1}>
												<Grid item xs={12}>
													<Box
														className={
															classes.unitImageWrapper
														}
													>
														<img
															src={renderImage(
																returnValidImage(
																	c
																)
															)}
															alt="Property"
															className={
																classes.unitImage
															}
														/>
													</Box>
												</Grid>
												<Grid item xs={12}>
													<div
														className={
															classes.gridContainerSmallGap
														}
													>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Unit Type
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{
																	c.numberOfBedrooms
																}{' '}
																BHK
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Super Built-Up
																Area
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{
																	c.superBuiltupArea
																}{' '}
																Sq.Ft
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Carpet Area
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{c.carpetArea}{' '}
																Sq.Ft
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Price
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																₹{' '}
																{c.minPrice /
																	100000}{' '}
																L -{' '}
																{c.maxPrice /
																	100000}{' '}
																L
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Units
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{
																	c.numberOfUnits
																}
															</h3>
														</Box>
													</div>
												</Grid>
											</Grid>
											<Box
												mt="1rem"
												className={
													globalClasses.flexCenter
												}
											>
												<Button
													size="small"
													color="primary"
													fullWidth
												>
													View Details
												</Button>
											</Box>
										</Card>
									</Grid>
								))}
							</Grid>
						</Box>
					</Card>
				);

			case 'land':
				return (
					<Card variant="outlined">
						<Box padding="1rem">
							<Grid container spacing={3}>
								{properties.map((c) => (
									<Grid item xs={12} md={4} key={c.id}>
										<Card variant="outlined">
											<Grid container spacing={1}>
												<Grid item xs={12}>
													<Box
														className={
															classes.unitImageWrapper
														}
													>
														<img
															src={renderImage(
																returnValidImage(
																	c
																)
															)}
															alt="Property"
															className={
																classes.unitImage
															}
														/>
													</Box>
												</Grid>
												<Grid item xs={12}>
													<div
														className={
															classes.gridContainerSmallGap
														}
													>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Unit Type
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																Land
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Plot Area
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{`${Math.min(
																	...c.plotArea
																)} - ${Math.max(
																	...c.plotArea
																)}`}{' '}
																Sq.Ft
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Plot Frontage
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{c.plotFrontage}{' '}
																Sq.Ft
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Price
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																₹{' '}
																{c.minPrice /
																	100000}{' '}
																L -{' '}
																{c.maxPrice /
																	100000}{' '}
																L
															</h3>
														</Box>
														<Box
															display="flex"
															flexDirection="column"
															alignItems="center"
														>
															<p
																className={clsx(
																	classes.noSpace,
																	classes.garyColor,
																	classes.detailsKey
																)}
															>
																Units
															</p>
															<h3
																className={clsx(
																	classes.noSpace,
																	classes.detailsValue
																)}
															>
																{
																	c.numberOfUnits
																}
															</h3>
														</Box>
													</div>
												</Grid>
											</Grid>
											<Box
												mt="1rem"
												className={
													globalClasses.flexCenter
												}
											>
												<Button
													size="small"
													color="primary"
													fullWidth
												>
													View Details
												</Button>
											</Box>
										</Card>
									</Grid>
								))}
							</Grid>
						</Box>
					</Card>
				);

			default:
				break;
		}
	};
	return <React.Fragment>{renderHighlights(project)}</React.Fragment>;
};

UnitWrapper.propTypes = {
	project: PropTypes.object.isRequired,
};

export default UnitWrapper;
