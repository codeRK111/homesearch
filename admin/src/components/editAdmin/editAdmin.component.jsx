import {
	selectAllCity,
	selectAllStates,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';
import {
	selectUpdateAdminError,
	selectUpdateAdminLoading,
} from '../../redux/admins/admins.selector';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import EditAdmin from '../addAdmin/editAdminForm.component';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { makeStyles } from '@material-ui/core/styles';
import { updateAdmin } from '../../redux/admins/admins.actions';
import { useHistory } from 'react-router-dom';

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
	const [userInfo, setUserInfo] = React.useState(null);
	const [cityLoading, setCityLoading] = React.useState(false);
	const [fetchAdminError, setFetchAdminError] = React.useState(null);
	const [cities, setCities] = React.useState([]);
	const [file, setFile] = React.useState('');
	const handleFileChange = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};

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

	const buttonClick = (data) => {
		let l = { ...data };
		delete l.password;

		updateAdmin(l, match.params.id, redirectToAdmins);
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
				{userInfo ? (
					<EditAdmin
						initialValues={userInfo}
						loading={updateLoading}
						onSubmit={buttonClick}
					/>
				) : (
					''
				)}
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
