import React, { useCallback, useEffect, useState } from 'react';
import {
	asyncFetchMyStrategies,
	fetchStrategiesFilter,
} from '../../API/leadStrategy';

import AddLeadStrategyDialog from '../../components/Dialogs/addStrategy';
import { Button } from '../../components/UI/Button';
import { FetchMyLeadStrategiesResponseData } from '../../model/leadStrategy';
import LeadsStrategiesTable from '../../components/Table/leadStrategies';
import { PageWrapper } from '../../components/UI/Container';
import { SpaceBetween } from '../../components/UI/Flex';
import TablePagination from '../../components/Table/pagination';
import Typography from '@material-ui/core/Typography';

const StaffLeadStrategyPage = () => {
	// State
	const [addDialogStatus, setAddDialogStatus] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchMyLeadStrategiesResponseData>({
		totalDocs: 0,
		leads: [],
	});

	// Callbacks
	const manageAddDialog =
		(status: boolean): (() => void) =>
		() => {
			setAddDialogStatus(status);
		};

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

			const resp = await asyncFetchMyStrategies(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				leads: [],
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
			<AddLeadStrategyDialog
				open={addDialogStatus}
				handleClose={manageAddDialog(false)}
				fetchLeads={fetchLeadStrategies}
			/>
			<SpaceBetween mb="1rem">
				<Typography variant="h5">Lead Strategies</Typography>
				<Button variant="contained" onClick={manageAddDialog(true)}>
					Add Strategy
				</Button>
			</SpaceBetween>
			<LeadsStrategiesTable
				leads={data.leads}
				loading={loading}
				fetchLeads={fetchLeadStrategies}
			/>
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

export default StaffLeadStrategyPage;
