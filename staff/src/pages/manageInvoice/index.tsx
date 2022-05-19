import { Box, Typography } from '@material-ui/core';
import { FetchAllInvoices, asyncGetAllInvoices } from '../../API/payment';
import React, { useCallback, useEffect, useState } from 'react';

import { GetAllGSTSInputType } from '../../API/gst';
import InvoiceTable from '../../components/Table/invoice';
import TablePagination from '../../components/Table/pagination';

const ManageInvoicePage = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchAllInvoices>({
		totalDocs: 0,
		invoices: [],
	});

	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch lead strategies
	const fetchAllGsts = useCallback(async () => {
		try {
			setLoading(true);
			const filter: GetAllGSTSInputType = {
				page,
				limit,
			};

			const resp = await asyncGetAllInvoices(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				invoices: [],
			});
			setLoading(false);
		}
	}, [page, limit]);
	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchAllGsts();
	}, [fetchAllGsts]);

	return (
		<>
			<Box p="1rem">
				<Typography variant="h6" align="center">
					Manage Invoice
				</Typography>
				<Box
					display={'flex'}
					justifyContent="space-between"
					alignItems={'center'}
				>
					<p>
						Total <b>{data.totalDocs}</b> docs found{' '}
					</p>
				</Box>

				<InvoiceTable
					gsts={data.invoices}
					loading={loading}
					fetchInvoices={fetchAllGsts}
				/>
				<TablePagination
					limit={limit}
					setLimit={setLimit}
					page={page}
					setPage={handlePage}
					totalDocs={data.totalDocs}
				/>
			</Box>
		</>
	);
};

export default ManageInvoicePage;
