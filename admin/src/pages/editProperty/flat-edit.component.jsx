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
	carParking: 'open',
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
	const classes = useStyles();
	const [flat, setFlat] = React.useState(initialState);
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

		let i = 0;
		const propertyImages = {};
		Object.keys(images).forEach((c) => {
			if (images[c]['type'] === 'local' && images[c]['data']) {
				propertyImages[c] = images[c]['data'];
				i++;
			}
		});
		if (i > 0) {
			propertyDetails['propertyImages'] = propertyImages;
		} else {
			propertyDetails['propertyImages'] = null;
		}

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
								checked={flat.availableFor.includes('Family')}
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
								checked={flat.availableFor.includes(
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
								checked={flat.availableFor.includes(
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
								checked={flat.availableFor.includes(
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
								checked={flat.availableFor.includes(
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
				heading="Car parking"
				name="carParking"
				label="Select"
				value={flat.carParking}
				onChange={handleChange}
				menuItems={[
					{
						label: 'Open',
						value: 'open',
					},
					{
						label: 'Covered',
						value: 'covered',
					},
				]}
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
				{amenities.map((c) => (
					<Grid item xs={12} lg={6} key={c.id}>
						{/* {`${c.name}`} */}
						<FormControlLabel
							control={
								<Checkbox
									checked={flat.amenities.includes(c.id)}
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
