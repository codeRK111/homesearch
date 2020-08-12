import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import './addUser.styles.scss';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SnackBar from '../snackbar/snackbar.component';
import useForm from '../../hooks/useForm';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllStates, selectLoading } from '../../redux/city/city.selector';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { addUser } from '../../redux/users/users.actions';
import {
	selectAddUserLoading,
	selectAddUserError,
} from '../../redux/users/users.selector';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImagePicker from '../imagePicker/imagePicker.component';

const AddUser = ({
	allSTates,
	loading,
	fetchStatesStart,
	addUserRequest,
	addUserLoading,
	addUserError,
}) => {
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [cities, setCities] = React.useState([]);
	const [cityLoading, setCityLoading] = React.useState(false);

	const [form, setForm] = useForm({
		name: '',
		email: '',
		password: '',
		state: '',
		city: '',
		number: '',
		gender: 'male',
		numberVerified: true,
		role: 'tenant',
		registerThrough: 'admin',
		registerVia: 'Admin User',
		mobileStatus: 'semi-private',
		paymentStatus: 'unpaid',
		status: 'active',
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
		console.log('fired');
		console.log(allSTates);
		if (allSTates.length === 0) {
			fetchStatesStart();
		}
	};

	const printMessage = (msg) => {
		console.error(msg);
	};

	const buttonClick = () => {
		console.log(form);
		if (validateForm()) return;
		console.log(formError);
		// handleSnackbar(true)();
		console.log('-------------------');
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
	return (
		<Box m="2rem">
			<Box m="1rem">
				<h3>Add user</h3>
			</Box>
			<Grid container spacing={1}>
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
					<Box mt="10px" mb="10px">
						<Divider />
					</Box>
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
					<Box mt="10px" mb="10px">
						<Divider />
					</Box>
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
					<Box mt="10px" mb="10px">
						<Divider />
					</Box>
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
					<Box mt="10px" mb="10px">
						<Divider />
					</Box>
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
					<Box mt="10px" mb="10px">
						<Divider />
					</Box>
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
					<Box mt="10px" mb="10px">
						<Divider />
					</Box>
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
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
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
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
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
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
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
							</Select>
						</FormControl>
					</Grid>
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
								label: 'tranform-none',
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	addUserRequest: (user, callback) => dispatch(addUser({ user, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
