import * as Yup from 'yup';

import { Box, Button, CircularProgress, Switch } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	addExpertQuery,
	getExpertQueries,
} from '../../redux/query/query.actions';
import {
	selectAddExpertQueryLoading,
	selectExpertQueries,
	selectGetExpertQueriesCount,
	selectGetExpertQueriesLoading,
} from '../../redux/query/query.selector';

import NoPermission from '../../components/noPermissions/noPermissions.component';
import Pagination from '@material-ui/lab/Pagination';
import QueryTable from '../../components/expertQueryTable/expertQueryTable.component';
import React from 'react';
import RenderByAccess from '../../components/roleRender/roleRender.component';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import useStyles from './queries.styles';
import { yupValidation } from '../../utils/validation.utils';

const Queries = ({
	loading,
	queries,
	getExpertQueries,
	count,
	addExpertQuery,
	addLoading,
}) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(1);
	const [showAddQuery, setShowAddQuery] = React.useState(false);
	const [asyncError, setAsyncError] = React.useState(null);
	const handleChange = (event, value) => {
		setPage(value);
	};
	const initialValues = {
		name: '',
		email: '',
		phoneNumber: '',
		verified: true,
	};
	const validationSchema = Yup.object({
		name: yupValidation.name,
		email: yupValidation.email,
		phoneNumber: yupValidation.phoneNumber,
	});

	const handleSwitch = (event) => {
		setShowAddQuery(event.target.checked);
	};

	const handleAddQuery = (reset) => (status, data) => {
		if (status === 'success') {
			reset();
			setAsyncError(null);
			fetchData();
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = (values, { resetForm }) => {
		console.log('object');
		addExpertQuery(values, handleAddQuery(resetForm));
	};

	const fetchData = () => {
		const handleGetQueries = (status, data) => {
			console.log('status', status);
			console.log('data', data);
		};
		getExpertQueries({ page }, handleGetQueries);
	};
	React.useEffect(() => {
		fetchData();
	}, [getExpertQueries, page]);
	const buttonProps = {};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}

	const AddQueryNode = RenderByAccess(
		<Box display="flex" justifyContent="center" mb="2rem">
			<Box className={classes.addWrapper}>
				<p className="color-red">{asyncError}</p>
				<Box
					display="flex"
					width="100%"
					justifyContent="space-between"
					alignItems="center"
				>
					<h4>Show Add Query Form</h4>
					<Switch
						checked={showAddQuery}
						onChange={handleSwitch}
						color="primary"
						name="checkedB"
						inputProps={{
							'aria-label': 'primary checkbox',
						}}
					/>
				</Box>
				{showAddQuery && (
					<Formik
						initialValues={initialValues}
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
										Add Query
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				)}
			</Box>
		</Box>,
		[
			{
				type: 'expertQueryActions',
				value: 'create',
			},
		]
	);

	const TableNode = RenderByAccess(
		<div>
			<QueryTable
				queries={queries}
				loading={loading}
				fetchData={fetchData}
			/>
			<Box mt="1rem" display="flex" justifyContent="center">
				<Pagination
					count={Math.ceil(count / 10)}
					page={page}
					onChange={handleChange}
					color="primary"
				/>
			</Box>
		</div>,
		[
			{
				type: 'expertQueryActions',
				value: 'view',
			},
		],
		<NoPermission message="You have no permission to view queries" />
	);
	return (
		<div>
			<Box p="1rem">
				<h3>Queries for experts</h3>
				<AddQueryNode />
				<TableNode />
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectGetExpertQueriesLoading,
	addLoading: selectAddExpertQueryLoading,
	queries: selectExpertQueries,
	count: selectGetExpertQueriesCount,
});

const dispatchStateToProps = (dispatch) => ({
	getExpertQueries: (body, callback) =>
		dispatch(getExpertQueries({ body, callback })),
	addExpertQuery: (body, callback) =>
		dispatch(addExpertQuery({ body, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
