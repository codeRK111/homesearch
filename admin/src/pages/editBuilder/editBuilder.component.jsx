import React from 'react';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import {
	Box,
	Button,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	Checkbox,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
	selectAddBuilderLoading as addBuilderLoading,
	selectFetchBuilderInfoLoading as fetchBuilderInfoLoading,
	selectUpdateBuilderLoading as updateBuilderLoading,
} from '../../redux/builder/builder.selector';
import {
	selectAllStates,
	selectLoading as stateLoading,
	selectCityLoading as cityLoading,
} from '../../redux/city/city.selector';
import {
	fetchAllStatesStart,
	fetchCitiesStart as fetchCities,
} from '../../redux/city/city.actions';
import {
	updateBuilder,
	fetchBuilderInfo,
} from '../../redux/builder/builder.action';
import { addBuilder } from '../../redux/builder/builder.action';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import ProgressBar from '../../components/asyncProgressBar/asyncProgressBar.component';
import Chip from '../../components/chip/chip.component';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const arrCheck = (arr, element) => {
	const exist = arr.find((c) => c.id === element.id);

	return !!exist;
};

const PropertySale = ({
	allStates,
	stateLoading,
	fetchStatesStart,
	cityLoading,
	fetchCities,
	addBuilderLoading,
	updateBuilderLoading,
	fetchBuilderInfoLoading,
	fetchBuilderInfo,
	updateBuilder,
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const [cities, setCities] = React.useState([]);
	const [selectedState, setSelectedState] = React.useState('');
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);
	const [asyncError, setAsyncError] = React.useState('');
	const [assets, handleAssets] = React.useState({
		logo: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		image5: '',
		image6: '',
	});
	const [property, setProperty] = React.useState({
		title: '',
		description: '',
		phoneNumber: '',
		email: '',
		operatingSince: Date.now(),
		state: '',
		cities: [],
		officeAddress: '',
		logo: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		image5: '',
		image6: '',
	});

	const validateFields = () => {
		let citiesStatus = property.cities.length > 0 ? true : false;
		return (
			property.title && property.description && property.officeAddress,
			property.operatingSince && citiesStatus
		);
	};

	const handleUpdateBuilder = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setAsyncError('');
			history.push('/builders/active');
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = () => {
		let builder = {
			title: property.title,
			description: property.description,
			phoneNumber: property.phoneNumber,
			email: property.email,
			officeAddress: property.officeAddress,
			operatingSince: property.operatingSince,
			cities: property.cities.map((c) => c.id),
			image: assets,
		};
		console.log(builder);
		updateBuilder(id, builder, handleUpdateBuilder);
	};

	const handleFetchCity = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCities(data.cities.map((c) => ({ ...c, value: false })));
		}
	};

	const handleFetchBuilderInfo = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setProperty((prevState) => ({ ...prevState, ...data }));
		}
	};

	const fetchState = () => {
		fetchStatesStart();
	};

	const setState = (e) => {
		console.log(e);
		let b = e;
		console.log(e.target.innerText);
		setSelectedState(e.target.innerText);
	};

	React.useEffect(() => {
		if (selectedState) {
			fetchCities(selectedState, handleFetchCity);
		}
	}, [selectedState]);
	React.useEffect(() => {
		if (id) {
			console.log('object');
			fetchBuilderInfo(id, handleFetchBuilderInfo);
		}
	}, [id]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProperty((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCityCheckbox = (e, c) => {
		let ev = e.target;
		console.log(e.target.checked);
		console.log(c);
		setCities((prevState) =>
			prevState.map((b) => {
				if (b.id === c.id) {
					if (ev.checked) {
						if (!arrCheck(property.cities, b)) {
							console.log(b);
							setProperty((prevProperty) => ({
								...prevProperty,
								cities: [...prevProperty.cities, b],
							}));
						}
					} else {
						if (arrCheck(property.cities, b)) {
							setProperty((prevProperty) => ({
								...prevProperty,
								cities: prevProperty.cities.filter(
									(d) => d.id !== b.id
								),
							}));
						}
					}

					b.value = ev.checked;
				}
				return b;
			})
		);
	};

	const handleChip = (chip) => () => {
		setProperty((prevState) => ({
			...prevState,
			cities: prevState.cities.filter((c) => c.id !== chip.id),
		}));
	};

	React.useEffect(() => {
		if (updateBuilderLoading) {
			console.log('test');
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress === 100) {
						return 0;
					}
					const diff = Math.random() * 20;
					return Math.min(oldProgress + diff, 100);
				});
			}, 500);
			return () => {
				clearInterval(timer);
			};
		}
	}, [updateBuilderLoading]);

	const imageCreater = (arr) => {
		return arr.map((c) => (
			<Grid item xs={12} md={3} lg={2} key={c}>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					{/* <p>{values[`image${c}`]}</p> */}
					<div className="image-wrapper">
						<img
							src={
								!property[`image${c}`] && !assets[`image${c}`]
									? require('../../assets/no-image.jpg')
									: assets[`image${c}`]
									? URL.createObjectURL(assets[`image${c}`])
									: `/assets/builders/${
											property[`image${c}`]
									  }`
							}
							alt=""
							srcset=""
							className="image"
						/>
					</div>
					<input
						accept="image/*"
						className="input"
						id={`contained-button-file-${c}`}
						multiple
						type="file"
						onChange={(event) => {
							handleAssets((prevState) => ({
								...prevState,
								[`image${c}`]: event.currentTarget.files[0],
							}));
						}}
					/>
					<label htmlFor={`contained-button-file-${c}`}>
						<Button
							variant="contained"
							color="default"
							component="span"
							startIcon={<CloudUploadIcon />}
							size="small"
							fullWidth
						>
							Upload
						</Button>
					</label>
				</Box>
			</Grid>
		));
	};

	console.log(assets);
	return (
		<Box p="1rem">
			{updateBuilderLoading && (
				<Box
					color="white"
					position="fixed"
					top={60}
					zIndex="tooltip"
					width="75%"
				>
					<ProgressBar progress={progress} />
				</Box>
			)}

			<div style={{ position: 'fixed', zIndex: 10000 }}></div>
			<Backdrop
				className={classes.backdrop}
				open={fetchBuilderInfoLoading}
			>
				loading details...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={cityLoading}>
				loading cities...
			</Backdrop>
			{/* <Backdrop className={classes.backdrop} open={addBuilderLoading}>
				Creating a new builder
			</Backdrop> */}
			<Paper>
				<p className="color-red">{asyncError}</p>
				<Box p="1rem">
					<RowTextField
						heading="Title"
						name="title"
						value={property.title}
						onChange={handleChange}
						label="Enter title"
					/>
					<RowTextField
						heading="Description"
						name="description"
						value={property.description}
						label="Enter description"
						onChange={handleChange}
						multiline={true}
						rows={6}
					/>
					<RowTextField
						heading="Contact number"
						name="phoneNumber"
						value={property.phoneNumber}
						onChange={handleChange}
						label="Enter phone number"
					/>
					<RowTextField
						heading="Contact email"
						name="email"
						value={property.email}
						onChange={handleChange}
						label="Enter email"
					/>

					<RowTextField
						heading="Office Address"
						name="officeAddress"
						value={property.officeAddress}
						label="Enter Office Address"
						onChange={handleChange}
						multiline={true}
						rows={6}
					/>

					<RowDatePicker
						heading="Operating Since"
						name="operatingSince"
						label="Choose Date"
						value={property.operatingSince}
						onChange={(value) =>
							setProperty((prevState) => ({
								...prevState,
								operatingSince: value,
							}))
						}
					/>
					<RowHOC heading="Selected cities">
						<Chip
							chipData={property.cities}
							handleDelete={handleChip}
						/>
					</RowHOC>
					<FormHeader text="Add cities" />
					<RowSelect
						heading="State"
						loading={stateLoading}
						name="state"
						label="State"
						onChange={handleChange}
						value={property.state}
						onOpen={fetchState}
						onClose={setState}
						helperText="Select state to view cities"
						menuItems={allStates.map((c) => ({
							label: c,
							value: c,
						}))}
					/>

					{selectedState && (
						<RowHOC heading="Cities">
							<Grid container>
								{cities.map((c, i) => {
									return (
										<Grid item xs={6} lg={4} key={i}>
											<FormControlLabel
												control={
													<Checkbox
														checked={c.value}
														onChange={(e) =>
															handleCityCheckbox(
																e,
																c
															)
														}
													/>
												}
												label={c.name}
											/>
										</Grid>
									);
								})}
							</Grid>
						</RowHOC>
					)}

					<FormHeader text="Logo & Images" />
					<RowHOC heading="Logo">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
						>
							{/* <p>{values[`image${c}`]}</p> */}
							<div className="image-wrapper">
								<img
									src={
										!property['logo'] && !assets['logo']
											? require('../../assets/no-image.jpg')
											: assets.logo
											? URL.createObjectURL(assets.logo)
											: `/assets/builders/${property.logo}`
									}
									alt=""
									srcset=""
									className="image"
								/>
							</div>
							<input
								accept="image/*"
								className="input"
								id="contained-button-file-logo"
								multiple
								type="file"
								onChange={(event) => {
									handleAssets((prevState) => ({
										...prevState,
										logo: event.currentTarget.files[0],
									}));
								}}
							/>
							<label htmlFor="contained-button-file-logo">
								<Button
									variant="contained"
									color="default"
									component="span"
									startIcon={<CloudUploadIcon />}
									size="small"
									fullWidth
								>
									Upload
								</Button>
							</label>
						</Box>
					</RowHOC>
					<Box mt="1rem" mb="1rem">
						<Grid item xs={12}>
							Images
						</Grid>
					</Box>
					<Grid container spacing={2}>
						{imageCreater(Array.of(1, 2, 3, 4, 5, 6))}
					</Grid>
					<Box mt="1rem">
						<Button
							type="submit"
							color="primary"
							variant="contained"
							classes={{
								label: 'transform-none',
							}}
							disabled={!validateFields()}
							onClick={onSubmit}
						>
							Update Builder
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allStates: selectAllStates,
	stateLoading,
	cityLoading,
	addBuilderLoading,
	fetchBuilderInfoLoading,
	updateBuilderLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	addBuilder: (builder, callback) =>
		dispatch(addBuilder({ builder, callback })),
	fetchBuilderInfo: (builderId, callback) =>
		dispatch(fetchBuilderInfo({ builderId, callback })),
	updateBuilder: (builderId, builder, callback) =>
		dispatch(updateBuilder({ builderId, builder, callback })),
});

PropertySale.propTypes = {
	allStates: PropTypes.array,
	stateLoading: PropTypes.bool,
	cityLoading: PropTypes.bool,
	addBuilderLoading: PropTypes.bool,
	fetchStatesStart: PropTypes.func,
	fetchCities: PropTypes.func,
	addBuilder: PropTypes.func,
	fetchBuilderInfo: PropTypes.func,
	fetchBuilderInfoLoading: PropTypes.bool,
	id: PropTypes.string,
	updateBuilder: PropTypes.func,
	updateBuilderLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertySale);
