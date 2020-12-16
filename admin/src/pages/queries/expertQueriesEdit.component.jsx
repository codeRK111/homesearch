import * as Yup from 'yup';

import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	getExpertQueryDetails,
	updateExpertQueryDetails,
} from '../../redux/query/query.actions';
import {
	selectGetExpertQueryDetailsLoading,
	selectUpdateExpertQueryDetailsLoading,
} from '../../redux/query/query.selector';

import React from 'react';
import Select from '../../components/formik/select.component';
import Skeleton from '@material-ui/lab/Skeleton';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import useStyles from './queries.styles';
import { yupValidation } from '../../utils/validation.utils';

const Queries = ({
	loading,
	updateLoading,
	getExpertQueryDetails,
	updateExpertQueryDetails,
	match: {
		params: { id },
	},
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [data, setData] = React.useState(null);
	const [asyncError, setAsyncError] = React.useState(null);

	const validationSchema = Yup.object({
		name: yupValidation.name,
		email: yupValidation.email,
		phoneNumber: yupValidation.phoneNumber,
	});

	const handleUpdateQuery = (reset) => (status, data) => {
		if (status === 'success') {
			reset();
			setAsyncError(null);
			history.push('/expert-queries');
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = (values, { resetForm }) => {
		console.log('object');
		updateExpertQueryDetails(id, values, handleUpdateQuery(resetForm));
	};

	const fetchData = () => {
		const handleGetQueries = (status, data) => {
			if (status === 'success') {
				setAsyncError(null);
				setData(data);
			} else {
				setAsyncError(data);
				setData(null);
			}
		};
		getExpertQueryDetails(id, handleGetQueries);
	};
	React.useEffect(() => {
		fetchData();
	}, [getExpertQueryDetails]);
	const buttonProps = {};
	if (updateLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<div>
			<Box p="1rem">
				<Box display="flex" justifyContent="center" mb="2rem">
					<Box className={classes.addWrapper}>
						<h3>Update query</h3>
						<p className="color-red">{asyncError}</p>
						{loading ? (
							<Box>
								<Box>
									<Skeleton
										animation="wave"
										variant="rect"
										width={'100%'}
										height={50}
									/>
								</Box>
								<Box mt="1rem">
									<Skeleton
										animation="wave"
										variant="rect"
										width={'100%'}
										height={50}
									/>
								</Box>
								<Box mt="1rem">
									<Skeleton
										animation="wave"
										variant="rect"
										width={'100%'}
										height={50}
									/>
								</Box>
								<Box mt="1rem">
									<Skeleton
										animation="wave"
										variant="rect"
										width={'100%'}
										height={50}
									/>
								</Box>
							</Box>
						) : data ? (
							<Formik
								initialValues={{
									name: data.name,
									email: data.email,
									phoneNumber: data.phoneNumber,
									verified: data.verified,
								}}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{() => (
									<Form>
										<TextField
											name="name"
											formLabel="Full name *"
											type="text"
										/>
										<TextField
											name="email"
											formLabel="Email Address *"
											type="email"
										/>
										<TextField
											name="phoneNumber"
											formLabel="Phone number *"
											type="text"
										/>
										<Select
											name="verified"
											formLabel="Verified"
											options={[
												{ value: true, label: 'Yes' },
												{ value: false, label: 'No' },
											]}
										/>
										<Box>
											<Button
												type="submit"
												color="primary"
												variant="contained"
												fullWidth
												{...buttonProps}
											>
												Update Query
											</Button>
										</Box>
									</Form>
								)}
							</Formik>
						) : (
							''
						)}
					</Box>
				</Box>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectGetExpertQueryDetailsLoading,
	updateLoading: selectUpdateExpertQueryDetailsLoading,
	// addLoading: selectAddExpertQueryLoading,
	// queries: selectExpertQueries,
	// count: selectGetExpertQueriesCount,
});

const dispatchStateToProps = (dispatch) => ({
	getExpertQueryDetails: (id, callback) =>
		dispatch(getExpertQueryDetails({ id, callback })),
	updateExpertQueryDetails: (id, body, callback) =>
		dispatch(updateExpertQueryDetails({ id, body, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
