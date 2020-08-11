import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useForm from '../../hooks/useForm';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { filterUser } from '../../redux/users/users.actions';

const FilterData = ({ filterUser }) => {
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

	return (
		<Box p="1rem">
			<h3>Filter Users</h3>
			<Grid container spacing={1}>
				<Grid item xs={12} md={2} lg={3}>
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
				<Grid item xs={12} md={2} lg={3}>
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
				<Grid item xs={12} md={2} lg={3}>
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
				<Grid item xs={12} md={2} lg={3}>
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
							<MenuItem value={''}>Select City</MenuItem>
							<MenuItem value={'male'}>Bhubaneswar</MenuItem>
							{/* <MenuItem value={'female'}>Female</MenuItem>
            							<MenuItem value={'other'}>Other</MenuItem> */}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Box mt="1rem">
				<Grid container spacing={1}>
					<Grid item xs={12} md={2} lg={3}>
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
								{/* <MenuItem value={'female'}>Female</MenuItem>
            							<MenuItem value={'other'}>Other</MenuItem> */}
							</Select>
						</FormControl>
					</Grid>
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
								{/* <MenuItem value={'female'}>Female</MenuItem>
            							<MenuItem value={'other'}>Other</MenuItem> */}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={2} lg={3}>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="outlined-age-native-simple">
								First Login
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
								<MenuItem value={''}>
									Select First login
								</MenuItem>
								<MenuItem value={'google'}>Google</MenuItem>
								<MenuItem value={'facebook'}>Facebook</MenuItem>
								<MenuItem value={'admin'}>Admin</MenuItem>
								<MenuItem value={'staff'}>Staff</MenuItem>
								{/* <MenuItem value={'female'}>Female</MenuItem>
            							<MenuItem value={'other'}>Other</MenuItem> */}
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
				</Grid>
				<Box mt="1rem">
					<Button
						color="primary"
						variant="contained"
						classes={{
							label: 'tranform-none',
						}}
						onClick={filter}
					>
						Filter
					</Button>
					<Button
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
		</Box>
	);
};

const mapDispatchToProps = (dispatch) => ({
	filterUser: (filterObj) => dispatch(filterUser({ filterObj })),
});

export default connect(null, mapDispatchToProps)(FilterData);
