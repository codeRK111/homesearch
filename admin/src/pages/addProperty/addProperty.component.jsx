import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectAmenities,
	selectFurnishes,
	selectLoading as resourcesLoading,
} from '../../redux/property/property.selector';
import {
	fetchAllPropertyResourcesStart,
	addProperty,
} from '../../redux/property/property.actions';
import {
	selectAllStates,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';
import {
	selectAllUsers,
	selectLoading as userLoading,
} from '../../redux/users/users.selector';
import { fetchAllUsersSTart } from '../../redux/users/users.actions';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
	whiteColor: {
		color: '#ffffff',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	imageWrapper: {
		width: '100%',
		height: '100px',
		border: '1px dotted black',
	},
}));

const defaultimageNumber = 3;

const AddProperty = ({
	furnishes,
	amenities,
	resourcesLoading,
	fetchResourcesStart,
	fetchStatesStart,
	allStates,
	addProperty,
	fetchAllUsersStart,
	selectAllUsers,
	userLoading,
}) => {
	const classes = useStyles();
	const [properties, setProperties] = React.useState({
		for: 'rent',
		type: 'flat',
		userId: '',
		city: '',
		location: '',
		title: '',
		description: '',
		numberOfBedRooms: 1,
		numberOfBalconies: 0,
		noOfFloors: 1,
		toiletIndian: 1,
		toiletWestern: 1,
		superBuiltupArea: '',
		carpetArea: '',
		rent: '',
		securityDeposit: '',
		furnished: 'unfurnished',
		distanceSchool: '',
		distanceCollege: '',
		distanceRailwayStation: '',
		distanceAirport: '',
		distanceMetroStation: '',
		distanceBusStop: '',
		distanceHospital: '',
		distanceShoppingMall: '',
		distanceBank: '',
		availability: 'immediately',
		externalAmenities: [],
		furnishes: [],
		floor: '',
	});

	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const [state, selectState] = React.useState('');
	const [result, setResult] = React.useState({
		type: '',
		message: '',
	});
	const [numberOfImages, setNumberOfImages] = React.useState(
		defaultimageNumber
	);
	const [cityLoading, setCityLoading] = React.useState(false);
	const [cities, setCities] = React.useState([]);
	const [locations, setLocations] = React.useState([]);
	const [file, setFile] = React.useState([]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const fetchStates = () => {
		fetchStatesStart();
	};

	const handleChange = (event) => {
		let b = event.target;
		setProperties((prevState) => ({
			...prevState,
			[b.name]: b.value,
		}));
	};

	const handleAmenitiesCheckbox = (id) => (event) => {
		if (event.target.checked == true) {
			setProperties((prevState) => ({
				...prevState,
				externalAmenities: [...prevState.externalAmenities, id],
			}));
		} else {
			setProperties((prevState) => ({
				...prevState,
				externalAmenities: prevState.externalAmenities.filter(
					(b) => b !== id
				),
			}));
		}
	};
	const handleFurnishesCheckbox = (id) => (event) => {
		if (event.target.checked == true) {
			setProperties((prevState) => ({
				...prevState,
				furnishes: [...prevState.furnishes, id],
			}));
		} else {
			setProperties((prevState) => ({
				...prevState,
				furnishes: prevState.furnishes.filter((b) => b !== id),
			}));
		}
	};

	const fetchUsers = () => {
		fetchAllUsersStart();
	};

	React.useEffect(() => {
		fetchResourcesStart(console.log);
	}, []);
	React.useEffect(() => {
		if (state) {
			setCityLoading(true);
			const url = `/api/v1/cities/states/${state}`;
			axios
				.get(url)
				.then((resp) => {
					setCityLoading(false);
					const respData = resp.data;
					console.log(respData);

					setCities(respData.data.cities);
				})
				.catch((error) => {
					setCityLoading(false);
					const errorResponse = error.response.data;
					console.log(errorResponse);
				});
		}
	}, [state]);

	React.useEffect(() => {
		if (properties.city) {
			setCityLoading(true);
			const url = `/api/v1/cities/locations/${properties.city}`;
			axios
				.get(url)
				.then((resp) => {
					const respData = resp.data;
					console.log(respData);

					setLocations(respData.data.locations);
				})
				.catch((error) => {
					const errorResponse = error.response.data;
					console.log(errorResponse);
				});
		}
	}, [properties.city]);

	React.useEffect(() => {
		if (result.type === 'fail') {
			window.scrollTo(0, 0);
		}
	}, [result.type]);

	const handleResult = (type, data = null) => {
		if (type === 'success') {
			setResult({
				type: 'success',
				message: '',
			});
		} else {
			setResult({
				type: 'fail',
				message: data.message,
			});
		}
		console.log(type);
		console.log(data);
	};

	const postProperty = () => {
		let propObj = { ...properties };
		propObj['toiletTypes'] = [
			{
				toiletType: 'indian',
				numbers: properties.toiletIndian,
			},
			{
				toiletType: 'western',
				numbers: properties.toiletWestern,
			},
		];

		if (properties.availability === 'specificdate') {
			propObj['availableDate'] = selectedDate;
		}
		if (file.length > 0) {
			propObj['image'] = file;
		}
		console.log(propObj);
		addProperty(propObj, handleResult);
	};

	const handleFileChange = (event) => {
		const b = event.target;
		setFile((prevState) => [...prevState, b.files[0]]);
	};

	const imageInput = (number) => {
		const images = [];
		for (let index = 0; index < number; index++) {
			images.push(
				<Box m="0.3rem" key={index}>
					<input
						type="file"
						name=""
						id=""
						onChange={handleFileChange}
					/>
				</Box>
			);
		}
		return images;
	};

	return (
		<Box p="1rem">
			<Backdrop
				className={classes.backdrop}
				open={resourcesLoading}
				// onClick={handleClose}
			>
				Loading Resources...
			</Backdrop>
			<h3>Add Property</h3>
			<Box>
				<Paper>
					<Box p="0.5rem">
						{result.type === 'fail' && (
							<p className="color-red">{result.message}</p>
						)}
						<Grid container>
							<Grid item xs={12} md={12} lg={9}>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											For *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel id="demo-simple-select-outlined-label">
													For
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={properties.for}
													onChange={handleChange}
													name="for"
													label="for"
												>
													<MenuItem value="rent">
														<em>Rent</em>
													</MenuItem>
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Type *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel id="demo-simple-select-outlined-label">
													Select
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={properties.type}
													onChange={handleChange}
													name="type"
													label="type"
												>
													<MenuItem value="flat">
														<em>Flat</em>
													</MenuItem>
													<MenuItem value="independenthouse">
														<em>
															Independent House
														</em>
													</MenuItem>
													<MenuItem value="guesthouse">
														<em>Guest House</em>
													</MenuItem>
													{/* <MenuItem value="hostel">
														<em>Hostel</em>
													</MenuItem>
													<MenuItem value="pg">
														<em>PG</em>
													</MenuItem>
													
													<MenuItem value="serviceapartment">
														<em>
															Service Apartment
														</em>
													</MenuItem> */}
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											User *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel htmlFor="outlined-age-native-simple">
													User
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													onOpen={fetchUsers}
													value={properties.userId}
													name="userId"
													onChange={handleChange}
													label="State"
													variant="outlined"
													fullWidth
													size="small"
												>
													{userLoading && (
														<MenuItem
															value=""
															disabled
														>
															<em>Loading...</em>
														</MenuItem>
													)}
													{selectAllUsers.map(
														(c, i) => (
															<MenuItem
																key={c.id}
																value={c}
															>
																{c.name}
															</MenuItem>
														)
													)}
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											State *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel htmlFor="outlined-age-native-simple">
													State
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													onOpen={fetchStates}
													value={state}
													name="state"
													onChange={(e) =>
														selectState(
															e.target.value
														)
													}
													label="State"
													variant="outlined"
													fullWidth
													size="small"
												>
													{stateLoading && (
														<MenuItem
															value=""
															disabled
														>
															<em>Loading...</em>
														</MenuItem>
													)}
													{allStates.map((c, i) => (
														<MenuItem
															key={i}
															value={c}
														>
															{c}
														</MenuItem>
													))}
												</Select>
												<FormHelperText>
													Select state to view cities
												</FormHelperText>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											City *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel id="demo-simple-select-outlined-label">
													Select
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={properties.city}
													onChange={handleChange}
													name="city"
													label="state"
												>
													{cities.map((c, i) => (
														<MenuItem
															value={c.id}
															key={i}
														>
															<em>{c.name}</em>
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Location *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel id="demo-simple-select-outlined-label">
													Select
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={properties.location}
													onChange={handleChange}
													name="location"
													label="state"
												>
													{locations.map((c, i) => (
														<MenuItem
															value={c.id}
															key={i}
														>
															<em>{c.name}</em>
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Title *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="Title"
												variant="outlined"
												name="title"
												value={properties.title}
												onChange={handleChange}
												fullWidth
												size="small"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Description *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="Description"
												variant="outlined"
												name="description"
												value={properties.description}
												onChange={handleChange}
												fullWidth
												size="small"
												multiline
												rows={4}
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Number of bed rooms *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="bedroom"
												variant="outlined"
												name="noOfFloors"
												value={properties.noOfFloors}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Number of balconies *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="balconies"
												variant="outlined"
												name="numberOfBalconies"
												value={
													properties.numberOfBalconies
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>

								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Number of floors *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="floors"
												variant="outlined"
												name="numberOfBedRooms"
												value={
													properties.numberOfBedRooms
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>

								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Property on Floor *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											{properties.type ==
												'independenthouse' ||
											properties.type == 'guesthouse' ? (
												<FormControl
													variant="outlined"
													fullWidth
													size="small"
												>
													<InputLabel id="demo-simple-select-outlined-label">
														Select
													</InputLabel>
													<Select
														labelId="demo-simple-select-outlined-label"
														id="demo-simple-select-outlined"
														value={properties.floor}
														onChange={handleChange}
														name="floor"
														label="state"
													>
														<MenuItem
															value={
																'Entire Building'
															}
														>
															<em>
																Entire Building
															</em>
														</MenuItem>
														<MenuItem
															value={
																'Ground floor'
															}
														>
															<em>
																Ground floor
															</em>
														</MenuItem>
														<MenuItem
															value={'1st floor'}
														>
															<em>1st floor</em>
														</MenuItem>
														<MenuItem
															value={'2nd floor'}
														>
															<em>2nd floor</em>
														</MenuItem>
														<MenuItem
															value={'3rd floor'}
														>
															<em>3rd floor</em>
														</MenuItem>
													</Select>
												</FormControl>
											) : (
												<TextField
													id="outlined-basic"
													label="floor"
													variant="outlined"
													name="floor"
													value={properties.floor}
													onChange={handleChange}
													fullWidth
													size="small"
												/>
											)}
										</Grid>
									</Grid>
								</Box>

								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Toilets *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<Grid container spacing={1}>
												<Grid item xs={6}>
													<Box
														display="flex"
														alignItems="center"
													>
														<Box mr="0.4rem">
															Indian:
														</Box>
														<TextField
															id="outlined-basic"
															label="toilet"
															variant="outlined"
															name="toiletIndian"
															value={
																properties.toiletIndian
															}
															onChange={
																handleChange
															}
															fullWidth
															size="small"
															type="number"
														/>
													</Box>
												</Grid>
												<Grid item xs={6}>
													<Box
														display="flex"
														alignItems="center"
													>
														<Box mr="0.4rem">
															Western:
														</Box>
														<TextField
															id="outlined-basic"
															label="toilet"
															variant="outlined"
															name="toiletWestern"
															value={
																properties.toiletWestern
															}
															onChange={
																handleChange
															}
															fullWidth
															size="small"
															type="number"
														/>
													</Box>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Super built up area *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="sqft"
												variant="outlined"
												name="superBuiltupArea"
												value={
													properties.superBuiltupArea
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Carpet Area *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="sqft"
												variant="outlined"
												name="carpetArea"
												value={properties.carpetArea}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Rent *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="rs"
												variant="outlined"
												name="rent"
												value={properties.rent}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Security Deposit *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="rs"
												variant="outlined"
												name="securityDeposit"
												value={
													properties.securityDeposit
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Furnished *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel id="demo-simple-select-outlined-label">
													Select
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={properties.furnished}
													onChange={handleChange}
													name="furnished"
													label="state"
												>
													<MenuItem
														value={'furnished'}
													>
														<em>Furnished</em>
													</MenuItem>
													<MenuItem
														value={'unfurnished'}
													>
														<em>Unfurnished</em>
													</MenuItem>
													<MenuItem
														value={'semifurnished'}
													>
														<em>Semifurnished</em>
													</MenuItem>
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								{properties.furnished !== 'unfurnished' && (
									<Box p="0.8rem">
										<Grid container>
											<Grid item xs={12} md={12} lg={6}>
												Furnishes *
											</Grid>
											<Grid item xs={12} md={12} lg={6}>
												<Grid container>
													{furnishes.map((c) => (
														<Grid
															item
															xs={12}
															lg={6}
															key={c.id}
														>
															<FormControlLabel
																control={
																	<Checkbox
																		checked={properties.furnishes.includes(
																			c.id
																		)}
																		onChange={handleFurnishesCheckbox(
																			c.id
																		)}
																		name="checkedB"
																		color="primary"
																	/>
																}
																label={c.name}
															/>
														</Grid>
													))}
												</Grid>
											</Grid>
										</Grid>
									</Box>
								)}
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											External amanities *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<Grid container>
												{amenities
													.filter(
														(a) =>
															a.type ===
															'external'
													)
													.map((c) => (
														<Grid
															item
															xs={12}
															lg={6}
															key={c.id}
														>
															<FormControlLabel
																control={
																	<Checkbox
																		checked={properties.externalAmenities.includes(
																			c.id
																		)}
																		onChange={handleAmenitiesCheckbox(
																			c.id
																		)}
																		name="checkedB"
																		color="primary"
																	/>
																}
																label={c.name}
															/>
														</Grid>
													))}
											</Grid>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from school *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceSchool"
												value={
													properties.distanceSchool
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from college *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceCollege"
												value={
													properties.distanceCollege
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from railway station *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceRailwayStation"
												value={
													properties.distanceRailwayStation
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from air port *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceAirport"
												value={
													properties.distanceAirport
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from metro station *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceMetroStation"
												value={
													properties.distanceMetroStation
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from bus stop *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceBusStop"
												value={
													properties.distanceBusStop
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from hospital *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceHospital"
												value={
													properties.distanceHospital
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from shopping mall *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceShoppingMall"
												value={
													properties.distanceShoppingMall
												}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Distance from bank *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<TextField
												id="outlined-basic"
												label="km"
												variant="outlined"
												name="distanceBank"
												value={properties.distanceBank}
												onChange={handleChange}
												fullWidth
												size="small"
												type="number"
											/>
										</Grid>
									</Grid>
								</Box>
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Availability *
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											<FormControl
												variant="outlined"
												fullWidth
												size="small"
											>
												<InputLabel id="demo-simple-select-outlined-label">
													Select
												</InputLabel>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={
														properties.availability
													}
													onChange={handleChange}
													name="availability"
													label="state"
												>
													<MenuItem
														value={'immediately'}
													>
														<em>Immediately</em>
													</MenuItem>
													<MenuItem
														value={'specificdate'}
													>
														<em>Specific Date</em>
													</MenuItem>
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								{properties.availability === 'specificdate' && (
									<Box p="0.8rem">
										<Grid container>
											<Grid item xs={12} md={12} lg={6}>
												<Box mt="2rem">
													Select Date *
												</Box>
											</Grid>
											<Grid item xs={12} md={12} lg={6}>
												<MuiPickersUtilsProvider
													utils={DateFnsUtils}
													fullWidth
												>
													<KeyboardDatePicker
														margin="normal"
														fullWidth
														id="date-picker-dialog"
														label="Select Date"
														format="MM/dd/yyyy"
														value={selectedDate}
														onChange={
															handleDateChange
														}
														KeyboardButtonProps={{
															'aria-label':
																'change date',
														}}
													/>
												</MuiPickersUtilsProvider>
											</Grid>
										</Grid>
									</Box>
								)}
								<Box p="0.8rem">
									<Grid container>
										<Grid item xs={12} md={12} lg={6}>
											Image
										</Grid>
										<Grid item xs={12} md={12} lg={6}>
											{imageInput(numberOfImages)}
										</Grid>
									</Grid>
								</Box>
							</Grid>
						</Grid>
					</Box>
					<Box p="1rem" display="flex" justifyContent="flex-end">
						<Button
							color="primary"
							variant="contained"
							size="large"
							classes={{
								label: 'tranform-none',
							}}
							onClick={postProperty}
						>
							Post Property
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};
const mapStateToProps = createStructuredSelector({
	furnishes: selectFurnishes,
	amenities: selectAmenities,
	resourcesLoading,
	allStates: selectAllStates,
	stateLoading,
	selectAllUsers,
	userLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchAllUsersStart: () => dispatch(fetchAllUsersSTart()),
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	addProperty: (property, callback) =>
		dispatch(addProperty({ property, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
