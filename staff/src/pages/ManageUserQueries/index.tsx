import {
	FetchUserQueriesResponseData,
	asyncFetchQueries,
} from '../../API/userQuery';
import React, { useCallback, useEffect, useState } from 'react';

import { PageWrapper } from '../../components/UI/Container';
import { SpaceBetween } from '../../components/UI/Flex';
import TablePagination from '../../components/Table/pagination';
import Typography from '@material-ui/core/Typography';
import UserQueriesTable from '../../components/Table/queries';
import { fetchStrategiesFilter } from '../../API/leadStrategy';

const UserQueriesPage = () => {
	// State
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchUserQueriesResponseData>({
		totalDocs: 0,
		contacts: [],
	});

	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch lead strategies
	const fetchLeadStrategies = useCallback(async () => {
		try {
			setLoading(true);
			const filter: fetchStrategiesFilter = {
				page,
				limit,
				status: 'active',
			};

			const resp = await asyncFetchQueries(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				contacts: [],
			});
			setLoading(false);
		}
	}, [page, limit]);
	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchLeadStrategies();
	}, [fetchLeadStrategies]);

	return (
		<PageWrapper>
			<SpaceBetween mb="1rem">
				<Typography variant="h5">User Queries</Typography>
			</SpaceBetween>

			<UserQueriesTable queries={data.contacts} loading={loading} />
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</PageWrapper>
	);
};

export default UserQueriesPage;
