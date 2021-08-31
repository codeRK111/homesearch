import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AddUserDialog from '../../components/addUserDialog';
import ErrorCard from '../../components/errorCard';
import Pagination from '@material-ui/lab/Pagination';
import UserTable from '../../components/adminTable/index';
import axios from 'axios';
import { getAdmins } from '../../utils/asyncAdmin';
import { useHistory } from 'react-router-dom';
import useStyles from './adminsPage.style';

const initialValues = {
	name: '',
	email: '',
	number: '',
	type: 'tenant',
	photo: null,
};

const UsersPage = () => {
	// Constants
	const classes = useStyles();
	const history = useHistory();

	// Data
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(null);
	const [id, setId] = useState(null);
	const [type, setRole] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState({
		admins: [],
		totalDocs: 0,
	});
	const [filter, setFilter] = useState({
		name: '',
		email: '',
		number: '',
		status: 'all',
	});

	const source = useRef(null);

	// Callback
	const handleClose = () => {
		setOpen(false);
	};
	const redirectTo = (path) => () => {
		history.push(path);
	};
	const handleFilterInput = (e) => {
		const { name, value } = e.target;
		setFilter((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleChange = (event, value) => {
		setPage(value);
	};

	const handleChangeCheckbox = (e) => {
		const { value, checked } = e.target;
		setRole((prevState) => {
			if (checked) {
				return [...prevState, value];
			} else {
				return prevState.filter((c) => c !== value);
			}
		});
	};

	const handleChangeRadio = (e) => {
		const { value } = e.target;
		setFilter((prevState) => ({
			...prevState,
			status: value,
		}));
	};

	const fetchUsers = useCallback(() => {
		// alert('Hello');
		source.current = axios.CancelToken.source();
		const filterData = {
			page,
			limit,
			...filter,
		};
		if (id) {
			filterData.id = `HSI${id}`;
		}
		if (type.length > 0) {
			filterData.type = type;
		}
		if (filter.status === 'all') {
			delete filterData.status;
		}
		getAdmins(filterData, source.current, setLoading)
			.then((resp) => {
				setData(resp);
				setError(null);
			})
			.catch((error) => {
				setError(error);
			});
	}, [page, limit, filter, type, id]);

	useEffect(() => {
		setPage(1);
	}, [limit, filter, type]);
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	useEffect(() => {
		return () => {
			source.current.cancel('Component got unmounted');
		};
	}, [source]);

	// useCancelAxios(source);

	return (
		<div className={classes.wrapper}>
			<AddUserDialog
				open={open}
				handleClose={handleClose}
				initialValues={initialValues}
				fetchUsers={fetchUsers}
			/>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<h1>Admins</h1>
				<Button variant="contained" onClick={redirectTo('/admins/add')}>
					Add Admin
				</Button>
			</Box>
			{error && <ErrorCard error={error} />}
			<Box mb="2rem">
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Typography>
							<b>Filter by type</b>
						</Typography>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleChangeCheckbox}
									value="super-admin"
									color="primary"
								/>
							}
							label="Super Admin"
						/>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleChangeCheckbox}
									value="admin"
									color="primary"
								/>
							}
							label="Admin"
						/>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleChangeCheckbox}
									value="staff"
									color="primary"
								/>
							}
							label="Staff"
						/>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleChangeCheckbox}
									value="clientSupport"
									color="primary"
								/>
							}
							label="Client Support"
						/>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleChangeCheckbox}
									value="digitalMarketing"
									color="primary"
								/>
							}
							label="Digital Marketing"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography>
							<b>Filter by Status</b>
						</Typography>
						<RadioGroup row defaultValue={filter.status}>
							<FormControlLabel
								value="all"
								control={<Radio onChange={handleChangeRadio} />}
								label="All admins"
							/>
							<FormControlLabel
								value="active"
								control={<Radio onChange={handleChangeRadio} />}
								label="Active admins"
							/>
							<FormControlLabel
								value="inactive"
								control={<Radio onChange={handleChangeRadio} />}
								label="Inactive admins"
							/>
						</RadioGroup>
					</Grid>
				</Grid>
			</Box>

			<Box mb="2rem">
				<Typography>
					<b>Search Admin</b>
				</Typography>
				<Grid container spacing={1}>
					<Grid item xs={6} md={3}>
						<TextField
							label="Search by ID"
							value={id}
							onChange={(e) => setId(e.target.value)}
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										HSI-
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							name="name"
							label="By name"
							onChange={handleFilterInput}
							value={filter.name}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							name="email"
							label="By email"
							onChange={handleFilterInput}
							value={filter.email}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							name="number"
							label="By phone number"
							onChange={handleFilterInput}
							value={filter.number}
						/>
					</Grid>
				</Grid>
			</Box>
			{!loading && (
				<Typography gutterBottom>
					<b>{data.totalDocs} </b> admins found
				</Typography>
			)}
			<UserTable
				loading={loading}
				users={data.admins}
				fetchUsers={fetchUsers}
			/>

			<Box
				mt="1rem"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<FormControl variant="filled" style={{ width: 150 }}>
					<InputLabel id="demo-simple-select-filled-label">
						User per page
					</InputLabel>
					<Select
						labelId="demo-simple-select-filled-label"
						id="demo-simple-select-filled"
						value={limit}
						onChange={(e) => setLimit(e.target.value)}
					>
						<MenuItem value={5}>Five</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
						<MenuItem value={50}>Fifty</MenuItem>
					</Select>
				</FormControl>
				<Pagination
					count={Math.ceil(data.totalDocs / limit)}
					page={page}
					onChange={handleChange}
					color="primary"
				/>
			</Box>
		</div>
	);
};

export default UsersPage;
