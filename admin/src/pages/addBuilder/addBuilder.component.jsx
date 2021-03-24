import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import {
	selectCityLoading as cityLoading,
	selectAllStates,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';
import {
	fetchAllStatesStart,
	fetchCitiesStart as fetchCities,
} from '../../redux/city/city.actions';

import Backdrop from '@material-ui/core/Backdrop';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormHeader from '../../components/formHeader/formHeader.component';
import ProgressBar from '../../components/asyncProgressBar/asyncProgressBar.component';
import PropTypes from 'prop-types';
import React from 'react';
import RenderByRole from '../../components/roleRender/renderByRole.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import { addBuilder } from '../../redux/builder/builder.action';
import { selectAddBuilderLoading as addBuilderLoading } from '../../redux/builder/builder.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const PropertySale = ({
	allStates,
	stateLoading,
	fetchStatesStart,
	cityLoading,
	fetchCities,
	addBuilderLoading,
	addBuilder,
	currentUser,
}) => {
	const history = useHistory();
	const [cities, setCities] = React.useState([]);
	const [selectedState, setSelectedState] = React.useState('');
	const [selectedCities, setSelectedCities] = React.useState([]);
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);
	const [property, setProperty] = React.useState({
		developerName: '',
		description: '',
		phoneNumber: '',
		email: '',
		operatingSince: Date.now(),
		state: '',
		cities: [],
		logo: '',
		officeAddress: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		image5: '',
		image6: '',
	});
	const [asyncError, setAsyncError] = React.useState('');

	const validateFields = () => {
		let citiesStatus =
			cities.filter((c) => c.value)['length'] > 0 ? true : false;
		return (
			property.developerName &&
				property.description &&
				property.officeAddress,
			property.operatingSince && citiesStatus
		);
	};

	const handleAddBuilder = (type, data) => {
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
			developerName: property.developerName.trim(),
			description: property.description.trim(),
			phoneNumber: property.phoneNumber.trim(),
			email: property.email.trim(),
			officeAddress: property.officeAddress.trim(),
			operatingSince: property.operatingSince,
			cities: cities.filter((c) => c.value).map((b) => b.id),
			image: {
				logo: property.logo,
				image1: property.image1,
				image2: property.image2,
				image3: property.image3,
				image4: property.image4,
				image5: property.image5,
				image6: property.image6,
			},
		};
		addBuilder(builder, handleAddBuilder);
	};

	const handleFetchCity = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCities(data.cities.map((c) => ({ ...c, value: false })));
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
		console.log({
			selectedState,
			role: currentUser.role,
		});
		if (selectedState && currentUser.type === 'super-admin') {
			fetchCities(selectedState, handleFetchCity);
		} else {
			setCities(
				currentUser.builderAccessCities.map((c) => ({
					...c,
					value: false,
				}))
			);
		}
	}, [selectedState]);

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
					b.value = ev.checked;
				}
				return b;
			})
		);
	};

	React.useEffect(() => {
		if (addBuilderLoading) {
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
	}, [addBuilderLoading]);

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
								!property[`image${c}`]
									? require('../../assets/no-image.jpg')
									: URL.createObjectURL(property[`image${c}`])
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
							setProperty((prevState) => ({
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

	const StateNode = RenderByRole({
		'super-admin': (
			<RowSelect
				heading="State"
				loading={stateLoading}
				name="state"
				label="State"
				onChange={handleChange}
				onOpen={fetchState}
				onClose={setState}
				menuItems={allStates.map((c) => ({
					label: c,
					value: c,
				}))}
			/>
		),
	});
	const CityNode = RenderByRole({
		'super-admin': selectedState && (
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
												handleCityCheckbox(e, c)
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
		),
		admin: (
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
												handleCityCheckbox(e, c)
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
		),
		staff: (
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
												handleCityCheckbox(e, c)
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
		),
	});
	return (
		<Box p="1rem">
			{addBuilderLoading && (
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
						heading="Developer Name"
						name="developerName"
						onChange={handleChange}
						label="Enter developer Name"
					/>
					<RowTextField
						heading="Description"
						name="description"
						label="Enter Description"
						onChange={handleChange}
						multiline={true}
						rows={6}
					/>
					<RowTextField
						heading="Contact number"
						name="phoneNumber"
						onChange={handleChange}
						label="Enter phone number"
					/>
					<RowTextField
						heading="Contact email"
						name="email"
						onChange={handleChange}
						label="Enter email"
					/>
					{/* <StateNode />
					<CityNode /> */}
					<RowSelect
						heading="State"
						loading={stateLoading}
						name="state"
						label="State"
						onChange={handleChange}
						onOpen={fetchState}
						onClose={setState}
						menuItems={allStates.map((c) => ({
							label: c,
							value: c,
						}))}
					/>
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
														handleCityCheckbox(e, c)
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
					{}
					<RowTextField
						heading="Office Address"
						name="officeAddress"
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
										!property['logo']
											? require('../../assets/no-image.jpg')
											: URL.createObjectURL(
													property['logo']
											  )
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
									setProperty((prevState) => ({
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
							Add Builder
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allStates: selectAllStates,
	currentUser: selectCurrentUser,
	stateLoading,
	cityLoading,
	addBuilderLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	addBuilder: (builder, callback) =>
		dispatch(addBuilder({ builder, callback })),
});

PropertySale.propTypes = {
	allStates: PropTypes.array,
	stateLoading: PropTypes.bool,
	cityLoading: PropTypes.bool,
	addBuilderLoading: PropTypes.bool,
	fetchStatesStart: PropTypes.func,
	fetchCities: PropTypes.func,
	addBuilder: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertySale);
