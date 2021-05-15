import { Box, Grid, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ChipWrapper from '../../../components/v2/chipWrapper/chipWrapper.component';
import DropDown from '../../../components/v2/chipDropdown/chipDropdown.component';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import Nav from '../../../components/v2/pageNav/nav.component';
import PlanWrapper from '../../../components/v2/amenity/amenity.component';
import React from 'react';
import Select from '../../../components/v2/chipSelect/chipSelected.component';
import TodayIcon from '@material-ui/icons/Today';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './postPage.style';

const PostProperty = () => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	return (
		<div>
			<Nav />
			<Box className={classes.wrapper}>
				<Typography>Home/Post Property/Resale</Typography>

				<Box className={classes.contentWrapper}>
					<Typography variant="h4" gutterBottom>
						Post Property
					</Typography>
					<Typography>
						Sell/Rent your property in just some clicks
					</Typography>
					<Box mt="2rem">
						<Typography variant="h5" gutterBottom align="center">
							Tell us about your property
						</Typography>
						<Typography align="center">
							List property for
						</Typography>
					</Box>
					<Box className={classes.alignCenter} mt="1rem">
						<Select>Sell</Select>
						<Box ml="2rem">
							<Select>Rent</Select>
						</Box>
					</Box>
					<Box className={classes.alignCenter} mt="2rem">
						<DropDown size="md" label="City" />
						<Box ml="2rem">
							<DropDown size="md" label="Location" />
						</Box>
					</Box>
					{/* Property Type */}
					<Box mt="2rem" className={classes.contentWrapper}>
						<Typography variant="h5" gutterBottom align="center">
							Property Type
						</Typography>
						<Box mt="1rem" className={classes.alignCenter}>
							<Select>Apartment</Select>
							<Box ml="1rem">
								<Select>Duplex</Select>
							</Box>
							<Box ml="1rem">
								<Select>Triplex</Select>
							</Box>
							<Box ml="1rem">
								<Select>Simplex</Select>
							</Box>
							<Box ml="1rem">
								<Select>Penthouse</Select>
							</Box>
							<Box ml="1rem">
								<Select>Plot</Select>
							</Box>
						</Box>
					</Box>
					{/* Basic Details  */}
					<Box mt="3rem" className={classes.alignCenter}>
						<Box className={classes.alignCenter}>
							<Typography variant="h6">Project Name</Typography>
							<Box ml="1rem">
								<input
									type="text"
									className={clsx(
										classes.input,
										classes.widthLG
									)}
								/>
							</Box>
						</Box>
						<Box className={classes.alignCenter} ml="1rem">
							<Typography variant="h6">
								Property On Floor
							</Typography>
							<Box ml="1rem">
								<input
									type="text"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
						</Box>
						<Box className={classes.alignCenter} ml="1rem">
							<Typography variant="h6">TotalFloors</Typography>
							<Box ml="1rem">
								<input
									type="text"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
						</Box>
					</Box>
					{/* Unit Type  */}
					<Box mt="3rem" className={classes.contentWrapper}>
						<Typography variant="h5" gutterBottom align="center">
							Unit Type
						</Typography>
						<Box mt="1rem" className={classes.alignCenter}>
							<Select>Studio</Select>
							<Box ml="1rem">
								<Select>1BHK</Select>
							</Box>
							<Box ml="1rem">
								<Select>2BHK</Select>
							</Box>
							<Box ml="1rem">
								<Select>3BHK</Select>
							</Box>
							<Box ml="1rem">
								<Select>4BHK</Select>
							</Box>
							<Box ml="1rem">
								<Select>4BHK+</Select>
							</Box>
						</Box>
					</Box>
					{/* Pricing And Area  */}
					<Box mt="2rem" className={classes.rowWrapper}>
						<Grid container justify="center">
							<Grid
								item
								xs={12}
								md={4}
								className={gClasses.justifyCenter}
							>
								<Box className={classes.contentWrapper}>
									<Typography
										variant="h6"
										gutterBottom
										align="center"
									>
										Property Price
									</Typography>
									<Box className={classes.alignCenter}>
										<DropDown
											size="sm"
											label=" ₹0 - 2 Cr"
										/>
										<Box
											className={classes.alignCenter}
											ml="1rem"
										>
											<div>
												<input
													type="checkbox"
													id="male"
													name="gender"
													value="male"
													className={classes.bgShadow}
												/>
												<label for="male">
													<Typography display="inline">
														Negotiable
													</Typography>
												</label>{' '}
												<br />
												<input
													type="checkbox"
													id="male"
													name="gender"
													value="male"
												/>
												<label for="male">
													Includes Registration
												</label>
											</div>
										</Box>
									</Box>
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
								className={gClasses.justifyCenter}
							>
								<Box className={classes.contentWrapper}>
									<Typography
										variant="h6"
										gutterBottom
										align="center"
									>
										Built up area
									</Typography>
									<Box className={classes.alignCenter}>
										<input
											type="text"
											className={clsx(
												classes.input,
												classes.widthSM
											)}
										/>
										<Box
											className={classes.alignCenter}
											ml="1rem"
										>
											<Typography>Sq.ft</Typography>
											<Box>
												<ExpandMoreIcon />
											</Box>
										</Box>
									</Box>
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
								className={gClasses.justifyCenter}
							>
								<Box className={classes.contentWrapper}>
									<Typography
										variant="h6"
										gutterBottom
										align="center"
									>
										Carpet Area
									</Typography>
									<Box className={classes.alignCenter}>
										<input
											type="text"
											className={clsx(
												classes.input,
												classes.widthSM
											)}
										/>
										<Box
											className={classes.alignCenter}
											ml="1rem"
										>
											<Typography>Sq.ft</Typography>
											<Box>
												<ExpandMoreIcon />
											</Box>
										</Box>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Box>
					{/* Photos And Video  */}
					<Box mt="3rem">
						<Typography variant="h5" gutterBottom align="center">
							Add visuals to your property
						</Typography>
					</Box>
					<Box mt="3rem" className={classes.rowWrapper}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={5}>
								<Box className={classes.contentWrapper}>
									<Box mb="1rem">
										<ChipWrapper>
											<Box
												className={
													classes.contentWrapper
												}
											>
												<AddIcon />
												<Typography variant="body2">
													Add Photos
												</Typography>
											</Box>
										</ChipWrapper>
									</Box>
									<Typography
										variant="caption"
										align="center"
									>
										Photos 0/15 increase your chances of
										getting genuine leads by adding at least
										5 photos of Hall, Bedrooms, Kitchen &
										bathrooms.
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={false} md={1}></Grid>
							<Grid item xs={12} md={5}>
								<Box className={classes.contentWrapper}>
									<Box mb="1rem">
										<ChipWrapper>
											<Box
												className={
													classes.contentWrapper
												}
											>
												<AddIcon />
												<Typography variant="body2">
													Add Video
												</Typography>
											</Box>
										</ChipWrapper>
									</Box>
									<Typography
										variant="caption"
										align="center"
									>
										Virtual tour helps people visit the
										property virtually, increase your
										chances of getting the deal by adding a
										walk through video from the entrance
										road to inside your house till your
										rooms and bathrooms
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
					{/* Furnishing  */}
					<Box mt="3rem">
						<Typography variant="h5" gutterBottom align="center">
							Furnishing
						</Typography>
						<Box mt="1rem" className={classes.alignCenter}>
							<Select>Unfurnished</Select>
							<Box ml="1rem">
								<Select>Semi furnished</Select>
							</Box>
							<Box ml="1rem">
								<Select>Fully furnished</Select>
							</Box>
						</Box>
					</Box>
					{/* Other Details  */}
					<Box mt="3rem" className={classes.rowWrapper}>
						<Grid container spacing={3} justify="center">
							<Grid item xs={12} md={4}>
								<Box className={classes.alignCenter}>
									<Typography variant="h6">
										No. of Bedroom
									</Typography>
									<Box ml="1rem">
										<DropDown size="sm" label="0" />
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} md={4}>
								<Box className={classes.alignCenter}>
									<Typography variant="h6">
										No. of Bathroom
									</Typography>
									<Box ml="1rem">
										<DropDown size="sm" label="0" />
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} md={4}>
								<Box className={classes.alignCenter}>
									<Typography variant="h6">
										No. Of Balconies
									</Typography>
									<Box ml="1rem">
										<DropDown size="sm" label="0" />
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Box>
					{/* Availability  */}
					<Box mt="3rem">
						<Typography variant="h5" gutterBottom align="center">
							Available From
						</Typography>
						<Box mt="1rem" className={classes.alignCenter}>
							<ChipWrapper>
								<Box className={classes.alignCenter}>
									<Box ml="1rem">
										<Typography>03-05-2021</Typography>
									</Box>
									<Box ml="1rem">
										<TodayIcon />
									</Box>
								</Box>
							</ChipWrapper>
						</Box>
					</Box>
					{/* User Role  */}
					<Box mt="3rem">
						<Typography variant="h5" gutterBottom align="center">
							Your Details
						</Typography>
						<Typography gutterBottom align="center">
							You are
						</Typography>
						<Box mt="1rem" className={classes.alignCenter}>
							<Select>Owner</Select>
							<Box ml="1rem">
								<Select>Agent</Select>
							</Box>
							<Box ml="1rem">
								<Select>Builder</Select>
							</Box>
						</Box>
					</Box>
					{/* User Details  */}
					<Box mt="3rem" className={classes.userFormWrapper}>
						<Box mt="1.5rem" mb="1.5rem">
							<input
								type="text"
								placeholder="Full Name"
								className={clsx(
									classes.input,
									classes.widthFull
								)}
							/>
						</Box>
						<Box mt="1.5rem" mb="1.5rem">
							<input
								type="text"
								placeholder="Email"
								className={clsx(
									classes.input,
									classes.widthFull
								)}
							/>
						</Box>
						<Box mt="1.5rem" mb="1.5rem">
							<input
								type="text"
								placeholder="Phone Number"
								className={clsx(
									classes.input,
									classes.widthFull
								)}
							/>
						</Box>
						<Box mt="1.5rem" mb="1.5rem">
							<Typography
								variant="caption"
								align="center"
								display="block"
							>
								OTP will be sent to your mobile number
							</Typography>
						</Box>
					</Box>
					{/* Plans  */}
					<Box mt="2rem" className={classes.rowWrapper}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								md={4}
								className={gClasses.justifyCenter}
							>
								<PlanWrapper text=" Free Campaign" />
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
								className={gClasses.justifyCenter}
							>
								<PlanWrapper text=" Paid Campaign" />
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
								className={gClasses.justifyCenter}
							>
								<Link
									className={clsx(
										gClasses.colorLink,
										gClasses.bold
									)}
								>
									See Our Plans
								</Link>
							</Grid>
						</Grid>
					</Box>
					<Box mt="3rem">
						<Typography
							display="block"
							align="center"
							className={gClasses.bold}
						>
							By proceeding you agree to our{' '}
							<Link
								className={clsx(
									gClasses.colorLink,
									gClasses.bold
								)}
							>
								Terms of use
							</Link>{' '}
							&{' '}
							<Link
								className={clsx(
									gClasses.colorLink,
									gClasses.bold
								)}
							>
								Privacy Policy
							</Link>
						</Typography>
					</Box>
					<Box mt="3rem" className={gClasses.justifyCenter}>
						<button className={classes.postButton}>
							Post Ad Now
						</button>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default PostProperty;
