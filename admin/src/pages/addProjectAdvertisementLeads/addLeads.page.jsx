import { Box, Button, Switch } from '@material-ui/core';
import { Form, Formik } from 'formik';

import DatePicker from '../../components/formik/dateTimePicker.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import useStyles from './addLeads.styles';

const AddLeads = ({ currentUser }) => {
	const classes = useStyles();
	const [selectedDate, handleDateChange] = React.useState(new Date());
	const [showPreviousResponses, setShowPreviousResponses] = React.useState(
		false
	);

	const handleSwitch = (e) => {
		setShowPreviousResponses(e.target.checked);
	};
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
		deniedReson: '',
	};
	return (
		<Box display="flex" alignItems="center" flexDirection="column">
			<h3>Add Project Advertisement Details</h3>
			<Box className={classes.wrapper}>
				<Formik initialValues={initialState}>
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
							)}
							{values.status === 'denied' && (
								<TextField
									formLabel="Denied Reason"
									name="deniedReason"
									multiline={true}
									rows={6}
									type="text"
								/>
							)}
							<Box mt="1rem" mb="4rem">
								<Button
									type="submit"
									variant="contained"
									fullWidth
									color="primary"
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
});

export default connect(mapStateToProps, null)(AddLeads);
