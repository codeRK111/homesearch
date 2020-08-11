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
		number_verified: true,
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
		// number_verified: '',
		// role: '',
	});

	React.useEffect(() => {
		if (form.state) {
			setCityLoading(true);
			const url = `/cities/states/${form.state}`;
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
			<h1>Edit User</h1>
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
