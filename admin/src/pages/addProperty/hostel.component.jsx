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
	numberOfRoomMates: '',
	typeOfToilets: '',
	toiletTypes: '',
	toiletIndian: '',
	toiletWestern: '',
	rent: '',
	floor: '',
	securityDeposit: '',
	noticePeriod: '',
	furnished: 'furnished',
	furnishes: [],
	fooding: '',
	foodSchedule: '',
	otherAmenties: [],
	externalAmenities: [],
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	availability: '',
	availableDate: new Date(),
	description: '',
	restrictions: '',
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

const Hostel = ({ onClick, furnishes = [], amenities = [] }) => {
	console.log(amenities);
	const [hostel, setHostel] = React.useState(initialState);
	const [file, setFile] = React.useState([]);
	const handleChange = (event) => {
		const { name, value } = event.target;
		setHostel((prevState) => ({
			...prevState,
			[name]: value,
		}));
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

	const handleCheckbox = (id, name) => (event) => {
		if (event.target.checked == true) {
			setHostel((prevState) => ({
				...prevState,
				[name]: [...prevState[name], id],
			}));
		} else {
			setHostel((prevState) => ({
				...prevState,
				[name]: prevState[name].filter((b) => b !== id),
			}));
		}
	};

	const buttonClick = () => {
		let propertyDetails = filter(hostel);
		if (file.length > 0) {
			propertyDetails['image'] = file;
		}
		propertyDetails['toiletTypes'] = [
			{
				toiletType: 'indian',
				numbers: hostel.toiletIndian,
			},
			{
				toiletType: 'western',
				numbers: hostel.toiletWestern,
			},
		];

		onClick(propertyDetails);
	};

	const handleDatePicker = (date) => {
		setHostel((prevState) => ({
			...prevState,
			availableDate: date,
		}));
	};

	return (
		<>
			<RowTextField
				heading="Title"
				name="title"
				label="Title"
				value={hostel.title}
				onChange={handleChange}
			/>
			<RowTextField
				heading="Description"
				name="description"
				label="Description"
				value={hostel.description}
				onChange={handleChange}
				multiline={true}
				rows={5}
			/>
			<RowTextField
				heading="Number of roommates"
				name="numberOfRoomMates"
				label="Roommates"
				value={hostel.numberOfRoomMates}
				onChange={handleChange}
				type="number"
			/>
			<RowSelect
				heading="Type of Toilets"
				name="typeOfToilets"
				label="Select"
				value={hostel.typeOfToilets}
				onChange={handleChange}
				menuItems={toiletMenuItems}
			/>
			<RowTextField
				heading="Number of indian toilet"
				name="toiletIndian"
				label="Toilet"
				value={hostel.toiletIndian}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Number of western toilet"
				name="toiletWestern"
				label="Toommates"
				value={hostel.toiletWestern}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Security Deposit"
				name="securityDeposit"
				label="rs"
				value={hostel.securityDeposit}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Rent"
				name="rent"
				label="rs"
				value={hostel.rent}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Notice Period"
				name="noticePeriod"
				label="days"
				value={hostel.noticePeriod}
				onChange={handleChange}
				type="number"
			/>
			<RowSelect
				heading="Furnished"
				name="furnished"
				label="Select"
				value={hostel.furnished}
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
			{hostel.furnished !== 'semifurnished' && (
				<RowChildren heading={'Furnishes'}>
					{furnishes.map((c) => (
						<Grid item xs={12} lg={6} key={c.id}>
							<FormControlLabel
								control={
									<Checkbox
										checked={hostel.furnishes.includes(
											c.id
										)}
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
			<RowSelect
				heading="Fooding"
				name="fooding"
				label="Select"
				value={hostel.fooding}
				onChange={handleChange}
				menuItems={[
					{
						label: 'Veg',
						value: 'veg',
					},
					{
						label: 'Non veg',
						value: 'nonveg',
					},
					{
						label: 'Both',
						value: 'both',
					},
					{
						label: 'None',
						value: 'none',
					},
				]}
			/>
			<RowSelect
				heading="Food Schedule"
				name="foodSchedule"
				label="Select"
				value={hostel.foodSchedule}
				onChange={handleChange}
				menuItems={[
					{
						label: 'Bed Tea',
						value: 'bedtea',
					},
					{
						label: 'Breakfast',
						value: 'breakfast',
					},
					{
						label: 'Lunch',
						value: 'lunch',
					},
					{
						label: 'Evening Snacks',
						value: 'evngsnacks',
					},
					{
						label: 'Dinner',
						value: 'dinner',
					},
				]}
			/>
			<RowChildren heading={'Other Amenities'}>
				{amenities
					.filter((b) => b.type === 'internal')
					.map((c) => (
						<Grid item xs={12} lg={6} key={c.id}>
							<FormControlLabel
								control={
									<Checkbox
										checked={hostel.otherAmenties.includes(
											c.id
										)}
										onChange={handleCheckbox(
											c.id,
											'otherAmenties'
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
			<RowChildren heading={'External Amenities'}>
				{amenities
					.filter((b) => b.type === 'external')
					.map((c) => (
						<Grid item xs={12} lg={6} key={c.id}>
							<FormControlLabel
								control={
									<Checkbox
										checked={hostel.externalAmenities.includes(
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
				value={hostel.distanceSchool}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from Railway Stattion"
				name="distanceRailwayStation"
				label="km"
				value={hostel.distanceRailwayStation}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from Airport"
				name="distanceAirport"
				label="km"
				value={hostel.distanceAirport}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from bus stop"
				name="distanceBusStop"
				label="km"
				value={hostel.distanceBusStop}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Distance from hospital"
				name="distanceHospital"
				label="km"
				value={hostel.distanceHospital}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Restrictions ( If any )"
				name="restrictions"
				label="Restrictions"
				value={hostel.restrictions}
				onChange={handleChange}
			/>
			<RowSelect
				heading="Availability"
				name="availability"
				label="Select"
				value={hostel.availability}
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
			{hostel.availability === 'specificdate' && (
				<RowDatePicker
					heading="Select date"
					name="availableDate"
					label="Choose Date"
					value={hostel.availableDate}
					onChange={handleDatePicker}
				/>
			)}
			<Box p="0.8rem">
				<Grid container>
					<Grid item xs={12} md={12} lg={6}>
						Image
					</Grid>
					<Grid item xs={12} md={12} lg={6}>
						{imageInput(3)}
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Button
					color="primary"
					variant="contained"
					classes={{
						label: 'tranform-none',
					}}
					onClick={buttonClick}
				>
					Add
				</Button>
			</Box>
		</>
	);
};

export default Hostel;
