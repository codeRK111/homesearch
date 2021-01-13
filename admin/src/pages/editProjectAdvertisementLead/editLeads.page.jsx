import { Box, Button, CircularProgress, Switch } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	fetchProjectAdvertisementLeadDetails,
	updateProjectAdvertisementLeadDetails,
} from '../../redux/kra/kra.actions';
import {
	selectUpdateProjectAdvertisementLeadDetailsLoading,
	selectfetchProjectAdvertisementLeadDetailsLoading,
} from '../../redux/kra/kra.selector';

import DatePicker from '../../components/formik/dateTimePicker.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import Skeleton from '../../components/skeleton/form.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { parseDate } from '../../utils/render.utils';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useHistory } from 'react-router-dom';
import useStyles from './editLeads.styles';

const AddLeads = ({
	currentUser,

	fetchLoading,
	fetchLeadDetails,
	updateLoading,
	updateLeadDetails,
	match: {
		params: { id },
	},
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [data, setData] = React.useState(null);
	const [selectedDate, handleDateChange] = React.useState(new Date());
	const [asyncError, setAsyncError] = React.useState(null);
	const [fetchAsyncError, setFetchAsyncError] = React.useState(null);
	// const initialState = {
	// 	builderName: '',
	// 	contactPersonName: '',
	// 	contactNumber: '',
	// 	ulternateContactNumber: '',
	// 	email: '',
	// 	projectName: '',
	// 	city: '',
	// 	callAttended: true,
	// 	clientResponse: '',
	// 	scheduleCall: false,
	// 	scheduleMessage: '',
	// 	status: 'open',
	// 	deniedResponse: '',
	// 	projectAdvertisement: '5ff834ad527c84098cfedb87',
	// };
	const [showPreviousResponses, setShowPreviousResponses] = React.useState(
		false
	);

	const handleSwitch = (e) => {
		setShowPreviousResponses(e.target.checked);
	};

	const prepareData = (formData) => {
		const obj = { ...formData };
		if (!obj.callAttended) {
			delete obj.clientResponse;
		}
		if (!obj.scheduleCall) {
			obj.scheduleMessage = null;
			obj.scheduleTime = null;
		} else {
			obj.scheduleTime = selectedDate;
		}

		if (obj.status !== 'denied') {
			delete obj.deniedResponse;
		} else {
			if (obj.deniedResponse) {
				obj.deniedResponse = [
					...data.deniedResponse,
					{ message: obj.deniedResponse },
				];
			}
		}

		return obj;
	};

	const errorHandler = (data) => {
		const error = {};
		if (!data.builderName) {
			error.builderName = 'Required';
		}
		if (!data.contactPersonName) {
			error.contactPersonName = 'Required';
		}
		if (!data.contactNumber) {
			error.contactNumber = 'Required';
		}
		if (!data.city) {
			error.city = 'Required';
		}
		if (data.callAttended) {
			if (!data.clientResponse) {
				error.clientResponse = 'Required';
			}
		}

		if (data.status === 'denied') {
			if (!data.deniedResponse) {
				error.deniedResponse = 'Required';
			}
		}

		return error;
	};

	const callback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			history.push('/manage-task/123');
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		const fetchCallback = (status, data) => {
			if (status === 'success') {
				setFetchAsyncError(null);
				setData(data);
				if (data.scheduleCall && data.scheduleTime) {
					handleDateChange(data.scheduleTime);
				}
			} else {
				setFetchAsyncError(data);
				setData(null);
			}
		};

		fetchLeadDetails(id, fetchCallback);
	}, []);

	const onSubmit = (values) => {
		const data = prepareData(values);
		console.log(data);

		updateLeadDetails(id, data, callback);
	};

	const buttonProps = {};
	if (updateLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}

	return (
		<Box display="flex" alignItems="center" flexDirection="column">
			<h3>Edit Project Advertisement Details</h3>
			{fetchAsyncError && <p className="color-red">{fetchAsyncError}</p>}
			{fetchLoading && <Skeleton />}
			{!fetchLoading && data && (
				<Box className={classes.wrapper}>
					<Formik
						initialValues={{
							...data,
							city: data.city.id,
							deniedResponse:
								data.deniedResponse.length === 0
									? ''
									: data.deniedResponse[
											data.deniedResponse.length - 1
									  ]['message'],
						}}
						enableReinitialize={true}
						validate={errorHandler}
						onSubmit={onSubmit}
					>
						{({ values }) => (
							<Form>
								<TextField
									formLabel="Builder Name *"
									name="builderName"
									type="text"
								/>
								<TextField
									formLabel="Contact Person Name"
									name="contactPersonName"
									type="text"
								/>
								<TextField
									formLabel="Contact Number *"
									name="contactNumber"
									type="text"
								/>
								<TextField
									formLabel="Ulterate Contact Number"
									name="ulternateContactNumber"
									type="text"
								/>
								<TextField
									formLabel="Email"
									name="email"
									type="email"
								/>
								<TextField
									formLabel="Project Name"
									name="projectName"
									type="text"
								/>
								<Select
									formLabel="City"
									name="city"
									options={currentUser.propertyAccessCities.map(
										(c) => ({ value: c.id, label: c.name })
									)}
								/>
								<Select
									formLabel="Call Attended"
									name="callAttended"
									options={[
										{
											value: true,
											label: 'Yes',
										},
										{
											value: false,
											label: 'No',
										},
									]}
								/>
								{values.callAttended && (
									<TextField
										formLabel="Client Response"
										name="clientResponse"
										multiline={true}
										rows={6}
										type="text"
									/>
								)}
								<Select
									formLabel="Schedule Call"
									name="scheduleCall"
									options={[
										{
											value: true,
											label: 'Yes',
										},
										{
											value: false,
											label: 'No',
										},
									]}
								/>
								{values.scheduleCall && (
									<DatePicker
										formLabel="Schedule Call"
										value={selectedDate}
										onChange={handleDateChange}
									/>
								)}
								{values.scheduleCall && (
									<TextField
										formLabel="Schedule Message"
										name="scheduleMessage"
										multiline={true}
										rows={6}
										type="text"
									/>
								)}
								<Select
									formLabel="Status"
									name="status"
									options={[
										{
											value: 'open',
											label: 'Open',
										},
										{
											value: 'closed',
											label: 'Closed',
										},
										{
											value: 'denied',
											label: 'Denied',
										},
									]}
								/>
								{values.status === 'denied' && (
									<Box
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										width="100%"
									>
										<p className={classes.label}>
											View Previous discussions
										</p>
										<Switch
											checked={showPreviousResponses}
											onChange={handleSwitch}
											size="small"
											color="primary"
											inputProps={{
												'aria-label':
													'primary checkbox',
											}}
										/>
									</Box>
								)}
								{showPreviousResponses && (
									<Box className={classes.previousWrapper}>
										{data.deniedResponse.map((c) => (
											<Box key={c.id}>
												<Box className={classes.label}>
													<Box
														display="flex"
														justifyContent="center"
														p="0.2rem"
													>
														<span
															className={
																classes.date
															}
														>
															{parseDate(c.date)}
														</span>
													</Box>
													<Box
														display="flex"
														justifyContent="center"
													>
														{c.message}
													</Box>
												</Box>
											</Box>
										))}
									</Box>
								)}
								{values.status === 'denied' && (
									<TextField
										formLabel="Denied Reason"
										name="deniedResponse"
										multiline={true}
										rows={6}
										type="text"
									/>
								)}
								{asyncError && (
									<p className="color-red">{asyncError}</p>
								)}
								<Box mt="1rem" mb="4rem">
									<Button
										type="submit"
										variant="contained"
										fullWidth
										color="primary"
										{...buttonProps}
									>
										Submit
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</Box>
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	fetchLoading: selectfetchProjectAdvertisementLeadDetailsLoading,
	updateLoading: selectUpdateProjectAdvertisementLeadDetailsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchLeadDetails: (id, callback) =>
		dispatch(fetchProjectAdvertisementLeadDetails({ id, callback })),
	updateLeadDetails: (id, body, callback) =>
		dispatch(updateProjectAdvertisementLeadDetails({ id, body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLeads);
