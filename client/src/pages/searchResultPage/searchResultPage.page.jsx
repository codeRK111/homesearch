import { Box, Grid, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	validateEmail,
	validateMobileNumber,
} from '../../utils/validation.utils';

import AppBar from '../../components/appBar/appBar.component';
import BedRoomFilter from '../../components/bedroomFilter/bedRoom.component';
import BudgetFilter from '../../components/budgetFilter/budgetFilter.component';
import CityFilter from '../../components/cityFilter/cityFilter.component';
import Collapse from '@material-ui/core/Collapse';
import ErrorCard from '../../components/errorCard/errorCard.component';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import Footer from '../../components/footer/footer.component';
import FurnishingFilter from '../../components/furnishingFilter/furnishing.component';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationFilter from '../../components/locationFilter/locationFilter.component';
import Pagination from '@material-ui/lab/Pagination';
import ProjectApartment from '../../components/searchResultCardNewProjectApartment/searchResultCard.component';
import PropertyFilter from '../../components/propertyTypeFilter/propertyTypeFilder.component';
import React from 'react';
import RentApartment from '../../components/searchResultCardNewRentApartment/searchResultCard.component';
import RentHostel from '../../components/searchResultCardNewRentHostel/searchResultCard.component';
import ResaleApartment from '../../components/searchResultCardNew/searchResultCard.component';
import ResaleLand from '../../components/searchResultCardNewLand/searchResultCard.component';
import ResaleVilla from '../../components/searchResultCardNewIndHouse/searchResultCard.component';
import Skeleton from '../../components/searchCardSkeleton/searchCardSkeleton.component';
import Snackbar from '../../components/snackbar/snackbar.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { searchProperties } from '../../redux/property/property.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { selectPropertyLoading } from '../../redux/property/property.selectors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchResultPage.styles';

const initialValues = {
	name: '',
	email: '',
	phoneNumber: '',
};

