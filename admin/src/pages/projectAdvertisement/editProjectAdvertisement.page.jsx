import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	fetchProjectAdvertisementDetails,
	updateProjectAdvertisementDetails,
} from '../../redux/kra/kra.actions';
import {
	selectUpdateProjectAdvertisementDetailsLoading,
	selectfetchProjectAdvertisementDetailsLoading,
} from '../../redux/kra/kra.selector';

import { CircularProgress } from '@material-ui/core';
import React from 'react';
import Select from '../../components/formik/select.component';
import Skeleton from '../../components/skeleton/form.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchMyStaffsStart } from '../../redux/admins/admins.actions';
import { selectFetchMyStaffLoading } from '../../redux/admins/admins.selector';
import { useHistory } from 'react-router-dom';
import useStyles from './style';

const EditStaff = ({
	loading,
	fetchMyStaffsStart,
	match: {
		params: { id },
	},
	fetchLoading,
	fetchProjectAdvertisementDetails,
	updateLoading,
	updateProjectAdvertisementDetails,
}) => {
	const history = useHistory();
	const [asyncError, setAsyncError] = React.useState(null);
	const [staffs, setStaffs] = React.useState([]);
	const [data, setData] = React.useState(null);
	const [noData, setNoData] = React.useState(false);

	const callback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			setStaffs(data);
		} else {
			setAsyncError(data);
			setStaffs([]);
		}
	};

	const updateCallback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			history.push('/project-advertisement');
		} else {
			setAsyncError(data);
		}
	};
	const fetchCallback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			if (data) {
				setData(data);
				setNoData(false);
			} else {
				setNoData(true);
			}
		} else {
			setAsyncError(data);
			setNoData(false);
		}
	};

	React.useEffect(() => {
		console.log('object');
		fetchMyStaffsStart(callback);
	}, [fetchMyStaffsStart]);

	React.useEffect(() => {
		console.log('object');
		fetchProjectAdvertisementDetails(id, fetchCallback);
	}, [fetchProjectAdvertisementDetails, id]);

	const onSubmit = (values) => {
		const body = {
			...values,
			minCallsPerMonth: values.minCallsPerDay * 30,
		};
		updateProjectAdvertisementDetails(id, body, updateCallback);
	};

	const classes = useStyles();
	const buttonProps = {};
	if (updateLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			width="100%"
		>
			<h3>Update Staff</h3>

			{noData && (
				<Box display="flex" justifyContent="center">
					{' '}
					No data found
				</Box>
			)}
			<p className="color-red">{asyncError}</p>
			{loading || fetchLoading ? (
				<Skeleton />
			) : (
				data && (
					<Box className={classes.wrapper}>
						<Formik
							initialValues={{ ...data, staff: data.staff.id }}
							onSubmit={onSubmit}
							enableReinitialize
						>
							{({ values }) => (
								<Form>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Select
												formLabel="Staff Name"
												name="staff"
												options={staffs.map((c) => ({
													value: c.id,
													label: c.name,
												}))}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												formLabel="Minimum calls / day"
												name="minCallsPerDay"
												type="number"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												formLabel="Minimum calls / month"
												name="minCallsPerMonth"
												type="number"
												disabled
												value={
													values.minCallsPerDay * 30
												}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												formLabel="Message*"
												name="message"
												type="text"
												multiline={true}
												rows={5}
											/>
										</Grid>
										<Grid item xs={12}>
											<Button
												type="submit"
												variant="contained"
												color="primary"
												fullWidth
												disabled={
													!(
														values.staff &&
														values.minCallsPerDay &&
														values.minCallsPerMonth
													)
												}
												{...buttonProps}
											>
												Submit
											</Button>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</Box>
				)
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectFetchMyStaffLoading,
	fetchLoading: selectfetchProjectAdvertisementDetailsLoading,
	updateLoading: selectUpdateProjectAdvertisementDetailsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchMyStaffsStart: (callback) =>
		dispatch(fetchMyStaffsStart({ callback })),
	fetchProjectAdvertisementDetails: (id, callback) =>
		dispatch(fetchProjectAdvertisementDetails({ id, callback })),
	updateProjectAdvertisementDetails: (id, body, callback) =>
		dispatch(updateProjectAdvertisementDetails({ id, body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStaff);
