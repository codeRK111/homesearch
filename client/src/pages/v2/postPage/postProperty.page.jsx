import { Box, Typography } from '@material-ui/core';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';

import ChoosePlan from '../../../components/v2/propertyPlans/choosePlan.component';
import CitySearch from '../../../components/v2/cityDropDown';
import FurnishHOC from '../../../components/furnishes/hoc';
import Loading from '../../../components/v2/loadingAnimation';
import LocationSearch from '../../../components/v2/locationDropDown';
import Nav from '../../../components/v2/pageNav/nav.component';
import PostSuccess from '../../../components/v2/postSuccessMessage';
import React from 'react';
import RentApartment from './rent/apartment.component';
import RentHostel from './rent/hostel.component';
import SaleApartment from './sale/apartment.component';
import SaleLand from './sale/land.component';
import Select from '../../../components/v2/chipSelect/chipSelected.component';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../../redux/auth/auth.selectors';
import useGlobalStyles from '../../../common.style';
import useStyles from './postPage.style';

const PostProperty = ({ isAuthenticated, toggleLoginPopup, setSnackbar }) => {
	const classes = useStyles();
	const cancelToken = React.useRef(undefined);
	const gClasses = useGlobalStyles();
	const [pFor, setpFor] = React.useState('');
	const [openPlan, setOpenPlan] = React.useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
	const [type, setType] = React.useState('');
	const [selectedCity, setSelectedCity] = React.useState({
		id: null,
		name: null,
	});
	const [selectedLocation, setSelectedLocation] = React.useState({
		id: null,
		name: null,
	});
	const [loading, setLoading] = React.useState(false);

	const togglePlanPopUp = (status) => () => {
		setOpenPlan(status);
	};

	const handlePFor = (type) => () => {
		setpFor(type);
	};
	const handleType = (pType) => () => {
		setType(pType);
	};
	const onPost = (values) => {
		if (!selectedCity.id) {
			setSnackbar({
				open: true,
				message: 'Please select a city',
				severity: 'error',
			});
			return;
		}
		if (!selectedLocation.id) {
			setSnackbar({
				open: true,
				message: 'Please select a location',
				severity: 'error',
			});
			return;
		}
		if (pFor && type) {
			if (isAuthenticated) {
				togglePlanPopUp(true)();
			} else {
				toggleLoginPopup(true);
			}
		}
	};

	const addImage = (id, photos, token, property) => {
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			photos.forEach((c) => {
				formData.append('images', c);
			});
			axios
				.post(
					apiUrl(`/properties/add-property-image/${id}`),
					formData,
					{
						cancelToken: cancelToken.current.token,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((resp) => {
					return resolve(property);
				})
				.catch((error) => {
					let message = '';
					if (!!error.response) {
						message = error.response.data.message;
					} else {
						message = error.message;
					}
					return reject(message);
				});
		});
	};

	const onPostProperty = (values, photos, type = 'sale') => {
		return new Promise((resolve, reject) => {
			if (!selectedCity.id) {
				return reject('Please select a city');
			}
			if (!selectedLocation.id) {
				return reject('Please select a location');
			}
			if (pFor && type) {
				if (!isAuthenticated) {
					toggleLoginPopup(true);
					return reject(null);
				} else {
					setLoading(true);
					cancelToken.current = axios.CancelToken.source();
					const token = localStorage.getItem('JWT_CLIENT');
					axios
						.post(
							apiUrl(`/property/user/post-property-${type}`, 2),
							{
								...values,
								city: selectedCity.id,
								location: selectedLocation.id,
							},
							{
								cancelToken: cancelToken.current.token,
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${token}`,
								},
							}
						)
						.then((resp) => {
							if (photos.length > 0) {
								addImage(
									resp.data.data.property.id,
									photos,
									token,
									resp.data.data.property
								)
									.then((response) => {
										setLoading(false);
										setShowSuccessMessage(true);
										resolve(response);
									})
									.catch((error) => {
										setLoading(false);
										reject(error);
									});
							} else {
								setLoading(false);
								setShowSuccessMessage(true);
								return resolve(resp.data);
							}
						})
						.catch((error) => {
							let message = '';
							if (!!error.response) {
								message = error.response.data.message;
							} else {
								message = error.message;
							}
							setShowSuccessMessage(false);
							return reject(message);
						});
				}
			}
		});
	};

	const renderTypes = () => {
		let arr = [
			{
				label: 'Apartment',
				name: 'flat',
			},
			{
				label: 'Villa',
				name: 'independenthouse',
			},
		];
		if (pFor === 'rent') {
			arr = [
				...arr,
				{
					label: 'Hostel',
					name: 'hostel',
				},
				{
					label: 'PG',
					name: 'pg',
				},
			];
		} else {
			arr = [
				...arr,
				{
					label: 'Land',
					name: 'land',
				},
			];
		}

		return arr;
	};

	const renderTypesComponent = () => {
		switch (type) {
			case 'flat':
			case 'independenthouse':
				return (
					<FurnishHOC
						component={RentApartment}
						pType={type}
						onPost={onPostProperty}
					/>
				);
			case 'hostel':
			case 'pg':
				return (
					<FurnishHOC
						component={RentHostel}
						pType={type}
						onPost={onPostProperty}
					/>
				);

			default:
				break;
		}
	};
	const renderSaleTypesComponent = () => {
		switch (type) {
			case 'flat':
			case 'independenthouse':
				return (
					<FurnishHOC
						component={SaleApartment}
						pType={type}
						onPost={onPostProperty}
					/>
				);
			case 'land':
				return <SaleLand pType={type} onPost={onPostProperty} />;

			default:
				break;
		}
	};

	const renderpFor = () => {
		switch (pFor) {
			case 'rent':
				return renderTypesComponent();
			case 'sale':
				return renderSaleTypesComponent();

			default:
				break;
		}
	};
	return (
		<div>
			<Nav />
			<PostSuccess
				open={showSuccessMessage}
				handleClose={setShowSuccessMessage}
			/>
			<Loading open={loading} />
			<ChoosePlan open={openPlan} handleClose={togglePlanPopUp(false)} />
			<Box className={classes.wrapper}>
				<Typography>Home/Post Property</Typography>

				<Box className={classes.contentWrapper}>
					<Typography variant="h4" gutterBottom>
						Post Property
					</Typography>
					<Typography align={'center'}>
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
						<Select
							onClick={handlePFor('sale')}
							selected={pFor === 'sale'}
						>
							Sell
						</Select>
						<Box ml="2rem">
							<Select
								onClick={handlePFor('rent')}
								selected={pFor === 'rent'}
							>
								Rent
							</Select>
						</Box>
					</Box>
					<Box
						className={clsx(
							gClasses.smFullWidth,
							classes.alignCenter,
							gClasses.smJustifyBetween
						)}
						mt="2rem"
					>
						<CitySearch
							placeholder="City"
							size={200}
							onSet={setSelectedCity}
							value={selectedCity}
						/>
						<Box className={classes.leftSpacer}>
							<LocationSearch
								placeholder="Location"
								size={200}
								onSet={setSelectedLocation}
								value={selectedLocation}
								city={selectedCity}
							/>
						</Box>
					</Box>

					{/* Property Type */}
					<Box mt="2rem" className={classes.contentWrapper}>
						<Typography variant="h5" gutterBottom align="center">
							Property Type
						</Typography>
						<Box
							mt="1rem"
							className={clsx(
								classes.alignCenter,
								gClasses.smFlexWrap
							)}
						>
							{renderTypes().map((c, i) => (
								<Box key={i} className={classes.selectChip}>
									<Select
										selected={type === c.name}
										onClick={handleType(c.name)}
									>
										{c.label}
									</Select>
								</Box>
							))}
						</Box>
					</Box>
					<Box mt="2rem">
						{renderpFor()}
						{/* <RentApartment  /> */}
					</Box>

					{/* Pricing And Area  */}

					{/* Photos And Video  */}

					{/* Other Details  */}

					{/* Availability  */}

					{/* User Role  */}
				</Box>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostProperty);
