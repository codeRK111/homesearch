import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { filterUser } from '../../redux/users/users.actions';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { selectAllStates, selectLoading } from '../../redux/city/city.selector';

const FilterData = ({
	filterUser,
	fetchStatesStart,
	allStates,
	stateLoading,
}) => {
	let defaultState = {
		name: '',
		email: '',
		state: '',
		city: '',
		number: '',
		registerThrough: '',
		registerVia: '',
		paymentStatus: '',
		status: '',
	};
	const [form, onChangeForm] = React.useState(defaultState);
	const [cityLoading, setCityLoading] = React.useState(false);
	const [cities, setCities] = React.useState([]);

	React.useEffect(() => {
		if (form.state) {
			setCityLoading(true);
			const url = `/api/v1/cities/states/${form.state}`;
			axios
				.get(url)
				.then((resp) => {
					setCityLoading(false);
					const respData = resp.data;
					setCities(respData.data.cities);
				})
				.catch((error) => {
					setCityLoading(false);
					console.log(error);
					const errorResponse = error.response.data;
				});
		}
	}, [form.state]);

	const setForm = (e) => {
		let b = e.target;
		onChangeForm((prevState) => ({ ...prevState, [b.name]: b.value }));
	};

	const filter = () => {
		const tempObj = { ...form };
		for (const key in form) {
			if (!form[key]) {
				delete tempObj[key];
			}
		}
		console.log(tempObj);
		filterUser(tempObj);
	};

	const fetchStates = (e) => {
		if (allStates.length === 0) {
			fetchStatesStart();
		}
	};

	return (
		<Box p="1rem">
			<h3>Filter Users</h3>
			<Grid container spacing={1}>
				<Grid item xs={12} md={2} lg={2}>
					<TextField
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
				<Grid item xs={12} md={2} lg={2}>
					<TextField
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
				<Grid item xs={12} md={2} lg={2}>
					<TextField
						id="outlined-basic"
						label="Phone"
						name="phone"
						value={form.phone}
						onChange={setForm}
						variant="outlined"
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={2} lg={2}>
					<FormControl variant="outlined" fullWidth size="small">
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
							{stateLoading && (
								<MenuItem value="" disabled>
									<em>Loading...</em>
								</MenuItem>
							)}
							{allStates.map((c, i) => (
								<MenuItem key={i} value={c}>
									{c}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={2} lg={2}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel htmlFor="outlined-age-native-simple">
							City
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							name="city"
							value={form.city}
							onChange={setForm}
							label="Gender"
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
					</FormControl>
				</Grid>
				<Grid item xs={12} md={2} lg={2}>
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
							label="Gender"
							variant="outlined"
							fullWidth
							size="small"
						>
							<MenuItem value={''}>Select Status</MenuItem>
							<MenuItem value={'active'}>Active</MenuItem>
							<MenuItem value={'inactive'}>Inactive</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Box mt="0.5rem">
				<Grid container spacing={1}>
					<Grid item xs={12} md={2} lg={3}>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="outlined-age-native-simple">
								Payment
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								name="paymentStatus"
								value={form.paymentStatus}
								onChange={setForm}
								label="Gender"
								variant="outlined"
								fullWidth
								size="small"
							>
								<MenuItem value={''}>Select Payment</MenuItem>
								<MenuItem value={'paid'}>Paid</MenuItem>
								<MenuItem value={'unpaid'}>Unpaid</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={2} lg={3}>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="outlined-age-native-simple">
								Register through
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								name="loginThrough"
								value={form.loginThrough}
								onChange={setForm}
								label="Gender"
								variant="outlined"
								fullWidth
								size="small"
							>
								<MenuItem value={'google'}>Google</MenuItem>
								<MenuItem value={'facebook'}>Facebook</MenuItem>
								<MenuItem value={'site-login'}>
									Site signup
								</MenuItem>
								<MenuItem value={'admin'}>Admin</MenuItem>
								<MenuItem value={'staff'}>Staff</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={2} lg={3}>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="outlined-age-native-simple">
								Via
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								name="loginVia"
								value={form.loginVia}
								onChange={setForm}
								label="Gender"
								variant="outlined"
								fullWidth
								size="small"
							>
								<MenuItem value={''}>Select Via</MenuItem>
								<MenuItem value={'mobile'}>Mobile</MenuItem>
								<MenuItem value={'web'}>Web</MenuItem>
								<MenuItem value={'other'}>Other</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={2} lg={3}>
						<Box display="flex">
							<Box flexGrow={1}>
								<Button
									fullWidth={true}
									color="primary"
									variant="contained"
									classes={{
										label: 'tranform-none',
									}}
									onClick={filter}
								>
									Filter
								</Button>
							</Box>
							<Box flexGrow={1}>
								<Button
									fullWidth={true}
									color="secondary"
									variant="contained"
									classes={{
										label: 'tranform-none',
									}}
									onClick={() => onChangeForm(defaultState)}
								>
									Reset
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Box mt="1rem"></Box>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allStates: selectAllStates,
	stateLoading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	filterUser: (filterObj) => dispatch(filterUser({ filterObj })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterData);
