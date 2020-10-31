import {
	Avatar,
	Box,
	Chip,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	Tooltip,
} from '@material-ui/core';
import {
	faBed,
	faBuilding,
	faCalendarAlt,
	faCarSide,
	faCouch,
	faCrown,
	faMap,
	faPersonBooth,
	faQuestionCircle,
	faToilet,
} from '@fortawesome/free-solid-svg-icons';

import AirportIcon from '@material-ui/icons/Flight';
import AppBar from '../../components/appBar/appBar.component';
import BusIcon from '@material-ui/icons/DirectionsBus';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Center } from '../../components/flexContainer/flexContainer.component';
import FlagIcon from '@material-ui/icons/Flag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/footer/footer.component';
import HomeIcon from '@material-ui/icons/Home';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import HotTubIcon from '@material-ui/icons/HotTub';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PersonIcon from '@material-ui/icons/Person';
import PropertyImages from '../../components/propertyImages/propertyImages.component';
import RailwayIcon from '@material-ui/icons/Tram';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import SearchFeedbackForm from '../../components/searchFeedbackForm/searchFeedBackForm.component';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SimilarProperties from '../../components/similarProperties/resaleApartment.component';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import useStyles from './propertyDetails.style';

// import BedroomIcon from '@material-ui/icons/Hotel';

