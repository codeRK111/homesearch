import { Box, Container, Typography } from '@material-ui/core';
import { FetchPropertyResult, asyncFetchProperties } from '../../API/property';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import axios, { CancelTokenSource } from 'axios';

import RentPropertiesTable from '../../components/Table/Properties/rent';
import { RouteComponentProps } from 'react-router';
import TablePagination from '../../components/Table/pagination';
import { capitalizeFirstLetter } from '../../utils/render';

type Params = {
	pType: string;
};

interface IManageLeadsPage extends RouteComponentProps<Params> {}

const ManageLeadsPage: React.FC<IManageLeadsPage> = ({
	match: {
		params: { pType },
	},
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// Token
	const source = useRef<CancelTokenSource | null>(null);
	// State
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState<FetchPropertyResult>({
		totalDocs: 0,
		properties: [],
	});
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			//Check if there are any previous pending requests

			source.current = axios.CancelToken.source();
			const filter: any = {
				page,
				limit,
				for: pType,
			};

			setLoading(true);
			const resp = await asyncFetchProperties(filter);
			setData(resp);

			setLoading(false);
			setError('');
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
			setData({
				totalDocs: 0,
				properties: [],
			});
		}
	}, [page, limit]);

	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	useEffect(() => {
		if (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	}, [error, setSnackbar]);

	return (
		<Container component={Box} mt="1rem">
			<Typography variant="h5" gutterBottom align="center">
				Available Properties For {capitalizeFirstLetter(pType)}
			</Typography>

			<RentPropertiesTable
				loading={loading}
				properties={data.properties}
			/>
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

export default ManageLeadsPage;
