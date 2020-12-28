import * as Yup from 'yup';

import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '../formik/select.component';
import TextField from '../formik/textField.component';
import { addFeedback } from '../../redux/feedback/feedback.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAddFeedbackLoading } from '../../redux/feedback/feedback.selectors';
import { selectUser } from '../../redux/auth/auth.selectors';
import useStyles from './searchFeedBackForm.style';
import { yupValidation } from '../../utils/validation.utils';

const options = [
	'I need to talk to customer service',
	"I still haven't found what I'm Looking for",
	'Property already sold out',
	'Property already rented out',
	'Broker posing as owner',
	'Incorrect Price/Area',
	'For sale but listed under rent',
	'Incorrect contact information',
	'Property shown here doesnt exist',
	'Incorrect location information',
	'For rent but listed under sale',
	'Others',
];

const keyValue = {
	property: 'property',
	project: 'project',
	projectproperty: 'projectProperty',
};

const SearchFeedback = ({
	feedback,
	onSubmit,
	loading,
	addFeedback,
	propertyType,
	propertyId,
	user,
}) => {
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const [success, setSuccess] = React.useState(false);
	const schema = Yup.object({
		userName: yupValidation.name,
		email: yupValidation.email,
		phoneNumber: yupValidation.number,
	});
	const initialState = {
		userName: user.name,
		email: user.email,
		phoneNumber: user.number,
		message: '',
		category: 'I need to talk to customer service',
		propertyType,
		[keyValue[propertyType]]: propertyId,
		searchResult: feedback,
	};

	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}

	const handleAddFeedback = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			setSuccess(true);
		} else {
			setAsyncError(data);
			setSuccess(false);
		}
	};

	const handleSearchForm = (values) => {
		const body = values;
		if (feedback) {
			delete body['category'];
		}
		addFeedback(body, handleAddFeedback);
	};
	return success ? (
		<Box width="100%">
			<Box display="flex" justifyContent="center">
				<CheckCircleOutlineIcon
					fontSize={'large'}
					style={{ color: 'green' }}
				/>
			</Box>
			<Box display="flex" justifyContent="center">
				<p>We received your feedback, Thank you for your time</p>
			</Box>
		</Box>
	) : (
		<Formik
			enableReinitialize
			initialValues={initialState}
			validationSchema={schema}
			onSubmit={handleSearchForm}
		>
			{() => (
				<Form>
					{!!asyncError && <p className="cRed">{asyncError}</p>}
					<Box>
						<Box>
							<TextField
								formLabel="Your Name"
								name="userName"
								type="text"
							/>
						</Box>
						<Box>
							<TextField
								formLabel="Email"
								name="email"
								type="email"
							/>
						</Box>
						<Box>
							<TextField
								formLabel="Phone Number"
								name="phoneNumber"
								type="text"
							/>
						</Box>
						{!feedback && (
							<Box>
								<Select
									formLabel="Category"
									name="category"
									options={options.map((c) => ({
										value: c,
										label: c,
									}))}
								/>
							</Box>
						)}
						<Box>
							<TextField
								formLabel="Message"
								name="message"
								type="text"
								rows={4}
								multiline
							/>
						</Box>
						<Box>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								{...buttonProps}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectAddFeedbackLoading,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	addFeedback: (body, callback) => dispatch(addFeedback({ body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFeedback);
