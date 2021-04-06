import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import RowChildren from '../../components/rowCheckBox/rowCheckbox.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import useStyles from './addProperty.styles';

export const capitalizeFirstLetter = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

const initialState = {
	city: '',
	for: 'rent',
	location: '',
	title: '',
	availableFor: [],
	numberOfRoomMates: 1,
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
	fooding: [],
	foodSchedule: [],
	amenities: [],
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	availability: '',
	availableDate: new Date(),
	description: '',
	restrictions: '',
	roomType: 'private',
};

const filter = (a) => {
	let state = { ...a };
	if (state.furnished === 'unfurnished') {
		delete state['furnishes'];
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

const foodingData = [
	{ value: 'veg', label: 'Veg' },
	{ value: 'nonveg', label: 'Non-veg' },
];
const foodScheduleData = [
	{ value: 'bedtea', label: 'Bd tea' },
	{ value: 'breakfast', label: 'Breakfast' },
	{ value: 'lunch', label: 'Lunch' },
	{ value: 'dinner', label: 'Dinner' },
];

const Hostel = ({
	onClick,
	furnishes = [],
	amenities = [],
	type,
	city,
	location,
}) => {
	const classes = useStyles();
	const [hostel, setHostel] = React.useState(initialState);
	const [file, setFile] = React.useState([]);
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	const handleImage = (e) => {
		const { name, files } = e.target;
		setImages((prevState) => ({
			...prevState,
			[name]: files[0],
		}));
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setHostel((prevState) => ({
			...prevState,
			[name]: value,
		}));
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
	const handleCheckboxFooding = (id) => (event) => {
		if (event.target.checked == true) {
			setHostel((prevState) => ({
				...prevState,
				fooding: [...prevState.fooding, id],
			}));
		} else {
			setHostel((prevState) => ({
				...prevState,
				fooding: prevState.fooding.filter((b) => b !== id),
			}));
		}
	};

	const handleCheckboxFoodSchedule = (id) => (event) => {
		if (event.target.checked == true) {
			setHostel((prevState) => ({
				...prevState,
				foodSchedule: [...prevState.foodSchedule, id],
			}));
		} else {
			setHostel((prevState) => ({
				...prevState,
				foodSchedule: prevState.foodSchedule.filter((b) => b !== id),
			}));
		}
	};

	const buttonClick = () => {
		let propertyDetails = filter(hostel);
		let i = 0;
		const propertyImages = {};
		Object.keys(images).forEach((c) => {
			if (images[c]) {
				propertyImages[c] = images[c];
				i++;
			}
		});
		if (i > 0) {
			propertyDetails['propertyImages'] = propertyImages;
		} else {
			propertyDetails['propertyImages'] = null;
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
		propertyDetails['title'] = `${capitalizeFirstLetter(
			type
		)}  in ${location},${city} `;

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
			<RowChildren heading={'Available for'}>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hostel.availableFor.includes('Family')}
								onChange={handleCheckbox(
									'Family',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Family'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hostel.availableFor.includes(
									'Bachelors (Men)'
								)}
								onChange={handleCheckbox(
									'Bachelors (Men)',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Bachelors (Men)'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hostel.availableFor.includes(
									'Bachelors (Women)'
								)}
								onChange={handleCheckbox(
									'Bachelors (Women)',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Bachelors (Women)'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hostel.availableFor.includes(
									'Job holder (Men)'
								)}
								onChange={handleCheckbox(
									'Job holder (Men)',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Job holder (Men)'}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FormControlLabel
						control={
							<Checkbox
								checked={hostel.availableFor.includes(
									'Job holder (Women)'
								)}
								onChange={handleCheckbox(
									'Job holder (Women)',
									'availableFor'
								)}
								name="checkedB"
								color="primary"
							/>
						}
						label={'Job holder (Women)'}
					/>
				</Grid>
			</RowChildren>

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

			<RowChildren heading={'Fooding'}>
				{foodingData.map((c) => (
					<Grid item xs={12} lg={6} key={c.id}>
						<FormControlLabel
							control={
								<Checkbox
									checked={hostel.fooding.includes(c.value)}
									onChange={handleCheckboxFooding(
										c.value,
										'furnishes'
									)}
									name="checkedB"
									color="primary"
								/>
							}
							label={c.label}
						/>
					</Grid>
				))}
			</RowChildren>

			<RowChildren heading={'Food Schedule'}>
				{foodScheduleData.map((c) => (
					<Grid item xs={12} lg={6} key={c.id}>
						<FormControlLabel
							control={
								<Checkbox
									checked={hostel.foodSchedule.includes(
										c.value
									)}
									onChange={handleCheckboxFoodSchedule(
										c.value
									)}
									name="checkedB"
									color="primary"
								/>
							}
							label={c.label}
						/>
					</Grid>
				))}
			</RowChildren>
			<RowChildren heading={'Amenities'}>
				{amenities.map((c) => (
					<Grid item xs={12} lg={6} key={c.id}>
						<FormControlLabel
							control={
								<Checkbox
									checked={hostel.amenities.includes(c.id)}
									onChange={handleCheckbox(c.id, 'amenities')}
									name="checkedB"
									color="primary"
								/>
							}
							label={c.name}
						/>
					</Grid>
				))}
			</RowChildren>
			<RowSelect
				heading="Room type"
				name="roomType"
				label="Select"
				value={hostel.roomType}
				onChange={handleChange}
				menuItems={[
					{
						value: 'private',
						label: 'Private',
					},
					{
						value: 'shared',
						label: 'Shared',
					},
				]}
			/>
			{hostel.roomType === 'shared' && (
				<RowTextField
					heading="Number of roommates"
					name="numberOfRoomMates"
					label="Roommates"
					value={hostel.numberOfRoomMates}
					onChange={handleChange}
					type="number"
				/>
			)}
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
				<Box p="0.8rem">
					<Grid container spacing={3}>
						<Grid item xs={6} lg={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={
										images.image1
											? URL.createObjectURL(images.image1)
											: require('../../assets/no-image.jpg')
									}
									alt="project"
									srcset=""
									className={classes.image}
								/>
							</Box>
							<input
								type="file"
								name="image1"
								onChange={handleImage}
								id="pimage1"
								className={classes.input}
							/>
							<label htmlFor="pimage1" className={classes.label}>
								Upload
							</label>
						</Grid>
						<Grid item xs={6} lg={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={
										images.image2
											? URL.createObjectURL(images.image2)
											: require('../../assets/no-image.jpg')
									}
									alt="project"
									srcset=""
									className={classes.image}
								/>
							</Box>
							<input
								type="file"
								name="image2"
								onChange={handleImage}
								id="pimage2"
								className={classes.input}
							/>
							<label htmlFor="pimage2" className={classes.label}>
								Upload
							</label>
						</Grid>
						<Grid item xs={6} lg={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={
										images.image3
											? URL.createObjectURL(images.image3)
											: require('../../assets/no-image.jpg')
									}
									alt="project"
									srcset=""
									className={classes.image}
								/>
							</Box>
							<input
								type="file"
								name="image3"
								onChange={handleImage}
								id="pimage3"
								className={classes.input}
							/>
							<label htmlFor="pimage3" className={classes.label}>
								Upload
							</label>
						</Grid>
						<Grid item xs={6} lg={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={
										images.image4
											? URL.createObjectURL(images.image4)
											: require('../../assets/no-image.jpg')
									}
									alt="project"
									srcset=""
									className={classes.image}
								/>
							</Box>
							<input
								type="file"
								name="image4"
								onChange={handleImage}
								id="pimage4"
								className={classes.input}
							/>
							<label htmlFor="pimage4" className={classes.label}>
								Upload
							</label>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Box>
				<Button
					color="primary"
					variant="contained"
					classes={{
						label: 'transform-none',
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
