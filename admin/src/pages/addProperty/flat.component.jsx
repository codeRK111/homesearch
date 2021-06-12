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

const initialState = {
	city: '',
	for: 'rent',
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
	furnishes = [],
	amenities = [],
	type,
	city,
	location,
	renderVilla,
}) => {
	console.log(amenities);
	const classes = useStyles();
	const [flat, setFlat] = React.useState(initialState);
	const [file, setFile] = React.useState([]);
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	const [photos, setPhotos] = React.useState([]);

	const addMore = () => {
		setPhotos([
			...photos,
			{
				id: photos.length + 1,
				image: null,
			},
		]);
	};
	const handleImage = (img) => (e) => {
		const { name, files } = e.target;
		console.log({ name });
		setPhotos((prevState) =>
			prevState.map((c) => {
				if (c.id === img.id) {
					c.image = files[0];
				}
				return c;
			})
		);
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFlat((prevState) => ({
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
		let i = 0;
		const propertyImages = photos
			.filter((c) => !!c.image)
			.map((b) => b.image);

		propertyDetails['propertyImages'] = propertyImages;

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

		propertyDetails[
			'title'
		] = `${propertyDetails.numberOfBedRooms}BHK ${type} for rent in ${location},${city} `;
		onClick(propertyDetails);
	};

	return (
		<>
			{/* <RowTextField
				heading="Title"
				name="title"
				label="Title"
				value={flat.title}
				onChange={handleChange}
			/> */}
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
			{renderVilla ? (
				<RowSelect
					heading="Property on floor"
					name="floor"
					label="Select"
					value={flat.floor}
					onChange={handleChange}
					menuItems={[
						{
							value: 'G',
							label: 'G',
						},
						{
							value: '1',
							label: '1',
						},
						{
							value: '2',
							label: '2',
						},
						{
							value: '3',
							label: '3',
						},
						{
							value: '4',
							label: '4',
						},
						{
							value: 'Entire Building',
							label: 'Entire Building',
						},
					]}
				/>
			) : (
				<RowTextField
					heading="Property on floor"
					name="floor"
					label="Property on"
					value={flat.floor}
					onChange={handleChange}
					type="number"
				/>
			)}

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
				label="Toommates"
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
					{photos.map((c, i) => (
						<Grid key={c.id} item xs={6} lg={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={
										c.image
											? URL.createObjectURL(c.image)
											: require('../../assets/no-image.jpg')
									}
									alt="project"
									srcset=""
									className={classes.image}
								/>
							</Box>
							<input
								type="file"
								onChange={handleImage(c)}
								id={`image-${c.id}`}
								className={classes.input}
							/>
							<label
								htmlFor={`image-${c.id}`}
								className={classes.label}
							>
								Upload
							</label>
						</Grid>
					))}
				</Grid>
				<Box mt="2rem">
					<button onClick={addMore}>Add More Image</button>
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

export default Flat;
