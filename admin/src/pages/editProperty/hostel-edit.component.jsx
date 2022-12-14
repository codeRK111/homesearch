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
import useStyles from '../addProperty/addProperty.styles';

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
	amenities: [],
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	availability: '',
	availableDate: new Date(),
	restrictions: '',
	description: '',
	fooding: [],
	foodSchedule: [],
	roomType: '',
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
	const classes = useStyles();
	const [images, setImages] = React.useState({
		image1: {
			data: null,
			type: 'local',
		},
		image2: {
			data: null,
			type: 'local',
		},
		image3: {
			data: null,
			type: 'local',
		},
		image4: {
			data: null,
			type: 'local',
		},
	});
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
	const handleImage = (e) => {
		const { name, files } = e.target;
		setImages((prevState) => ({
			...prevState,
			[name]: {
				type: 'local',
				data: files[0],
			},
		}));
	};
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

			s['furnishes'] = state['furnishes'].map((c) => c.id);
			s['furnishes'] = state['furnishes'].map((c) => c.id);
			if (s.image1) {
				setImages((prevState) => ({
					...prevState,
					image1: {
						type: 'remote',
						data: `/assets/properties/${s.image1}`,
					},
				}));
			}
			if (s.image2) {
				setImages((prevState) => ({
					...prevState,
					image2: {
						type: 'remote',
						data: `/assets/properties/${s.image2}`,
					},
				}));
			}
			if (s.image3) {
				setImages((prevState) => ({
					...prevState,
					image3: {
						type: 'remote',
						data: `/assets/properties/${s.image3}`,
					},
				}));
			}
			if (s.image4) {
				setImages((prevState) => ({
					...prevState,
					image4: {
						type: 'remote',
						data: `/assets/properties/${s.image4}`,
					},
				}));
			}
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

			<RowChildren heading={'Amenities'}>
				{amenities.map((c) => (
					<Grid item xs={12} lg={6} key={c.id}>
						{/* {`${c.name}`} */}
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
				<Grid container spacing={3}>
					<Grid item xs={6} lg={3}>
						<Box className={classes.imageWrapper}>
							<img
								src={
									images.image1.type === 'local'
										? images.image1.data
											? URL.createObjectURL(
													images.image1.data
											  )
											: require('../../assets/no-image.jpg')
										: images.image1.data
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
									images.image2.type === 'local'
										? images.image2.data
											? URL.createObjectURL(
													images.image2.data
											  )
											: require('../../assets/no-image.jpg')
										: images.image2.data
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
									images.image3.type === 'local'
										? images.image3.data
											? URL.createObjectURL(
													images.image3.data
											  )
											: require('../../assets/no-image.jpg')
										: images.image3.data
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
									images.image4.type === 'local'
										? images.image4.data
											? URL.createObjectURL(
													images.image4.data
											  )
											: require('../../assets/no-image.jpg')
										: images.image4.data
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
