import { Box, Divider, Grid, Paper } from '@material-ui/core';

import { Link } from 'react-router-dom';
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

const ResultCard = ({ independent, property }) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = React.useState(false);

	const handleOpen = (_) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const justifyContent = mobile
		? { justifyContent: 'flex-start' }
		: { justifyContent: 'flex-end' };
	return (
		<Paper>
			<PropertyShare
				status={open}
				handleClose={handleClose}
				id="djshd123"
			/>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<img
						src={
							property.image1
								? property.image1
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
										to="/property/123/details/rent/hostel"
										className={classes.linkTitle}
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
							<Grid container>
								<Grid item xs={12} md={6}>
									<Grid container>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Room type
												</Box>
												<Box>
													<b>
														{property.numberOfRoomMates ===
														1
															? 'Private'
															: 'Shared'}
													</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
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
									</Grid>
									<Grid container>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Type of toilets
												</Box>
												<Box>
													<b>
														{property.typeOfToilets}
													</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Notice period
												</Box>
												<Box>
													<b>
														{property.noticePeriod}{' '}
														days
													</b>
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} md={6}>
									<Grid container className={classes.margin}>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Available For
												</Box>
												<Box>
													<b>
														{property.availableFor.join(
															','
														)}
													</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Fooding
												</Box>
												<Box>
													<b>Non veg,Veg</b>
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<Divider />
						</Box>
						<Grid container>
							<Grid item xs={12} md={6}>
								<p className={classes.info}>
									{property.description}
								</p>
							</Grid>
							<Grid item xs={12} md={6}>
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
											<WhatsAppIcon
												className={classes.shareIcon2}
											/>
										</button>
										<button className={classes.details}>
											Get Owner Details
										</button>
									</Box>
								</Box>
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
