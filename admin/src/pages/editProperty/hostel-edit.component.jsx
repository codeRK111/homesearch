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
	numberOfRoomMates: '',
	numberOfBedRooms: 1,
	numberOfBalconies: 0,
	noOfFloors: 1,
	typeOfToilets: '',
	toiletTypes: '',
	toiletIndian: '',
	toiletWestern: '',
	rent: '',
	securityDeposit: '',
	noticePeriod: '',
	furnished: 'furnished',
	furnishes: [],
	externalAmenities: [],
	otherAmenties: [],
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
			s['otherAmenties'] = state['otherAmenties'].map((c) => c.id);
			s['furnishes'] = state['furnishes'].map((c) => c.id);
			setHostel(s);
		}
	}, [loading, state]);

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
		if (event.target.checked === true) {
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

	const handleDatePicker = (date) => {
		setHostel((prevState) => ({
			...prevState,
			availableDate: date,
		}));
	};

	const buttonClick = () => {
		let propertyDetails = filter(hostel);

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

			<RowChildren heading={'Available for'}>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hostel.availableFor.includes(
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
								checked={hostel.availableFor.includes('men')}
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
								checked={hostel.availableFor.includes('women')}
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
								checked={hostel.availableFor.includes(
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
								checked={hostel.availableFor.includes(
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
								checked={hostel.availableFor.includes('family')}
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
				heading="Number of roommates"
				name="numberOfRoomMates"
				label="Roommates"
				value={hostel.numberOfRoomMates}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Number of bedrooms"
				name="numberOfBedRooms"
				label="Bedrooms"
				value={hostel.numberOfBedRooms}
				onChange={handleChange}
				type="number"
			/>
			<RowTextField
				heading="Number of balconies"
				name="numberOfBalconies"
				label="Balconies"
				value={hostel.numberOfBalconies}
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
				label="Toilet"
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
			{hostel.furnished !== 'unfurnished' && (
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

			<RowChildren heading={'Other Amenities'}>
				{amenities
					.filter((b) => b.type === 'internal')
					.map((c) => (
						<Grid item xs={12} lg={6} key={c.id}>
							{/* {`${c.name}`} */}
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
							{/* {`${c.name}`} */}
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
