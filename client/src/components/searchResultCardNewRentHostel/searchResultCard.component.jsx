import { Box, Divider, Grid, Paper } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import {
	capitalizeFirstLetter,
	renderInfo,
	renderStatus,
	shortLength,
} from '../../utils/render.utils';

import ContactDialogueWithMessage from '../contactOwner/getOwnerPropertyDetails.component';
import PropertyShare from '../propertyShare/propertyShare.component';
import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchResultCard.styles';

const parseDate = (date) => {
	let m = moment(date);
	return m.format('MMM Do YY');
};

// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Custom components

const ResultCard = ({ independent, property, edit = false }) => {
	const classes = useStyles();
	const history = useHistory();
	const mobile = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = React.useState(false);
	const [contactOpen, setContactOpen] = React.useState(false);

	const handleOpen = (_) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleContactOpen = (_) => {
		setContactOpen(true);
	};

	const handleContactClose = (_) => {
		setContactOpen(false);
	};

	const editProperty = (_) => {
		history.push(`/edit-property/${property.id}`);
	};
	const justifyContent = mobile
		? { justifyContent: 'flex-start' }
		: { justifyContent: 'flex-end' };
	return (
		<Paper className={classes.fontAbel}>
			<ContactDialogueWithMessage
				status={contactOpen}
				handleClose={handleContactClose}
				title={`Contact ${capitalizeFirstLetter(property.postedBy)}`}
				property={property}
				queryOn="property"
			/>
			<PropertyShare
				status={open}
				handleClose={handleClose}
				data={property}
			/>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<img
						src={
							property.image1
								? `/assets/properties/${property.image1}`
								: require('../../assets/no-image.jpg')
						}
						alt="property"
						className={classes.image}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box p="1rem">
						<Box
							display="flex"
							justifyContent="flex-end"
							mb="1rem"
						></Box>
						<Grid container>
							<Grid item xs={12} md={6}>
								<Box display="flex" alignItems="center">
									<Link
										to={`/property-details/${property.id}`}
										className={classes.linkTitle}
										target="_blank"
									>
										<b>{property.title}</b>
									</Link>

									<br />

									{/* <VerifiedUserIcon
										className={classes.verified}
									/> */}
								</Box>
								<span className={classes.info}>
									{property.city.name},
									{property.location.name}
								</span>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box className={classes.locationWrapper}>
									<Box display="flex">
										<Box className={classes.price}>
											Rent: ₹ {property.rent / 1000}K
										</Box>
									</Box>
									<Box className={classes.info} mt="0.5rem">
										{' '}
										Deposit: ₹{' '}
										{property.securityDeposit / 1000}K
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Box mt="1rem">
							<Grid container spacing={3}>
								<Grid item xs={6} md={4}>
									<Box>
										<Box className={classes.info}>
											Room type
										</Box>
										<Box>
											<b>
												{capitalizeFirstLetter(
													renderInfo(
														property.roomType
													)
												)}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}>
									<Box>
										<Box className={classes.info}>
											Available from
										</Box>
										<Box>
											<b>
												{property.availability ===
												'immediately'
													? 'Ready To Move'
													: parseDate(
															property.availableDate
													  )}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}>
									<Box>
										<Box className={classes.info}>
											Type of toilets
										</Box>
										<Box>
											<b>
												{capitalizeFirstLetter(
													renderInfo(
														property.typeOfToilets
													)
												)}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}>
									<Box mt="1rem">
										<Box className={classes.info}>
											Notice period
										</Box>
										<Box>
											<b>{property.noticePeriod} days</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}>
									<Box>
										<Box className={classes.info}>
											Available For
										</Box>
										<Box>
											<ul className="ul">
												{property.availableFor.map(
													(c, i) => (
														<li key={i}>
															<b>
																{capitalizeFirstLetter(
																	c
																)}
															</b>
														</li>
													)
												)}
											</ul>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}>
									<Box>
										<Box className={classes.info}>
											Fooding
										</Box>
										<Box>
											{property.fooding.length === 0 ? (
												<b>Not available</b>
											) : (
												<ul className="ul">
													{property.fooding.map(
														(c, i) => (
															<li key={i}>
																<b>
																	{capitalizeFirstLetter(
																		c
																	)}
																</b>
															</li>
														)
													)}
												</ul>
											)}
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}></Grid>
								<Grid item xs={6} md={4}></Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<Divider />
						</Box>
						<Grid container>
							<Grid item xs={12} md={4}>
								<p className={classes.info}>
									{shortLength(property.description, 100)}
								</p>
							</Grid>
							<Grid item xs={12} md={8}>
								{edit ? (
									<Box
										mt="1rem"
										display="flex"
										justifyContent="flex-end"
									>
										{property.status !== 'active' ? (
											<Box className={classes.price}>
												{renderStatus(property.status)}
											</Box>
										) : (
											<button
												className={classes.details}
												onClick={editProperty}
											>
												Edit
											</button>
										)}
									</Box>
								) : (
									<Box
										mt="1rem"
										display="flex"
										justifyContent="flex-end"
										className={classes.smLeft}
									>
										<Box display="flex">
											<button
												className={classes.whatsapp}
												onClick={handleOpen}
											>
												<Box
													display="flex"
													alignItems="center"
												>
													<WhatsAppIcon
														className={
															classes.shareIcon2
														}
													/>
													<Box ml="0.2rem">
														Chat now
													</Box>
												</Box>
											</button>
											<button
												className={classes.details}
												onClick={handleContactOpen}
											>
												Get{' '}
												{capitalizeFirstLetter(
													property.postedBy
												)}{' '}
												Details
											</button>
										</Box>
									</Box>
								)}
								<Box
									className={classes.info}
									mt="0.5rem"
									display="flex"
									{...justifyContent}
								>
									Posted on - {parseDate(property.createdAt)}
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ResultCard;
