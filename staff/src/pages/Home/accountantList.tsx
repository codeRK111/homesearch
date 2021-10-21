import {
	FetchSubscriptionInput,
	FetchSubscriptionResponse,
	asyncFetchSubscriptions,
} from '../../API/payment';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Box } from '@material-ui/core';
import TablePagination from '../../components/Table/pagination';
import TenantSubscriptionTable from '../../components/Table/payment/subscription';

const AccountantList = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState<FetchSubscriptionResponse>({
		totalDocs: 0,
		subscriptions: [],
	});

	// Callback
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
			const filter: FetchSubscriptionInput = { page, limit };

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
		<Box mt="1rem">
			<p> </p>
			<TenantSubscriptionTable
				loading={loading}
				subscriptions={data.subscriptions}
			/>
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</Box>
	);
};

export default AccountantList;