const SearchPage = ({
	currentTab,
	propertyLoading,
	searchProperties,
	...props
}) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [severity, setSeverity] = React.useState('success');
	const [open, setOpen] = React.useState(false);
	const [asyncError, setAsyncError] = React.useState(null);
	const [totalDos, setTotalDocs] = React.useState(0);
	const [data, setData] = React.useState([]);
	const [propertyItems, setPropertyItems] = React.useState([]);
	const [city, setCity] = React.useState({
		id: null,
		name: null,
	});
	const [pFor, setPFor] = React.useState('rent');
	const [locations, setLocations] = React.useState([]);
	const [types, setTypes] = React.useState({
		flat: false,
		independenthouse: false,
		land: false,
		guesthouse: false,
		hostel: false,
		pg: false,
	});
	const [rentItems, setRentItems] = React.useState(
		Array.from({ length: 20 }, (_, i) => i + 1).map((c) => ({
			name: `${(c - 1) * 5}-${c * 5}K`,
			val: { min: (c - 1) * 5 * 1000, max: c * 5 * 1000 },
			checked: false,
		}))
	);

	const [otherItems, setOtherItems] = React.useState(
		Array.from({ length: 20 }, (_, i) => i + 1).map((c) => ({
			name: `${(c - 1) * 5}-${c * 5}L`,
			val: { min: (c - 1) * 5 * 100000, max: c * 5 * 100000 },
			checked: false,
		}))
	);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties);
			setData(data.properties);
			setTotalDocs(data.count);
			setPropertyItems(data.propertyItems);
		} else {
			setAsyncError(data);
		}
	};

	const handleCity = (data) => setCity(data);

	const showSnackbar = (message, severity = 'success') => {
		setSnackbarMessage(message);
		setOpenSnackBar(true);
		setSeverity(severity);
	};

	const closeSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};
	const parsed = queryString.parse(props.location.search, {
		arrayFormat: 'comma',
	});
	const validateForm = (values) => {
		const error = {};
		if (!values.name) {
			error.name = 'Name required';
		}
		if (!values.email) {
			error.email = 'Email required';
		}
		if (values.email) {
			if (!validateEmail(values.email)) {
				error.email = 'Invalid email';
			}
		}
		if (!values.phoneNumber) {
			error.phoneNumber = 'Phone number required';
		}
		if (values.phoneNumber) {
			if (!validateMobileNumber(values.phoneNumber)) {
				error.phoneNumber = 'Invalid Phone number';
			}
		}

		return error;
	};
	const submitForm = (values) => {
		showSnackbar('We will get back to you soon');
	};

	React.useEffect(() => {
		setCity({
			id: parsed.c,
			name: parsed.cn,
		});
		setPFor(parsed.f);
		const body = {
			for: parsed.f,
			city: parsed.c,
		};
		if (parsed.b) {
			body.price = parsed.b;
		}
		if (parsed.l) {
			if (typeof parsed.l === 'string') {
				body.locations = [parsed.l];
				setLocations([parsed.l]);
			} else {
				body.locations = parsed.l;
				setLocations(parsed.l);
			}
		}
		if (parsed.t) {
			if (typeof parsed.t === 'string') {
				body.type = [parsed.t];
			} else {
				body.type = parsed.t;
			}

			body.type.forEach((c) => {
				setTypes((prevState) => ({
					...prevState,
					[c]: true,
				}));
			});
		}
		if (parsed.av) {
			body.availability = parsed.av;
		}
		if (parsed.br) {
			body.numberOfBedRooms = parsed.br;
		}
		if (parsed.bl && parsed.bl.length > 0) {
			const arr = [];
			console.log('bl', parsed.bl);
			parsed.bl.forEach((c, i) => {
				const item = c.split(',');

				if (item.length > 1) {
					let test = '';
					if (parsed.f === 'rent') {
						test = `${item[0] / 1000}-${item[1] / 1000}K`;
						setRentItems((prevState) =>
							prevState.map((c) => {
								if (c.name === test) {
									c.checked = true;
								}
								return c;
							})
						);
					} else {
						test = `${item[0] / 100000}-${item[1] / 100000}L`;
						setOtherItems((prevState) =>
							prevState.map((c) => {
								if (c.name === test) {
									c.checked = true;
								}
								return c;
							})
						);
					}

					arr.push({
						min: item[0],
						max: item[1],
					});
				} else {
					if (i === 0) {
						arr.push({ min: c });
						let test2 = '';
						if (parsed.f === 'rent') {
							test2 = `${parsed.bl[0] / 1000}-${
								parsed.bl[1] / 1000
							}K`;
							setRentItems((prevState) =>
								prevState.map((c) => {
									if (c.name === test2) {
										c.checked = true;
									}
									return c;
								})
							);
						} else {
							test2 = `${parsed.bl[0] / 100000}-${
								parsed.bl[1] / 100000
							}L`;
							setOtherItems((prevState) =>
								prevState.map((c) => {
									if (c.name === test2) {
										c.checked = true;
									}
									return c;
								})
							);
						}
					} else {
						arr[0]['max'] = c;
					}
				}
			});
			body.budgetList = arr;
		}
		searchProperties(handleFetchCities, body);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchProperties]);
	const handleClick = () => {
		setOpen(!open);
	};

	const filterTypes = (property) => {
		switch (property.type) {
			case 'flat':
				return <RentApartment property={property} />;
			case 'independenthouse':
				return <RentApartment property={property} />;
			case 'hostel':
			case 'pg':
				return <RentHostel property={property} />;

			default:
				break;
		}
	};
	const filterTypesSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
				return <ResaleApartment property={property} />;

			case 'land':
				return <ResaleLand property={property} />;

			case 'independenthouse':
				return <ResaleVilla property={property} />;

			default:
				break;
		}
	};

	const filterTypesProject = (property) => {
		switch (property.projectType) {
			case 'flat':
				return (
					<ProjectApartment
						property={property}
						propertyItems={propertyItems.filter(
							(c) => c.project === property.id
						)}
					/>
				);

			// case 'land':
			// 	return <ResaleLand property={property} />;

			// case 'independenthouse':
			// 	return <ResaleVilla property={property} />;

			default:
				break;
		}
	};

	const renderProperties = (property) => {
		switch (property.for) {
			case 'rent':
				return filterTypes(property);
			case 'sale':
				return filterTypesSale(property);

			default:
				return filterTypesProject(property);
		}
	};

	const renderFilter = () => {
		return mobile ? (
			<Box>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<FilterListIcon />
					</ListItemIcon>
					<ListItemText primary="Filter" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box
						className={classes.l5}
						display="flex"
						justifyContent="center"
					>
						<Box className={classes.gridWrapper}>
							<Grid container>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<LocationFilter />
								</Grid>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<PropertyFilter />
								</Grid>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<BedRoomFilter />
								</Grid>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<BudgetFilter />
								</Grid>
								{currentTab === 'sale' && (
									<Grid
										item
										xs={6}
										md={2}
										className={classes.gridItemWrapper}
									>
										<FurnishingFilter />
									</Grid>
								)}

								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<Box
										position="relative"
										width="150px"
										height="100%"
									>
										<button className={classes.apply}>
											Apply
										</button>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Collapse>
			</Box>
		) : (
			<Box className={classes.l5} display="flex" justifyContent="center">
				<Box className={classes.gridWrapper}>
					<Grid container>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<CityFilter city={city} handleCity={handleCity} />
						</Grid>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<LocationFilter
								city={city.id}
								existingLocations={locations}
								handleLocations={setLocations}
							/>
						</Grid>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<PropertyFilter
								pFor={pFor}
								types={types}
								setTypes={setTypes}
							/>
						</Grid>
						{/* <Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<BedRoomFilter />
						</Grid> */}
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<BudgetFilter
								pFor={pFor}
								rentItems={rentItems}
								setRentItems={setRentItems}
								otherItems={otherItems}
								setOtherItems={setOtherItems}
							/>
						</Grid>
						{/* {currentTab === 'sale' && (
							<Grid
								item
								xs={6}
								md={2}
								className={classes.gridItemWrapper}
							>
								<FurnishingFilter />
							</Grid>
						)} */}

						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<Box
								position="relative"
								width="150px"
								height="100%"
							>
								<button className={classes.apply}>Apply</button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		);
	};
	return (
		<Box>
			<AppBar />
			<Snackbar
				status={openSnackBar}
				handleClose={closeSnackbar}
				severity={severity}
				message={snackbarMessage}
			/>
			{/* {renderFilter()} */}
			<Box className={[classes.resultsWrapper, classes.l5].join(' ')}>
				<p>
					{' '}
					<b>{data.length}</b> properties found for <b>{parsed.cn}</b>
				</p>

				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						{asyncError && <ErrorCard message={asyncError} />}
						{propertyLoading ? (
							<Box>
								<Skeleton />
								<Box mt="1rem">
									<Skeleton />
								</Box>
							</Box>
						) : (
							!asyncError &&
							data.map((p) => (
								<Box mt="1rem" key={p.id}>
									{renderProperties(p)}
								</Box>
							))
						)}
						{!asyncError && data.length > 0 && (
							<Box mt="2rem">
								<Paper>
									<Box
										p="1rem"
										display="flex"
										justifyContent="center"
									>
										<Pagination
											count={totalDos / data.length}
											color="primary"
										/>
									</Box>
								</Paper>
							</Box>
						)}
					</Grid>

					<Grid item xs={12} md={4}>
						<Box className={classes.smLeft}>
							<Paper>
								<Box p="1rem">
									<h3 className={classes.center}>
										Request a call back
									</h3>
									<Formik
										initialValues={initialValues}
										validate={validateForm}
										onSubmit={submitForm}
									>
										{() => (
											<Form>
												<TextField
													formLabel="Full Name"
													name="name"
												/>

												<TextField
													formLabel="Email"
													type="email"
													name="email"
												/>

												<TextField
													formLabel="Phone Number"
													type="number"
													name="phoneNumber"
												/>
												<Box
													mt="2rem"
													mb="2rem"
													position="relative"
													height="40px"
												>
													<button
														className={
															classes.button
														}
														type="submit"
													>
														Talk To Our Expert
													</button>
												</Box>
											</Form>
										)}
									</Formik>
								</Box>
							</Paper>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Footer />
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
	propertyLoading: selectPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchProperties: (callback, body) =>
		dispatch(searchProperties({ callback, body })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
