import { Box, Button, Container, Typography } from '@material-ui/core';
import {
	GetAllGSTSInputType,
	GetAllGSTSResponseType,
	asyncGetAllGSTs,
} from '../../API/gst';
import React, { useCallback, useEffect, useState } from 'react';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AddGSTDialog } from '../../components/Dialogs/addGST';
import GSTsTable from '../../components/Table/gst';
import TablePagination from '../../components/Table/pagination';

const ManageGSTPage = () => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<GetAllGSTSResponseType>({
		totalDocs: 0,
		gsts: [],
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

			const resp = await asyncGetAllGSTs(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				gsts: [],
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
		<Container>
			<AddGSTDialog
				open={open}
				setOpen={setOpen}
				onSuccess={() => {
					fetchAllGsts();
				}}
			/>
			<Box p="1rem">
				<Typography variant="h6" align="center">
					Manage GST
				</Typography>
				<Box
					display={'flex'}
					justifyContent="space-between"
					alignItems={'center'}
				>
					<p>
						Total <b>{data.totalDocs}</b> docs found{' '}
					</p>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddCircleIcon />}
						onClick={() => {
							setOpen(true);
						}}
					>
						Add GST Number
					</Button>
				</Box>

				<GSTsTable
					gsts={data.gsts}
					loading={loading}
					fetchGSTs={fetchAllGsts}
				/>
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

export default ManageGSTPage;
