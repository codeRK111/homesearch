import React from 'react';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import RowChildren from '../../components/rowCheckBox/rowCheckbox.component';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const initialState = {
	city: '',
	location: '',
	title: '',
	availableFor: [],
	numberOfBedRooms: 1,
	numberOfBalconies: 0,
	noOfFloors: 1,
	floor: '',
	typeOfToilets: '',
	toiletTypes: '',
	toiletIndian: '',
	toiletWestern: '',
	superBuiltupArea: '',
	carpetArea: '',
	rent: '',
	securityDeposit: '',
	noticePeriod: '',
	furnished: 'furnished',
	furnishes: [],
	externalAmenities: [],
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	availability: '',
	availableDate: new Date(),
	restrictions: '',
	description: '',
};

const filter = (a) => {
	let state = { ...a };
	if (state.furnished === 'unfurnished') {
		delete state['furnished'];
	}
	if (state.availability !== 'specificdate') {
		delete state['availableDate'];
	}

	return state;
};

const toiletMenuItems = [
	{
		label: 'Attached',
		value: 'attached',
	},
	{
		label: 'Common',
		value: 'common',
	},
];

const Flat = ({
	onClick,
	state,
	furnishes = [],
	amenities = [],
	loading = false,
}) => {
	console.log(amenities);
	const [flat, setFlat] = React.useState(initialState);
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFlat((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	React.useEffect(() => {
		if (!loading) {
			let s = { ...state };

			if (state.toiletTypes) {
				console.log(
					state.toiletTypes.find((c) => c.toiletType === 'indian')
				);
				s['toiletIndian'] = state.toiletTypes.find(
					(c) => c.toiletType === 'indian'
				)['numbers'];
				s['toiletWestern'] = state.toiletTypes.find(
					(c) => c.toiletType === 'western'
				)['numbers'];
			}
			console.log(s);
			s['externalAmenities'] = state['externalAmenities'].map(
				(c) => c.id
			);
			s['furnishes'] = state['furnishes'].map((c) => c.id);
			setFlat(s);
		}
	}, [loading, state]);

	const handleCheckbox = (id, name) => (event) => {
		if (event.target.checked === true) {
			setFlat((prevState) => ({
				...prevState,
				[name]: [...prevState[name], id],
			}));
		} else {
			setFlat((prevState) => ({
				...prevState,
				[name]: prevState[name].filter((b) => b !== id),
			}));
		}
	};

	const handleDatePicker = (date) => {
		setFlat((prevState) => ({
			...prevState,
			availableDate: date,
		}));
	};

	const buttonClick = () => {
		let propertyDetails = filter(flat);

		propertyDetails['toiletTypes'] = [
			{
				toiletType: 'indian',
				numbers: flat.toiletIndian,
			},
			{
				toiletType: 'western',
				numbers: flat.toiletWestern,
			},
		];

		onClick(propertyDetails);
	};

	return (
		<>
			<RowTextField
				heading="Title"
				name="title"
				label="Title"
				value={flat.title}
				onChange={handleChange}
			/>
			<RowTextField
				heading="Description"
				name="description"
				label="Description"
				value={flat.description}
				onChange={handleChange}
				multiline={true}
				rows={5}
			/>

			<RowChildren heading={'Available for'}>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={flat.availableFor.includes(
									'bachelors'
								)}
								onChange={handleCheckbox(
									'bachelors',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Bachelors'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={flat.availableFor.includes('men')}
								onChange={handleCheckbox('men', 'availableFor')}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Men'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={flat.availableFor.includes('women')}
								onChange={handleCheckbox(
									'women',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Women'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={flat.availableFor.includes(
									'workingmen'
								)}
								onChange={handleCheckbox(
									'workingmen',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Working men'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={flat.availableFor.includes(
									'workingwomwn'
								)}
								onChange={handleCheckbox(
									'workingwomwn',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Working womwn'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={flat.availableFor.includes('family')}
								onChange={handleCheckbox(
									'family',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Family'}
					/>
				</Grid>
			</RowChildren>
			<RowTextField
				heading="Number of bedrooms"
				name="numberOfBedRooms"
				label="Bedrooms"
				value={flat.numberOfBedRooms}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Number of balconies"
				name="numberOfBalconies"
				label="Balconies"
				value={flat.numberOfBalconies}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Number of floors"
				name="noOfFloors"
				label="Floors"
				value={flat.noOfFloors}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Property on floor"
				name="floor"
				label="Property on"
				value={flat.floor}
				onChange={handleChange}
				type="number"
			/>

			<RowSelect
				heading="Type of Toilets"
				name="typeOfToilets"
				label="Select"
				value={flat.typeOfToilets}
				onChange={handleChange}
				menuItems={toiletMenuItems}
			/>
			<RowTextField
				heading="Number of indian toilet"
				name="toiletIndian"
				label="Toilet"
				value={flat.toiletIndian}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Number of western toilet"
				name="toiletWestern"
				label="Toilet"
				value={flat.toiletWestern}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Super buildup area"
				name="superBuiltupArea"
				label="buildup area"
				value={flat.superBuiltupArea}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Carpet area"
				name="carpetArea"
				label="carpet area"
				value={flat.carpetArea}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Security Deposit"
				name="securityDeposit"
				label="rs"
				value={flat.securityDeposit}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Rent"
				name="rent"
				label="rs"
				value={flat.rent}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Notice Period"
				name="noticePeriod"
				label="days"
				value={flat.noticePeriod}
				onChange={handleChange}
				type="number"
			/>
			<RowSelect
				heading="Furnished"
				name="furnished"
				label="Select"
				value={flat.furnished}
				onChange={handleChange}
				menuItems={[
					{
						label: 'Unfurnished',
						value: 'unfurnished',
					},
					{
						label: 'Furnished',
						value: 'furnished',
					},
					{
						label: 'Semi furnished',
						value: 'semifurnished',
					},
				]}
			/>
			{flat.furnished !== 'unfurnished' && (
				<RowChildren heading={'Furnishes'}>
					{furnishes.map((c) => (
						<Grid item xs={12} lg={6} key={c.id}>
							<FormControlLabel
								control={
									<Checkbox
										checked={flat.furnishes.includes(c.id)}
										onChange={handleCheckbox(
											c.id,
											'furnishes'
										)}
										name="checkedB"
										color="primary"
									/>
								}
								label={c.name}
							/>
						</Grid>
					))}
				</RowChildren>
			)}

			<RowChildren heading={'External Amenities'}>
				{amenities
					.filter((b) => b.type === 'external')
					.map((c) => (
						<Grid item xs={12} lg={6} key={c.id}>
							{/* {`${c.name}`} */}
							<FormControlLabel
								control={
									<Checkbox
										checked={flat.externalAmenities.includes(
											c.id
										)}
										onChange={handleCheckbox(
											c.id,
											'externalAmenities'
										)}
										name="checkedB"
										color="primary"
									/>
								}
								label={c.name}
							/>
						</Grid>
					))}
			</RowChildren>

			<RowTextField
				heading="Distance from school"
				name="distanceSchool"
				label="km"
				value={flat.distanceSchool}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from Railway Stattion"
				name="distanceRailwayStation"
				label="km"
				value={flat.distanceRailwayStation}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from Airport"
				name="distanceAirport"
				label="km"
				value={flat.distanceAirport}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from bus stop"
				name="distanceBusStop"
				label="km"
				value={flat.distanceBusStop}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from hospital"
				name="distanceHospital"
				label="km"
				value={flat.distanceHospital}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Restrictions ( If any )"
				name="restrictions"
				label="Restrictions"
				value={flat.restrictions}
				onChange={handleChange}
			/>
			<RowSelect
				heading="Availability"
				name="availability"
				label="Select"
				value={flat.availability}
				onChange={handleChange}
				menuItems={[
					{
						label: 'Immediately',
						value: 'immediately',
					},
					{
						label: 'Specificdate',
						value: 'specificdate',
					},
				]}
			/>
			{flat.availability === 'specificdate' && (
				<RowDatePicker
					heading="Select date"
					name="availableDate"
					label="Choose Date"
					value={flat.availableDate}
					onChange={handleDatePicker}
				/>
			)}
			{/* <Box p="0.8rem">
				<Grid container>
					<Grid item xs={12} md={12} lg={6}>
						Image
					</Grid>
					<Grid item xs={12} md={12} lg={6}>
						 {imageInput(3)} 
					</Grid>
				</Grid>
			</Box> */}
			<Box>
				<Button
					color="primary"
					variant="contained"
					classes={{
						label: 'transform-none',
					}}
					onClick={buttonClick}
				>
					Update
				</Button>
			</Box>
		</>
	);
};

export default Flat;
