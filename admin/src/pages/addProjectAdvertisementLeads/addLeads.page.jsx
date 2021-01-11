import { Box, Button, CircularProgress, Switch } from '@material-ui/core';
import { Form, Formik } from 'formik';

import DatePicker from '../../components/formik/dateTimePicker.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import { addProjectAdvertisementLead } from '../../redux/kra/kra.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { red } from '@material-ui/core/colors';
import { selectAddProjectAdvertisementLeadLoading } from '../../redux/kra/kra.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import useStyles from './addLeads.styles';

const AddLeads = ({ currentUser, addLead, addLoading }) => {
	const classes = useStyles();
	const [selectedDate, handleDateChange] = React.useState(new Date());
	const [asyncError, setAsyncError] = React.useState(null);
	const initialState = {
		builderName: '',
		contactPersonName: '',
		contactNumber: '',
		ulternateContactNumber: '',
		email: '',
		projectName: '',
		city: '',
		callAttended: true,
		clientResponse: '',
		scheduleCall: false,
		scheduleMessage: '',
		status: 'open',
		deniedResponse: '',
		projectAdvertisement: '5ff834ad527c84098cfedb87',
	};
	// const [showPreviousResponses, setShowPreviousResponses] = React.useState(
	// 	false
	// );

	// const handleSwitch = (e) => {
	// 	setShowPreviousResponses(e.target.checked);
	// };

	const prepareData = (formData) => {
		const data = { ...formData };
		if (!data.callAttended) {
			delete data.clientResponse;
		}
		if (!data.scheduleCall) {
			delete data.scheduleMessage;
		} else {
			data.scheduleTime = selectedDate;
		}

		if (data.status !== 'denied') {
			delete data.deniedResponse;
		} else {
			if (data.deniedResponse) {
				data.deniedResponse = [{ message: data.deniedResponse }];
			}
		}

		return data;
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
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = (values) => {
		const data = prepareData(values);
		console.log(data);

		addLead(data, callback);
	};

	const buttonProps = {};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}

	return (
		<Box display="flex" alignItems="center" flexDirection="column">
			<h3>Add Project Advertisement Details</h3>
			<Box className={classes.wrapper}>
				<Formik
					initialValues={initialState}
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
							{/* {values.status === 'denied' && (
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
											'aria-label': 'primary checkbox',
										}}
									/>
								</Box>
							)}
							{showPreviousResponses && (
								<Box className={classes.previousWrapper}>
									<Box>
										<Box className={classes.label}>
											<Box
												display="flex"
												justifyContent="center"
												p="0.2rem"
											>
												<span className={classes.date}>
													2021/01/09 07:06 PM
												</span>
											</Box>
											<Box
												display="flex"
												justifyContent="center"
											>
												Lorem ipsum dolor sit amet
												consectetur adipisicing elit.
												Asperiores, temporibus ipsam
												eius fuga consequatur ducimus
												laudantium libero eveniet
												recusandae?
											</Box>
										</Box>
									</Box>
									<Box mt="0.5rem">
										<Box className={classes.label}>
											<Box
												display="flex"
												justifyContent="center"
												p="0.2rem"
											>
												<span className={classes.date}>
													2021/01/09 07:06 PM
												</span>
											</Box>
											<Box
												display="flex"
												justifyContent="center"
											>
												Lorem ipsum dolor sit amet
												consectetur adipisicing elit.
												Dolorum, laboriosam.
											</Box>
										</Box>
									</Box>
									<Box mt="0.5rem">
										<Box className={classes.label}>
											<Box
												display="flex"
												justifyContent="center"
												p="0.2rem"
											>
												<span className={classes.date}>
													2021/01/09 07:06 PM
												</span>
											</Box>
											<Box
												display="flex"
												justifyContent="center"
											>
												Lorem ipsum dolor, sit amet
												consectetur adipisicing elit.
												Ipsam eos molestiae qui
												architecto nostrum quasi!
											</Box>
										</Box>
									</Box>
									<Box mt="0.5rem">
										<Box className={classes.label}>
											<Box
												display="flex"
												justifyContent="center"
												p="0.2rem"
											>
												<span className={classes.date}>
													2021/01/09 07:06 PM
												</span>
											</Box>
											<Box
												display="flex"
												justifyContent="center"
											>
												Lorem ipsum dolor sit amet
												consectetur adipisicing elit.
												Minima qui expedita, laborum
												officia ad ipsam hic illo
												aspernatur cumque libero?
											</Box>
										</Box>
									</Box>
								</Box>
							)} */}
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
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	addLoading: selectAddProjectAdvertisementLeadLoading,
});

const mapDispatchToProps = (dispatch) => ({
	addLead: (body, callback) =>
		dispatch(addProjectAdvertisementLead({ body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLeads);
