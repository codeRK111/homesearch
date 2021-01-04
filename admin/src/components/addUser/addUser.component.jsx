import './addUser.styles.scss';

import {
	selectAddUserError,
	selectAddUserLoading,
} from '../../redux/users/users.selector';
import { selectAllStates, selectLoading } from '../../redux/city/city.selector';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import RenderByRole from '../../components/roleRender/renderByRole.component';
import Select from '@material-ui/core/Select';
import SnackBar from '../snackbar/snackbar.component';
import TextField from '@material-ui/core/TextField';
import { addUser } from '../../redux/users/users.actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import useForm from '../../hooks/useForm';
import { useHistory } from 'react-router-dom';

const AddUser = ({
	allSTates,
	loading,
	fetchStatesStart,
	addUserRequest,
	addUserLoading,
	addUserError,
	currentUser,
}) => {
	const history = useHistory();
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [cities, setCities] = React.useState([]);
	const [cityLoading, setCityLoading] = React.useState(false);

	const [form, setForm] = useForm({
		name: '',
		email: '',
		password: '',
		city: '',
		number: '',
		gender: 'male',
		numberVerified: true,
		role: 'tenant',
		registerThrough: 'admin',
		registerVia: 'Web',
		mobileStatus: 'semi-private',
		paymentStatus: 'unpaid',
		status: 'active',
		createdBy: 'Armaan',
	});

	const [file, setFile] = React.useState('');
	const handleFileChange = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};

	const [formError, setFormError] = React.useState({
		name: '',
		email: '',
		password: '',
		state: '',
		city: '',
		number: '',
		// gender: '',
		// numberVerified: '',
		// role: '',
	});

	React.useEffect(() => {
		if (form.state) {
			setCityLoading(true);
			const url = `/api/v1/cities/states/${form.state}`;
			axios
				.get(url)
				.then((resp) => {
					setCityLoading(false);
					const respData = resp.data;
					console.log(respData);
					setCities(respData.data.cities);
				})
				.catch((error) => {
					setCityLoading(false);
					console.log(error);
					const errorResponse = error.response.data;
					setFormError((prevState) => ({
						...prevState,
						city: errorResponse.message,
					}));
				});
		}
	}, [form.state]);

	const validateForm = () => {
		let isError = false;
		for (const key in form) {
			if (!form[key]) {
				isError = true;
				setFormError((prevState) => ({
					...prevState,
					[key]: `${key} required`,
				}));
			} else {
				setFormError((prevState) => ({
					...prevState,
					[key]: '',
				}));
			}
		}
		return isError;
	};

	const handleSnackbar = (openState) => () => {
		setSnackbarOpen(openState);
	};

	const fetchStates = (e) => {
		if (allSTates.length === 0) {
			fetchStatesStart();
		}
	};

	const printMessage = (status, msg = null) => {
		if (status == 'success') {
			// history.push('/users');
		} else {
			console.error(msg);
		}
	};

	const buttonClick = () => {
		console.log(form);
		if (validateForm()) return;
		console.log(formError);
		var imagefile = document.querySelector('#file');
		addUserRequest({ ...form, image: imagefile.files[0] }, printMessage);
	};

	const checkStateExist = (e) => {
		if (!form.state) {
			setFormError((prevState) => ({
				...prevState,
				city: 'Please choose a state',
			}));
		} else {
			setFormError((prevState) => ({
				...prevState,
				city: '',
			}));
		}
	};

	const StateNode = RenderByRole({
		'super-admin': (
			<Grid item xs={12} md={4}>
				<FormControl
					variant="outlined"
					fullWidth
					size="small"
					error={!!formError.state}
				>
					<InputLabel htmlFor="outlined-age-native-simple">
						State
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						onOpen={fetchStates}
						value={form.state}
						name="state"
						onChange={setForm}
						label="State"
						variant="outlined"
						fullWidth
						size="small"
					>
						{loading && (
							<MenuItem value="" disabled>
								<em>Loading...</em>
							</MenuItem>
						)}
						{allSTates.map((c, i) => (
							<MenuItem key={i} value={c}>
								{c}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{formError.state}</FormHelperText>
				</FormControl>
			</Grid>
		),
	});

	const CityNode = RenderByRole({
		'super-admin': (
			<Grid item xs={12} md={4}>
				<FormControl
					variant="outlined"
					fullWidth
					size="small"
					error={!!formError.city}
				>
					<InputLabel htmlFor="outlined-age-native-simple">
						City
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="city"
						value={form.city}
						onChange={setForm}
						onOpen={checkStateExist}
						label="City"
						variant="outlined"
						fullWidth
						size="small"
					>
						{cityLoading && (
							<MenuItem value="" disabled>
								<em>Loading...</em>
							</MenuItem>
						)}
						{cities.map((c) => (
							<MenuItem key={c.id} value={c.id}>
								{c.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{formError.city}</FormHelperText>
				</FormControl>
			</Grid>
		),
		admin: (
			<Grid item xs={12} md={4}>
				<FormControl
					variant="outlined"
					fullWidth
					size="small"
					error={!!formError.city}
				>
					<InputLabel htmlFor="outlined-age-native-simple">
						City
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="city"
						value={form.city}
						onChange={setForm}
						label="City"
						variant="outlined"
						fullWidth
						size="small"
					>
						{currentUser.userAccessCities.map((c) => (
							<MenuItem key={c.id} value={c.id}>
								{c.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{formError.city}</FormHelperText>
				</FormControl>
			</Grid>
		),
		staff: (
			<Grid item xs={12} md={4}>
				<FormControl
					variant="outlined"
					fullWidth
					size="small"
					error={!!formError.city}
				>
					<InputLabel htmlFor="outlined-age-native-simple">
						City
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="city"
						value={form.city}
						onChange={setForm}
						label="City"
						variant="outlined"
						fullWidth
						size="small"
					>
						{currentUser.userAccessCities.map((c) => (
							<MenuItem key={c.id} value={c.id}>
								{c.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{formError.city}</FormHelperText>
				</FormControl>
			</Grid>
		),
	});
	return (
		<Box m="2rem">
			<IconButton
				aria-label="back"
				onClick={() => history.push('/users')}
			>
				<ArrowBackIcon />
			</IconButton>
			<Box m="1rem">
				<h3>Add user</h3>
			</Box>
			<Grid container spacing={2}>
				{addUserError && (
					<SnackBar
						open={snackbarOpen}
						message={addUserError}
						handleClose={handleSnackbar(false)}
					/>
				)}
				<Grid item xs={12} md={4}>
					<TextField
						error={!!formError.name}
						helperText={formError.name}
						id="outlined-basic"
						label="Name"
						name="name"
						value={form.name}
						onChange={setForm}
						variant="outlined"
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<TextField
						error={!!formError.email}
						helperText={formError.email}
						id="outlined-basic"
						label="Email"
						name="email"
						value={form.email}
						onChange={setForm}
						variant="outlined"
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<TextField
						error={!!formError.password}
						helperText={formError.password}
						id="outlined-basic"
						label="Password"
						name="password"
						value={form.password}
						onChange={setForm}
						variant="outlined"
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<TextField
						error={!!formError.number}
						helperText={formError.number}
						id="outlined-basic"
						label="Phone"
						name="number"
						value={form.number}
						onChange={setForm}
						type="text"
						variant="outlined"
						fullWidth
						size="small"
					/>
				</Grid>

				<Grid item xs={12} md={4}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							Gender
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="gender"
							value={form.gender}
							onChange={setForm}
							label="Gender"
							variant="outlined"
							fullWidth
							size="small"
						>
							<MenuItem value={'male'}>Male</MenuItem>
							<MenuItem value={'female'}>Female</MenuItem>
							<MenuItem value={'other'}>Other</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<StateNode />
				<CityNode />

				<Grid item xs={12} md={4}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							Verified
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="numberVerified"
							value={form.numberVerified}
							onChange={setForm}
							label="Gender"
							variant="outlined"
							fullWidth
							size="small"
						>
							<MenuItem value={true}>Yes</MenuItem>
							<MenuItem value={false}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							User Role
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="role"
							value={form.role}
							onChange={setForm}
							variant="outlined"
							fullWidth
							size="small"
							labelWidth={60}
						>
							<MenuItem value={'builder'}>Builder</MenuItem>
							<MenuItem value={'agent'}>Agent</MenuItem>
							<MenuItem value={'owner'}>Owner</MenuItem>
							<MenuItem value={'tenant'}>Tenant</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={4}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							Payment Status
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="paymentStatus"
							value={form.paymentStatus}
							onChange={setForm}
							variant="outlined"
							fullWidth
							size="small"
							labelWidth={60}
						>
							<MenuItem value={'paid'}>Paid</MenuItem>
							<MenuItem value={'unpaid'}>Unpaid</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							Status
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="status"
							value={form.status}
							onChange={setForm}
							variant="outlined"
							fullWidth
							size="small"
							labelWidth={60}
						>
							<MenuItem value={'active'}>Active</MenuItem>
							<MenuItem value={'inactive'}>Inactive</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							Mobile Status
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="mobileStatus"
							value={form.mobileStatus}
							onChange={setForm}
							variant="outlined"
							fullWidth
							size="small"
							labelWidth={60}
						>
							<MenuItem value={'private'}>Private</MenuItem>
							<MenuItem value={'semi-private'}>
								Semiprivate
							</MenuItem>
							<MenuItem value={'public'}>Public</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<Box mt="1rem">
						<Box display="flex" flexDirection="column">
							<input
								type="file"
								onChange={handleFileChange}
								id="file"
							/>
							{file && (
								<img src={file} height="300px" width="500px" />
							)}
						</Box>
					</Box>
				</Grid>
				<Box mt="10px">
					{addUserLoading ? (
						<CircularProgress />
					) : (
						<Button
							color="primary"
							variant="contained"
							classes={{
								label: 'transform-none',
							}}
							onClick={buttonClick}
						>
							Add User
						</Button>
					)}
				</Box>
			</Grid>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allSTates: selectAllStates,
	loading: selectLoading,
	addUserLoading: selectAddUserLoading,
	addUserError: selectAddUserError,
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	addUserRequest: (user, callback) => dispatch(addUser({ user, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
