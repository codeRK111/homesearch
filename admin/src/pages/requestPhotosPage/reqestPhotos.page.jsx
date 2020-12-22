import {
	selecSearchFeedbacks,
	selectFetchFeedbackLoading,
	selectSearchFeedbacksCount,
} from '../../redux/feedback/feedback.selectors';
import {
	selectGetQueriesLoading,
	selectQueries,
} from '../../redux/query/query.selector';

import { Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import QueryTable from '../../components/feedbackTable/feedbackTable.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchFeedbacks } from '../../redux/feedback/feedback.actions';

// import * as Yup from 'yup';
// import { Form, Formik } from 'formik';

// import useStyles from './feedback.styles';
// import Select from '../../components/formik/select.component';
// import TextField from '../../components/formik/textField.component';

const Queries = ({ loading, queries, fetchFeedbacks, count, feedbacks }) => {
	// const classes = useStyles();
	const [page, setPage] = React.useState(1);
	// const [showAddQuery, setShowAddQuery] = React.useState(false);
	const handleChange = (event, value) => {
		setPage(value);
	};
	// const handleSwitch = (event) => {
	// 	setShowAddQuery(event.target.checked);
	// };
	React.useEffect(() => {
		const handleGetQueries = (status, data) => {
			console.log('status', status);
			console.log('data', data);
		};
		fetchFeedbacks({ page }, handleGetQueries);
	}, [fetchFeedbacks, page]);
	return (
		<div>
			<Box p="1rem">
				<h3>Photo Requests</h3>
				{/* <Box display="flex" justifyContent="center">
					<Box className={classes.addWrapper}>
						<Box
							display="flex"
							width="100%"
							justifyContent="space-between"
							alignItems="center"
						>
							<h4>Show Add Feedback Form</h4>
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
					</Box>
				</Box> */}
				<QueryTable feedbacks={feedbacks} loading={loading} />
				{!loading && (
					<Box mt="1rem" display="flex" justifyContent="center">
						<Pagination
							count={Math.ceil(count / 10)}
							page={page}
							onChange={handleChange}
							color="primary"
						/>
					</Box>
				)}
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectFetchFeedbackLoading,
	queries: selectQueries,
	count: selectSearchFeedbacksCount,
	feedbacks: selecSearchFeedbacks,
});

const dispatchStateToProps = (dispatch) => ({
	fetchFeedbacks: (body, callback) =>
		dispatch(fetchFeedbacks({ body, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
