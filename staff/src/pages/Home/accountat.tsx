import { Box, Grid, Typography } from '@material-ui/core';
import { IMyTarget, asyncGetMyTargets } from '../../API/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';

import AccountantList from './accountantList';
import ButtonCard from '../../components/ButtonCard';
import { FetchTargetLoader } from '../../components/Loader/HomePage';
import TargetCard from '../../components/TargetCard';
import { useHistory } from 'react-router-dom';

const AccountantHome = () => {
	const history = useHistory();
	// Token
	const targetSource = useRef<CancelTokenSource | null>(null);
	// State
	const [targetLoading, setTargetLoading] = useState(false);
	const [myTarget, setMyTarget] = useState<IMyTarget | null>(null);

	const fetchTarget = useCallback(async (source: CancelTokenSource) => {
		try {
			const resp = await asyncGetMyTargets(setTargetLoading, source);
			setMyTarget(resp);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		targetSource.current = axios.CancelToken.source();
		fetchTarget(targetSource.current);
		return () => {
			if (targetSource.current) {
				targetSource.current.cancel();
			}
		};
	}, [fetchTarget]);

	return (
		<>
			{targetLoading && (
				<Box mt="4rem">
					<FetchTargetLoader count={4} />
				</Box>
			)}
			{myTarget && (
				<Box mt="2rem" mb="2rem">
					<Grid container spacing={1} justifyContent="space-between">
						<Grid item xs={12} md={2}>
							<ButtonCard
								onClick={() => history.push('/add-lead')}
							>
								<Typography variant="h5">Add Lead</Typography>
							</ButtonCard>
						</Grid>
						<Grid item xs={12} md={2}>
							<ButtonCard
								onClick={() => history.push('/posted-leads')}
							>
								<Typography variant="h5">My Leads</Typography>
							</ButtonCard>
						</Grid>
						<Grid item xs={12} md={2}>
							<ButtonCard
								onClick={() => history.push('/payment-link')}
							>
								<Typography variant="h5">
									Create Payment Link
								</Typography>
							</ButtonCard>
						</Grid>
						<Grid item xs={12} md={2}>
							<ButtonCard
								onClick={() => history.push('/payment-links')}
							>
								<Typography variant="h5">
									Payment Links
								</Typography>
							</ButtonCard>
						</Grid>
						<Grid item xs={12} md={3}>
							<TargetCard
								label="Leads Target"
								total={myTarget.leadTarget}
								available={
									myTarget.leadTarget -
									myTarget.completeLeadTarget
								}
							/>
						</Grid>
					</Grid>
					<AccountantList />
				</Box>
			)}
		</>
	);
};

export default AccountantHome;
