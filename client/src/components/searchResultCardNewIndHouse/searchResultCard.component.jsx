import { Box, Divider, Grid, Paper } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import {
	capitalizeFirstLetter,
	parseDate,
	renderPerSqft,
	renderStatus,
} from '../../utils/render.utils';

import ContactDialogueWithMessage from '../contactOwner/contactOwnerWithMessage.component';
import DoneIcon from '@material-ui/icons/Done';
import PropertyShare from '../propertyShare/propertyShare.component';
import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchResultCard.styles';

const showRera = (clearance) => {
	const reraDetails = clearance.find((c) => c.name === 'reraapproved');

	return reraDetails && reraDetails.value;
};

const parsetType = (type) => (type === 'newbooking' ? 'NEW BOOKING' : 'RESALE');
const calculateBirthRooms = (types) => {
	let i = 0;
	types.forEach((element) => {
		i += element.numbers;
	});
	return i;
};

const ResultCard = ({ independent, property, edit = false }) => {
	const history = useHistory();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
	const [contactOpen, setContactOpen] = React.useState(false);

	const handleOpen = (_) => {
		setOpen(true);
	};
	const editProperty = (_) => {
		history.push(`/edit-property/${property.id}`);
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
										to={`/property-details/${property.id}`}
										target="_blank"
										className={classes.linkTitle}
									>
										<b>{property.title}</b>
									</Link>

									<br />

									{/* <VerifiedUserIcon
										className={classes.verified}
									/> */}
									{showRera(property.legalClearance) && (
										<Box className={classes.reraWrapper}>
											<Box>RERA</Box>
											<DoneIcon
												className={classes.shareIcon}
											/>
										</Box>
									)}
								</Box>
								<span className={classes.info}>
									{property.city.name},
									{property.location.name}
								</span>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box className={classes.locationWrapper}>
									<Box display="flex">
										<Box
											className={classes.pType}
											mr="1rem"
										>
											{parsetType(
												property.transactionType
											)}
										</Box>
										<Box className={classes.price}>
											₹ {property.salePrice / 100000}L
										</Box>
									</Box>
									<Box className={classes.info} mt="0.5rem">
										{' '}
										{renderPerSqft(property)} per sq.ft.{' '}
										{property.salePriceOver}
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Box mt="1rem">
							<Grid container spacing={3}>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>Land</Box>
										<Box>
											<b>{property.carpetArea} Sq.ft</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Possession On
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
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Super builtup Area
										</Box>
										<Box>
											<b>
												{property.superBuiltupArea}{' '}
												Sq.ft
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Birthrooms
										</Box>
										<Box>
											<b>
												{calculateBirthRooms(
													property.toiletTypes
												)}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Facing
										</Box>
										<Box>
											<b>
												{property.facing
													? property.facing
													: 'Not specified'}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Car parking
										</Box>
										<Box>
											<b>
												{capitalizeFirstLetter(
													property.carParking
												)}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Property on floor
										</Box>
										<Box>
											<b>
												{property.floor
													? property.floor
													: 'Not specified'}
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={3}>
									<Box>
										<Box className={classes.info}>
											Furnishing status
										</Box>
										<Box>
											<b>
												{capitalizeFirstLetter(
													property.furnished
												)}
											</b>
										</Box>
									</Box>
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
