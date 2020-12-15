import {
	selectExpertQueries,
	selectGetExpertQueriesCount,
	selectGetExpertQueriesLoading,
} from '../../redux/query/query.selector';

import { Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import QueryTable from '../../components/expertQueryTable/expertQueryTable.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getExpertQueries } from '../../redux/query/query.actions';

const Queries = ({ loading, queries, getExpertQueries, count }) => {
	const [page, setPage] = React.useState(1);
	const handleChange = (event, value) => {
		setPage(value);
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
	return (
		<div>
			<Box p="1rem">
				<h3>Queries for experts</h3>
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
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectGetExpertQueriesLoading,
	queries: selectExpertQueries,
	count: selectGetExpertQueriesCount,
});

const dispatchStateToProps = (dispatch) => ({
	getExpertQueries: (body, callback) =>
		dispatch(getExpertQueries({ body, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
