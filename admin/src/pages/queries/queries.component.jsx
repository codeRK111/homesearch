import {
	selectGetQueriesLoading,
	selectQueries,
} from '../../redux/query/query.selector';

import { Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import QueryTable from '../../components/queryTable/queryTable.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getQueries } from '../../redux/query/query.actions';

const Queries = ({ loading, queries, getQueries }) => {
	const [page, setPage] = React.useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};
	React.useEffect(() => {
		const handleGetQueries = (status, data) => {
			console.log('status', status);
			console.log('data', data);
		};
		getQueries({ page }, handleGetQueries);
	}, [getQueries, page]);
	return (
		<div>
			<Box p="1rem">
				<h3>Queries on Property</h3>
				<QueryTable queries={queries} loading={loading} />
				<Box mt="1rem" display="flex" justifyContent="center">
					<Pagination
						count={Math.ceil(queries.length / 10)}
						page={page}
						onChange={handleChange}
						color="primary"
					/>
				</Box>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectGetQueriesLoading,
	queries: selectQueries,
});

const dispatchStateToProps = (dispatch) => ({
	getQueries: (body, callback) => dispatch(getQueries({ body, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
