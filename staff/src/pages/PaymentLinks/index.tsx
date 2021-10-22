import { Box, Container, Typography } from '@material-ui/core';
import {
	FetchBasicInput,
	FetchPaymentLinksResponse,
	asyncFetchPaymentLinks,
} from '../../API/payment';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import PaymentLinkTable from '../../components/Table/payment/paymentLink';
import TablePagination from '../../components/Table/pagination';

const PaymentLinksPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState<FetchPaymentLinksResponse>({
		totalDocs: 0,
		links: [],
	});
	// Callback
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch subscriptios
	const fetchLinks = useCallback(async () => {
		try {
			setLoading(true);
			const filter: FetchBasicInput = { page, limit };

			const resp = await asyncFetchPaymentLinks(filter);
			setData(resp);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setData({
				totalDocs: 0,
				links: [],
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
		fetchLinks();
	}, [fetchLinks]);
	return (
		<Container>
			<Box mt="2rem">
				<Typography variant="h6" gutterBottom>
					Payment Links
				</Typography>
			</Box>
			<p>
				{' '}
				<b>{data.totalDocs}</b> links found
			</p>
			<PaymentLinkTable links={data.links} loading={loading} />
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</Container>
	);
};

export default PaymentLinksPage;
