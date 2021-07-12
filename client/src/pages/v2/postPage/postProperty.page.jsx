import { Box, Typography } from '@material-ui/core';

import ChoosePlan from '../../../components/v2/propertyPlans/choosePlan.component';
import CitySearch from '../../../components/v2/cityDropDown';
import FurnishHOC from '../../../components/furnishes/hoc';
import LocationSearch from '../../../components/v2/locationDropDown';
import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import RentApartment from './rent/apartment.component';
import RentHostel from './rent/hostel.component';
import SaleApartment from './sale/apartment.component';
import SaleLand from './sale/land.component';
import Select from '../../../components/v2/chipSelect/chipSelected.component';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../../redux/auth/auth.selectors';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlobalStyles from '../../../common.style';
import useStyles from './postPage.style';

const PostProperty = ({ isAuthenticated, toggleLoginPopup }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [pFor, setpFor] = React.useState('');
	const [openPlan, setOpenPlan] = React.useState(false);
	const [type, setType] = React.useState('');
	const [selectedCity, setSelectedCity] = React.useState({
		id: null,
		name: null,
	});
	const [selectedLocation, setSelectedLocation] = React.useState({
		id: null,
		name: null,
	});

	const togglePlanPopUp = (status) => () => {
		setOpenPlan(status);
	};

	const handlePFor = (type) => () => {
		setpFor(type);
	};
	const handleType = (pType) => () => {
		setType(pType);
	};
	const onPost = () => {
		if (pFor && type) {
			if (isAuthenticated) {
				togglePlanPopUp(true)();
			} else {
				toggleLoginPopup(true);
			}
		}
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
			case 'land':
				return <SaleLand pType={type} />;

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

					<Box mt="3rem" className={gClasses.justifyCenter}>
						<button className={classes.postButton} onClick={onPost}>
							Post Ad Now
						</button>
					</Box>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PostProperty);
