import { Box, Container, Typography } from '@material-ui/core';
import {
	FetchSubscriptionResponse,
	asyncFetchSubscriptions,
} from '../../API/payment';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import Loader from '../../components/Loader';
import MySubscriptionsTable from '../../components/Table/payment/mySubscriptions';
import TablePagination from '../../components/Table/pagination';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const MyDealsPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const { user } = useTypedSelector((state) => state.auth);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchSubscriptionResponse>({
		totalDocs: 0,
		subscriptions: [],
	});

	// Call back
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch subscriptios
	const fetchSubscriptions = useCallback(async () => {
		try {
			setLoading(true);
			const filter: any = {
				page,
				limit,
				dealBy: user?.id,
			};

			const resp = await asyncFetchSubscriptions(filter);
			setData(resp);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setData({
				totalDocs: 0,
				subscriptions: [],
			});
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit]);
	useEffect(() => {
		fetchSubscriptions();
	}, [fetchSubscriptions]);
	return (
		<Container>
			<Loader open={loading} />
			<Box mt="1rem" mb="1rem">
				<Typography variant="h5" gutterBottom>
					My Deals
				</Typography>
				<MySubscriptionsTable subscriptions={data.subscriptions} />
				<TablePagination
					limit={limit}
					setLimit={setLimit}
					page={page}
					setPage={handlePage}
					totalDocs={data.totalDocs}
				/>
			</Box>
		</Container>
	);
};

export default MyDealsPage;