const arr = Array.from(Array(10).keys());
const distance = [
	{
		label: 'School',
		distance: '2',
		icon: <SchoolIcon />,
	},
	{
		label: 'Railway Station',
		distance: '2',
		icon: <RailwayIcon />,
	},
	{
		label: 'Airport',
		distance: '2',
		icon: <AirportIcon />,
	},
	{
		label: 'Bus stop',
		distance: '2',
		icon: <BusIcon />,
	},
	{
		label: 'Hospital',
		distance: '2',
		icon: <HospitalIcon />,
	},
];
const PropertyDetails = ({ independent }) => {
	const classes = useStyles();
	const [feedback, setFeedBack] = React.useState({
		status: false,
		positive: true,
	});
	const mobile = useMediaQuery('(max-width:600px)');

	const onFeedback = (status) => (_) =>
		setFeedBack({ status: true, positive: status });

	return (
		<Box className={classes.pageWrapper}>
			<AppBar />
			<Box className={classes.detailsWrapper}>
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
								<h3 className={classes.title}>Rent</h3>
							</Grid>
							<Grid
								item
								xs={6}
								md={7}
								className={[classes.borderRight].join(' ')}
							>
								<Box ml="1rem">
									<h3 className={classes.title}>
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Tempore, excepturi.
									</h3>
									<Box mt="0.3rem">
										<span>
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit.
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
									<h3 className={classes.title}> 20K</h3>
									<Box mt="0.3rem">
										Security Deposit: ₹ 40K
									</Box>
								</Box>
							</Grid>
							<Grid
								item
								xs={6}
								md={1}
								className={[classes.center].join(' ')}
							>
								<Box ml="1rem">
									<h3 className={classes.title}> 1000</h3>
									<Box mt="0.3rem">Sq.ft</Box>
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
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Tempore, excepturi.
									</h3>
									<Box mt="0.3rem">
										<span>
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit.
										</span>
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={6}>
								<h3 className={classes.title}>Rent</h3>
							</Grid>
							<Grid item xs={6}>
								<Box>
									<h3 className={classes.title}> 20K</h3>
									<Box mt="0.3rem">security: ₹ 4500</Box>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box mt="1rem">
									<h3 className={classes.title}> 1000</h3>
									<Box mt="0.3rem">Sq.ft</Box>
									<Box mt="0.3rem">(Carpet)</Box>
								</Box>
							</Grid>
						</Grid>
					</Paper>
				)}
				<Box mt="1rem">
					<Paper className={classes.p1}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={4}>
								<PropertyImages />
							</Grid>
							<Grid item xs={12} md={8}>
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
									<Box pl="0.3rem" pr="0.3rem">
										<h3 className={classes.title}>
											Property Details
										</h3>
									</Box>
									<Box flexGrow={1}>
										<Divider />
									</Box>
								</Box>
								<Grid container>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faBed}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Bedrooms</Box>
												<h4 className={classes.title}>
													1 Bedroom
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faBed}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Balconies</Box>
												<h4 className={classes.title}>
													1
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faPersonBooth}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Available For</Box>
												<h4 className={classes.title}>
													Men,Boys
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faMap}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Super builtup area</Box>
												<h4 className={classes.title}>
													1000 Sq.Ft
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faMap}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Carpet Area</Box>
												<h4 className={classes.title}>
													900 Sq.Ft
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faQuestionCircle}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Availability</Box>
												<h4 className={classes.title}>
													Ready to move
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faCarSide}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Car Parking</Box>
												<h4 className={classes.title}>
													Open
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faCouch}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Furnishing</Box>
												<h4 className={classes.title}>
													Furnished
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faToilet}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Toilets</Box>
												<h4 className={classes.title}>
													4
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faCrown}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Ownership</Box>
												<h4 className={classes.title}>
													Freehold
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faBuilding}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Number of floors</Box>
												<h4 className={classes.title}>
													4
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faBuilding}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Property on floor</Box>
												<h4 className={classes.title}>
													2
												</h4>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={6} md={3}>
										<Box
											className={classes.p1Details}
											display="flex"
										>
											<Box pl="0.5rem" pr="0.5rem">
												<Avatar>
													<FontAwesomeIcon
														icon={faCalendarAlt}
													/>
												</Avatar>
											</Box>
											<Box
												display="flex"
												flexDirection="column"
											>
												<Box>Notice Period</Box>
												<h4 className={classes.title}>
													10 days
												</h4>
											</Box>
										</Box>
									</Grid>
								</Grid>

								<Box mt="1rem">
									<Grid container>
										<Grid
											item
											xs={12}
											md={4}
											className={classes.p1Details}
										>
											<Grid container>
												<Grid item xs={4} md={3}>
													<Tooltip
														title="Request photo"
														aria-label="add"
													>
														<button
															className={
																classes.iconButton
															}
														>
															<CameraAltIcon />
														</button>
													</Tooltip>
												</Grid>

												<Grid item xs={4} md={3}>
													<Tooltip
														title="Report Abuse"
														aria-label="add"
													>
														<button
															className={
																classes.iconButton
															}
														>
															<FlagIcon />
														</button>
													</Tooltip>
												</Grid>
												<Grid item xs={4} md={3}>
													<Tooltip
														title="Report Sold out"
														aria-label="add"
													>
														<button
															className={
																classes.iconButton
															}
														>
															<HomeIcon />
														</button>
													</Tooltip>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12} md={8}>
											<Box
												display="flex"
												justifyContent="flex-end"
												className={
													classes.chatButtonWrapper
												}
											>
												<Box display="flex">
													<button
														className={
															classes.chatButton
														}
													>
														<Box
															display="flex"
															alignItems="center"
														>
															<WhatsAppIcon
																className={
																	classes.whIcon
																}
															/>
															Chat now
														</Box>
													</button>

													<Box ml="1rem">
														<button
															className={
																classes.contactButton
															}
														>
															<Box
																display="flex"
																alignItems="center"
															>
																<PersonIcon
																	className={
																		classes.cWhite
																	}
																/>
																Contact Owner
															</Box>
														</button>
													</Box>
												</Box>
											</Box>
											<Box
												mt="0.5rem"
												display="flex"
												justifyContent="flex-end"
												className={
													classes.chatButtonWrapper
												}
											>
												Posted on: <b>29th Sept</b>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Grid>
						</Grid>
						<Box mt="2rem">
							<h3>Brief Description</h3>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Facere saepe, error maiores soluta maxime
							dicta quo molestiae itaque harum numquam quasi
							reprehenderit distinctio adipisci consequuntur ex
							recusandae id ullam dolor? Libero vero, tempore
							doloribus recusandae quod illo voluptates deleniti
							explicabo.
						</Box>
						<Box mt="2rem">
							<h3>Restrictions</h3>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Facere saepe, error maiores soluta maxime
							dicta quo molestiae itaque harum numquam quasi
							reprehenderit distinctio adipisci consequuntur ex
							recusandae id ullam dolor? Libero vero, tempore
							doloribus recusandae quod illo voluptates deleniti
							explicabo.
						</Box>
						<Box
							mt="2rem"
							p="1rem"
							className={classes.feedbackWrapper}
						>
							<h3>Search feedback</h3>
							<Box>Did you find what you were looking for?</Box>
							<Box display="flex" mt="1rem">
								<Box>
									<button
										className={classes.feedbackButton}
										onClick={onFeedback(true)}
									>
										<Center>
											<InsertEmoticonIcon
												className={classes.emoji}
											/>
											Yes
										</Center>
									</button>
								</Box>
								<Box ml="1rem">
									<button
										className={classes.feedbackButton}
										onClick={onFeedback(false)}
									>
										<Center>
											<SentimentVeryDissatisfiedIcon
												className={classes.emoji}
											/>
											No
										</Center>
									</button>
								</Box>
							</Box>

							{feedback.status && (
								<Box
									mt="1rem"
									className={classes.searchWrapper}
								>
									<Box mb="1rem">
										{feedback.positive
											? 'Leave us some comments about your search; your comments can help make our site better for everyone'
											: 'Choose a category that best describes the issue that you are having with the search:'}
									</Box>
									<SearchFeedbackForm
										feedback={feedback.positive}
									/>
								</Box>
							)}
						</Box>
						<Box mt="2rem">
							<Grid container>
								<Grid item xs={12} md={8}>
									<Grid container>
										<Grid item xs={12} md={6}>
											<Box p="1rem">
												<Box
													display="flex"
													width="100%"
													alignItems="center"
													mb="1rem"
													mt="1rem"
												>
													<Box
														pl="0.3rem"
														pr="0.3rem"
													>
														<h4
															className={
																classes.title
															}
														>
															Amenities
														</h4>
													</Box>
													<Box flexGrow={1}>
														<Divider />
													</Box>
												</Box>
												<Box
													display="flex"
													flexWrap="wrap"
													// justifyContent="center"
												>
													{arr.map((c) => (
														<Box
															ml="1rem"
															key={c}
															mt="0.5rem"
														>
															<Chip
																variant={
																	c === 2
																		? 'outlined'
																		: 'default'
																}
																avatar={
																	<Avatar
																		className={clsx(
																			{
																				[classes.selected]:
																					c ===
																					2,
																			}
																		)}
																	>
																		<HomeWorkIcon
																			className={clsx(
																				classes.avatarIcon,
																				{
																					[classes.cWhite]:
																						c ===
																						2,
																				}
																			)}
																		/>
																	</Avatar>
																}
																label="Amenity"
															/>
														</Box>
													))}
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12} md={6}>
											<Box p="1rem">
												<Box
													display="flex"
													width="100%"
													alignItems="center"
													mb="1rem"
													mt="1rem"
												>
													<Box
														pl="0.3rem"
														pr="0.3rem"
													>
														<h4
															className={
																classes.title
															}
														>
															Furnishes
														</h4>
													</Box>
													<Box flexGrow={1}>
														<Divider />
													</Box>
												</Box>
												<Box
													display="flex"
													flexWrap="wrap"
												>
													{arr.map((c) => (
														<Box
															ml="1rem"
															key={c}
															mt="0.5rem"
														>
															<Chip
																variant={
																	c === 2
																		? 'outlined'
																		: 'default'
																}
																avatar={
																	<Avatar
																		className={clsx(
																			{
																				[classes.selected]:
																					c ===
																					2,
																			}
																		)}
																	>
																		<HotTubIcon
																			className={clsx(
																				classes.avatarIcon,
																				{
																					[classes.cWhite]:
																						c ===
																						2,
																				}
																			)}
																		/>
																	</Avatar>
																}
																label="Furnish"
															/>
														</Box>
													))}
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12} md={12}>
											<Box p="1rem">
												<Box
													display="flex"
													width="100%"
													alignItems="center"
													mb="1rem"
													mt="1rem"
												>
													<Box
														pl="0.3rem"
														pr="0.3rem"
													>
														<h4
															className={
																classes.title
															}
														>
															Legal Clearance
														</h4>
													</Box>
													<Box flexGrow={1}>
														<Divider />
													</Box>
												</Box>
												<Box
													display="flex"
													flexWrap="wrap"
													// justifyContent="center"
												>
													{arr.map((c) => (
														<Box
															ml="1rem"
															key={c}
															mt="0.5rem"
														>
															<Chip
																variant={
																	c === 2
																		? 'outlined'
																		: 'default'
																}
																avatar={
																	<Avatar
																		className={clsx(
																			{
																				[classes.selected]:
																					c ===
																					2,
																			}
																		)}
																	>
																		<HomeWorkIcon
																			className={clsx(
																				classes.avatarIcon,
																				{
																					[classes.cWhite]:
																						c ===
																						2,
																				}
																			)}
																		/>
																	</Avatar>
																}
																label="Lorem ipsum dolor sit"
															/>
														</Box>
													))}
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} md={4}>
									<Box p="1rem">
										<Box
											display="flex"
											width="100%"
											alignItems="center"
											mb="1rem"
											mt="1rem"
										>
											<Box pl="0.3rem" pr="0.3rem">
												<h4 className={classes.title}>
													Near by places
												</h4>
											</Box>
											<Box flexGrow={1}>
												<Divider />
											</Box>
										</Box>
										<Box>
											{distance.map((c, i) => (
												<List
													key={i}
													classes={{
														root: classes.list,
													}}
												>
													<ListItem
														classes={{
															root:
																classes.listItem,
														}}
													>
														<ListItemAvatar>
															<Avatar>
																{c.icon}
															</Avatar>
														</ListItemAvatar>
														<ListItemText
															primary={c.label}
														/>
														<ListItemSecondaryAction>
															<b>
																{c.distance} KM
															</b>
														</ListItemSecondaryAction>
													</ListItem>
												</List>
											))}
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<SimilarProperties
								title={`2 BHK ${
									independent ? 'Independent' : 'Apartment'
								} for rent`}
							/>
						</Box>
					</Paper>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

export default PropertyDetails;
