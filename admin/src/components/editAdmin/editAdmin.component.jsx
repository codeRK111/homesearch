import React from 'react';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectAllStates,
	selectLoading as stateLoading,
	selectAllCity,
} from '../../redux/city/city.selector';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { updateAdmin } from '../../redux/admins/admins.actions';
import {
	selectUpdateAdminError,
	selectUpdateAdminLoading,
} from '../../redux/admins/admins.selector';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const EditUser = ({
	match,
	updateLoading,
	updateError,
	updateAdmin,
	stateLoading,
	fetchStatesStart,
	allSTates,
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [userLoading, setuserLoading] = React.useState(false);
	const [isPasswordChanged, setIspasswordChanged] = React.useState(false);
	const [checkAll, setCheckAll] = React.useState(false);
	const [state, selectState] = React.useState('');
	const [userInfo, setUserInfo] = React.useState({
		name: '',
		username: '',
		email: '',
		password: '',
		cities: [],
		gender: '',
		status: '',
		ableToSee: [],
		type: '',
	});
	const [cityLoading, setCityLoading] = React.useState(false);
	const [fetchAdminError, setFetchAdminError] = React.useState(null);
	const [cities, setCities] = React.useState([]);
	const [file, setFile] = React.useState('');
	const handleFileChange = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};

	React.useEffect(() => {
		if (state) {
			setCityLoading(true);
			const url = `/api/v1/cities/states/${state}`;
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
					// setuserInfoError((prevState) => ({
					// 	...prevState,
					// 	city: errorResponse.message,
					// }));
				});
		}
	}, [state]);
	React.useEffect(() => {
		console.log(match);

		if (match.params.id) {
			setuserLoading(true);
			const url = `/api/v1/admins/${match.params.id}`;
			axios
				.get(url)
				.then((resp) => {
					setuserLoading(false);
					const respData = resp.data;
					setUserInfo(respData.data.admin);
					selectState(respData.data.admin.cities[0].state);
					if (respData.data.admin.password) {
						respData.data.admin.password = 'default';
					}
					respData.data.admin.cities = respData.data.admin.cities.map(
						(c) => c.id
					);
					console.log(respData.data.admin);
					if (respData.data.admin) {
						setFile(`/profile/${respData.data.admin.photo}`);
					}
					setFetchAdminError(null);
				})
				.catch((error) => {
					setuserLoading(false);
					console.log(error);
					const errorResponse = error.response.data;
					setFetchAdminError(errorResponse.message);
				});
		}
	}, [match.params.id]);

	const redirectToAdmins = () => history.push('/admins');

	const buttonClick = () => {
		console.log(userInfo);
		let l = { ...userInfo };
		if (!isPasswordChanged) {
			delete l.password;
		}
		var imagefile = document.querySelector('#file');
		console.log(l);
		updateAdmin(
			{ ...l, image: imagefile.files[0] },
			match.params.id,
			redirectToAdmins
		);
	};

	const setForm = (label) => (event) => {
		let b = event.target;
		if (label === 'password') {
			setIspasswordChanged(true);
		}
		setUserInfo((prevSTate) => ({
			...prevSTate,
			[label]: b.value,
		}));
	};

	const handleCheckbox = (label) => (event) => {
		console.log(event.target.checked);
		if (event.target.checked == true) {
			setUserInfo((prevState) => ({
				...prevState,
				ableToSee: [...prevState.ableToSee, label],
			}));
		} else {
			setUserInfo((prevState) => ({
				...prevState,
				ableToSee: prevState.ableToSee.filter((b) => b !== label),
			}));
		}
	};

	const handleCityCheckbox = (id) => (event) => {
		if (event.target.checked == true) {
			setUserInfo((prevState) => ({
				...prevState,
				cities: [...prevState.cities, id],
			}));
		} else {
			setUserInfo((prevState) => ({
				...prevState,
				cities: prevState.cities.filter((b) => b !== id),
			}));
		}
	};

	const handleCheckAll = (event) => {
		setCheckAll(event.target.checked);
		if (event.target.checked) {
			setUserInfo((prevState) => ({
				...prevState,
				cities: cities.map((c) => c.id),
			}));
		} else {
			setUserInfo((prevState) => ({
				...prevState,
				cities: [],
			}));
		}
	};

	const fetchStates = () => {
		fetchStatesStart();
	};

	return (
		<Box p="1rem">
			<IconButton
				aria-label="back"
				onClick={() => history.push('/admins')}
			>
				<ArrowBackIcon />
			</IconButton>
			<div>
				<h3>Edit admin / staff</h3>
				<p>{fetchAdminError || updateError}</p>
				<Backdrop
					className={classes.backdrop}
					open={userLoading || updateLoading}
					// onClick={handleClose}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<TextField
							id="outlined-basic"
							label="Name"
							value={userInfo.name}
							onChange={setForm('name')}
							variant="outlined"
							fullWidth
							size="small"
						/>
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
						<TextField
							id="outlined-basic"
							label="Username"
							value={userInfo.username}
							onChange={setForm('username')}
							variant="outlined"
							fullWidth
							size="small"
						/>
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
						<TextField
							id="outlined-basic"
							label="email"
							value={userInfo.email}
							onChange={setForm('email')}
							variant="outlined"
							fullWidth
							size="small"
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id="outlined-basic"
							label="Password"
							name="password"
							value={userInfo.password}
							onChange={setForm('password')}
							variant="outlined"
							fullWidth
							type="password"
							size="small"
						/>
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="outlined-age-native-simple">
								Gender
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								name="gender"
								value={userInfo.gender}
								onChange={setForm('gender')}
								label="gender"
								variant="outlined"
								fullWidth
								size="small"
							>
								<MenuItem value={'male'}>Male</MenuItem>
								<MenuItem value={'female'}>Female</MenuItem>
								<MenuItem value={'other'}>Other</MenuItem>
							</Select>
							{/* <FormHelperText>
									{userInfo.city.name}
								</FormHelperText> */}
						</FormControl>
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="outlined-age-native-simple">
								Type
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								name="type"
								value={userInfo.type}
								onChange={setForm('type')}
								variant="outlined"
								fullWidth
								size="small"
								labelWidth={60}
							>
								<MenuItem value={'super-admin'}>
									Super Admin
								</MenuItem>
								<MenuItem value={'admin'}>Admin</MenuItem>
								<MenuItem value={'staff'}>staff</MenuItem>
							</Select>
						</FormControl>
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
								value={userInfo.status}
								onChange={setForm('status')}
								variant="outlined"
								fullWidth
								size="small"
								labelWidth={60}
							>
								<MenuItem value={'active'}>Active</MenuItem>
								<MenuItem value={'inactive'}>Inactive</MenuItem>
							</Select>
						</FormControl>
						<Box mt="10px" mb="10px">
							<Divider />
						</Box>
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
									<img
										src={file}
										height="100px"
										width="250px"
									/>
								)}
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box mt="1rem">Able to see</Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={userInfo.ableToSee.includes(
										'self-created-users'
									)}
									onChange={handleCheckbox(
										'self-created-users'
									)}
									name="checkedB"
									color="primary"
								/>
							}
							label="Self Created Users"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={userInfo.ableToSee.includes(
										'other-staff-created-users'
									)}
									onChange={handleCheckbox(
										'other-staff-created-users'
									)}
									name="checkedB"
									color="primary"
								/>
							}
							label="Other staff created users"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={userInfo.ableToSee.includes(
										'google-users'
									)}
									onChange={handleCheckbox('google-users')}
									name="checkedB"
									color="primary"
								/>
							}
							label="Google Users"
						/>
					</Grid>
					<Grid item xs={12}>
						<Box mt="1rem" mb="1rem">
							<FormControl
								variant="outlined"
								fullWidth
								size="small"
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									State
								</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									onOpen={fetchStates}
									value={state}
									name="state"
									onChange={(e) =>
										selectState(e.target.value)
									}
									label="State"
									variant="outlined"
									fullWidth
									size="small"
								>
									{stateLoading && (
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
								<FormHelperText>{state}</FormHelperText>
							</FormControl>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" justifyContent="space-between">
							<p>Cities</p>
							<FormControlLabel
								control={
									<Checkbox
										checked={checkAll}
										onChange={handleCheckAll}
										name="checkedF"
										indeterminate
									/>
								}
								label="Select all"
							/>
						</Box>
					</Grid>
					<Grid container spacing={1}>
						{cities.map((c) => (
							<Grid item xs={12} lg={2} key={c.id}>
								<FormControlLabel
									control={
										<Checkbox
											checked={userInfo.cities.includes(
												c.id
											)}
											onChange={handleCityCheckbox(c.id)}
											name="checkedB"
											color="primary"
										/>
									}
									label={c.name}
								/>
							</Grid>
						))}
					</Grid>

					<Grid item xs={12}>
						<Box mt="10px">
							<Button
								color="primary"
								variant="contained"
								classes={{
									label: 'tranform-none',
								}}
								onClick={buttonClick}
							>
								Update
							</Button>
						</Box>
					</Grid>
				</Grid>
			</div>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allSTates: selectAllStates,
	updateLoading: selectUpdateAdminLoading,
	updateError: selectUpdateAdminError,
	stateLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	updateAdmin: (admin, adminId, callback) =>
		dispatch(updateAdmin({ admin, adminId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
