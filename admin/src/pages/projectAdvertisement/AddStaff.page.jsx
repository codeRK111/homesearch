import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import { CircularProgress } from '@material-ui/core';
import React from 'react';
import Select from '../../components/formik/select.component';
import Skeleton from '../../components/skeleton/form.component';
import TextField from '../../components/formik/textField.component';
import { addProjectAdvertisement } from '../../redux/kra/kra.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchMyStaffsStart } from '../../redux/admins/admins.actions';
import { selectAddProjectAdvertisementLoading } from '../../redux/kra/kra.selector';
import { selectFetchMyStaffLoading } from '../../redux/admins/admins.selector';
import useStyles from './style';

const AddStaff = ({
	loading,
	fetchMyStaffsStart,
	addProjectAdvertisement,
	addLoading,
}) => {
	const [asyncError, setAsyncError] = React.useState(null);
	const [staffs, setStaffs] = React.useState([]);

	const callback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			setStaffs(data);
		} else {
			setAsyncError(data);
			setStaffs([]);
		}
	};

	const addCallback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		console.log('object');
		fetchMyStaffsStart(callback);
	}, [fetchMyStaffsStart]);

	const onSubmit = (values) => {
		const body = {
			...values,
			minCallsPerMonth: values.minCallsPerDay * 30,
		};
		addProjectAdvertisement(body, addCallback);
	};

	const initialState = {
		staff: '',
		minCallsPerDay: 10,
		minCallsPerMonth: 300,
		message: '',
		pFor: 'project',
	};
	const classes = useStyles();
	const buttonProps = {};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			width="100%"
		>
			<h3>Add Staff</h3>
			<p className="color-red">{asyncError}</p>
			{loading ? (
				<Skeleton />
			) : (
				<Box className={classes.wrapper}>
					<Formik initialValues={initialState} onSubmit={onSubmit}>
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
											value={values.minCallsPerDay * 30}
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
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectFetchMyStaffLoading,
	addLoading: selectAddProjectAdvertisementLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchMyStaffsStart: (callback) =>
		dispatch(fetchMyStaffsStart({ callback })),
	addProjectAdvertisement: (body, callback) =>
		dispatch(addProjectAdvertisement({ body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
