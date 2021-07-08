import { Box, Grid, Typography } from '@material-ui/core';
import { Link, Switch } from 'react-router-dom';

import CitySearch from '../../../components/v2/cityDropDown';
import FurnishHOC from '../../../components/furnishes/hoc';
import LocationSearch from '../../../components/v2/locationDropDown';
import Nav from '../../../components/v2/pageNav/nav.component';
import PlanWrapper from '../../../components/v2/amenity/amenity.component';
import React from 'react';
import RentApartment from './rent/apartment.component';
import RentHostel from './rent/hostel.component';
import SaleApartment from './sale/apartment.component';
import Select from '../../../components/v2/chipSelect/chipSelected.component';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './postPage.style';

const PostProperty = () => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [pFor, setpFor] = React.useState('rent');
	const [type, setType] = React.useState('flat');
	const [selectedCity, setSelectedCity] = React.useState({
		id: null,
		name: null,
	});
	const [selectedLocation, setSelectedLocation] = React.useState({
		id: null,
		name: null,
	});

	const handlePFor = (type) => () => {
		setpFor(type);
	};
	const handleType = (pType) => () => {
		setType(pType);
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
				return <FurnishHOC component={RentApartment} pType={type} />;
			case 'hostel':
			case 'pg':
				return <FurnishHOC component={RentHostel} pType={type} />;

			default:
				break;
		}
	};
	const renderSaleTypesComponent = () => {
		switch (type) {
			case 'flat':
			case 'independenthouse':
				return <FurnishHOC component={SaleApartment} pType={type} />;

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
					<Box mt="3rem">
						<Typography variant="h5" gutterBottom align="center">
							Your Details
						</Typography>
						<Typography gutterBottom align="center">
							You are
						</Typography>
						<Box
							mt="1rem"
							className={clsx(
								classes.alignCenter,
								gClasses.smFlexWrap
							)}
						>
							<Box className={classes.selectChip}>
								<Select>Owner</Select>
							</Box>

							<Box className={classes.selectChip}>
								<Select>Agent</Select>
							</Box>
							<Box className={classes.selectChip}>
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
