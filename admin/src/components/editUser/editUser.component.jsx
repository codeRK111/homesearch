import React from 'react';
import Box from '@material-ui/core/Box';
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
import { selectAllStates, selectLoading } from '../../redux/city/city.selector';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { updateUser } from '../../redux/users/users.actions';
import FormHelperText from '@material-ui/core/FormHelperText';
import { selectLoading as editUserLoading } from '../../redux/users/users.selector';

const EditUser = ({
	match,
	allSTates,
	loading,
	fetchStatesStart,
	editUserLoading,
	updateUser,
}) => {
	const [userLoading, setuserLoading] = React.useState(false);
	const [isPasswordChanged, setIspasswordChanged] = React.useState(false);
	const [userInfo, setUserInfo] = React.useState({
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
	const [cityLoading, setCityLoading] = React.useState(false);
	const [cities, setCities] = React.useState([]);
	const [file, setFile] = React.useState('');
	const handleFileChange = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};

	React.useEffect(() => {
		if (userInfo.state) {
			setCityLoading(true);
			const url = `/api/v1/cities/states/${userInfo.state}`;
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
	}, [userInfo.state]);
	React.useEffect(() => {
		console.log(match);
		fetchStatesStart();
		if (match.params.id) {
			setuserLoading(true);
			const url = `/api/v1/admin/users/${match.params.id}`;
			axios
				.get(url)
				.then((resp) => {
					setuserLoading(false);
					const respData = resp.data;
					console.log(respData);
					setUserInfo(respData.data.user);
					if (respData.data.user) {
						setFile(`/profile/${respData.data.user.photo}`);
					}
				})
				.catch((error) => {
					setuserLoading(false);
					console.log(error);
					// const errorResponse = error.response.data;
				});
		}
	}, [match.params.id]);

	const printMessage = (msg) => {
		console.error(msg);
	};

	const buttonClick = () => {
		console.log(userInfo);
		let l = { ...userInfo };
		if (!isPasswordChanged) {
			delete l.password;
		}
		var imagefile = document.querySelector('#file');
		updateUser(
			{ ...l, image: imagefile.files[0] },
			match.params.id,
			printMessage
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

	const fetchStates = (e) => {
		console.log('fired');
		console.log(allSTates);
		if (allSTates.length === 0) {
			fetchStatesStart();
		}
	};

	const checkStateExist = (e) => {
		// if (!form.state) {
		// 	setFormError((prevState) => ({
		// 		...prevState,
		// 		city: 'Please choose a state',
		// 	}));
		// } else {
		// 	setFormError((prevState) => ({
		// 		...prevState,
		// 		city: '',
		// 	}));
		// }
	};

	return (
		<Box p="1rem">
			<div>
				<h3>Edit user</h3>
				{userLoading ? (
					<CircularProgress />
				) : (
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
								label="Email"
								name="email"
								value={userInfo.email}
								onChange={setForm('email')}
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
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									State
								</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={userInfo.city.state}
									name="state"
									onChange={setForm('state')}
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
								<FormHelperText>
									{userInfo.city.state}
								</FormHelperText>
							</FormControl>
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
							<TextField
								id="outlined-basic"
								label="Phone"
								name="number"
								value={userInfo.number}
								onChange={setForm('number')}
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
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									City
								</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									name="city"
									value={userInfo.city}
									onChange={setForm('city')}
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
								<FormHelperText>
									{userInfo.city.name}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl
								variant="outlined"
								fullWidth
								size="small"
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									Gender
								</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									name="gender"
									value={userInfo.gender}
									defaultValue={userInfo.gender}
									onChange={setForm('gender')}
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
							<FormControl
								variant="outlined"
								fullWidth
								size="small"
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									Verified
								</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									name="numberVerified"
									value={userInfo.numberVerified}
									onChange={setForm('numberVerified')}
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
							<FormControl
								variant="outlined"
								fullWidth
								size="small"
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									User Role
								</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									name="role"
									value={userInfo.role}
									onChange={setForm('role')}
									variant="outlined"
									fullWidth
									size="small"
									labelWidth={60}
								>
									<MenuItem value={'builder'}>
										Builder
									</MenuItem>
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
								<FormControl
									variant="outlined"
									fullWidth
									size="small"
								>
									<InputLabel htmlFor="outlined-age-native-simple">
										Payment Status
									</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										name="paymentStatus"
										value={userInfo.paymentStatus}
										onChange={setForm('paymentStatus')}
										variant="outlined"
										fullWidth
										size="small"
										labelWidth={60}
									>
										<MenuItem value={'paid'}>Paid</MenuItem>
										<MenuItem value={'unpaid'}>
											Unpaid
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={4}>
								<Box mt="10px" mb="10px">
									<Divider />
								</Box>
								<FormControl
									variant="outlined"
									fullWidth
									size="small"
								>
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
										<MenuItem value={'active'}>
											Active
										</MenuItem>
										<MenuItem value={'inactive'}>
											Inactive
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={4}>
								<Box mt="10px" mb="10px">
									<Divider />
								</Box>
								<FormControl
									variant="outlined"
									fullWidth
									size="small"
								>
									<InputLabel htmlFor="outlined-age-native-simple">
										Mobile Status
									</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										name="mobileStatus"
										value={userInfo.mobileStatus}
										onChange={setForm('mobileStatus')}
										variant="outlined"
										fullWidth
										size="small"
										labelWidth={60}
									>
										<MenuItem value={'private'}>
											Private
										</MenuItem>
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
										<img
											src={file}
											height="300px"
											width="500px"
										/>
									)}
								</Box>
							</Box>
						</Grid>
						<Box mt="10px">
							{editUserLoading ? (
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
									Edit User
								</Button>
							)}
						</Box>
					</Grid>
				)}
			</div>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allSTates: selectAllStates,
	loading: selectLoading,
	editUserLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	updateUser: (user, userId, callback) =>
		dispatch(updateUser({ user, userId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
