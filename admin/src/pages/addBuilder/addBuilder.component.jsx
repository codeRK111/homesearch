import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import ProgressBar from '../../components/asyncProgressBar/asyncProgressBar.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import RenderByRole from '../../components/roleRender/renderByRole.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import { selectAddBuilderLoading as addBuilderLoading } from '../../redux/builder/builder.selector';
import {
	fetchAllStatesStart,
	fetchCitiesStart as fetchCities,
} from '../../redux/city/city.actions';
import {
	selectAllStates,
	selectCityLoading as cityLoading,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';
import { setSnackbar } from '../../redux/ui/ui.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { apiUrl } from '../../utils/render.utils';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	image: {
		width: '100px',
		height: '100px',
	},
	input: {
		display: 'none',
	},
	label: {
		padding: '0.5rem 1.7rem',
		border: '1px solid #cccccc',
		width: '100%',
		borderRadius: '5px',
		backgroundColor: '#cccccc',
		cursor: 'pointer',
	},
}));

const PropertySale = ({
	allStates,
	stateLoading,
	fetchStatesStart,
	cityLoading,
	fetchCities,
	addBuilderLoading,
	currentUser,
	setSnackbar,
}) => {
	const history = useHistory();
	const cancelToken = React.useRef(undefined);
	const [cities, setCities] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [selectedState, setSelectedState] = React.useState('');
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
		officeAddress: '',
		totalProjects: '',
		underConstructionProjects: '',
		completedProjects: '',
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

	const onSubmit = () => {
		cancelToken.current = axios.CancelToken.source();
		const token = localStorage.getItem('JWT');
		const formData = new FormData();
		for (const key in property) {
			if (property.hasOwnProperty(key)) {
				if (key === 'cities') {
					const c = cities.filter((c) => c.value).map((b) => b.id);
					c.forEach((c) => {
						formData.append('cities', c);
					});
				} else {
					formData.append(key, property[key]);
				}
			}
		}
		const propertyImages = photos
			.filter((c) => !!c.image)
			.map((b) => b.image);
		propertyImages.forEach((c) => {
			formData.append('photos', c);
		});
		setLoading(true);
		axios
			.post(apiUrl(`/builder`, 'v2'), formData, {
				cancelToken: cancelToken.current.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((_) => {
				setLoading(false);
				history.push('/builders/active');
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setSnackbar({
					open: true,
					message,
					severity: 'error',
				});
				return;
			});
	};

	const handleFetchCity = (type, data) => {
		if (type === 'success') {
			setCities(data.cities.map((c) => ({ ...c, value: false })));
		}
	};

	const fetchState = () => {
		fetchStatesStart();
	};

	const setState = (e) => {
		console.log(e);
		setSelectedState(e.target.innerText);
	};

	React.useEffect(() => {
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

	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel(
					'Operation canceled due to new request'
				);
			}
		};
	}, []);

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
			{loading && (
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
					<RowTextField
						heading="Total Projects"
						name="totalProjects"
						onChange={handleChange}
						label="Enter total projects"
					/>
					<RowTextField
						heading="Ongoing Projects"
						name="underConstructionProjects"
						onChange={handleChange}
						label="Enter ongoing projects"
					/>
					<RowTextField
						heading="Completed Projects"
						name="completedProjects"
						onChange={handleChange}
						label="Enter completed projects"
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
					<Box p="0.8rem">
						<Grid container spacing={3}>
							{photos.map((c, i) => (
								<Grid key={c.id} item xs={6} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												c.image
													? URL.createObjectURL(
															c.image
													  )
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

	setSnackbar: (config) => dispatch(setSnackbar(config)),
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
