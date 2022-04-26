import { Box, Grid, Typography } from '@material-ui/core';
import {
	FetchCountLoader,
	FetchTargetLoader,
} from '../../components/Loader/HomePage';
import { GMLeadCounts, asyncGetGMLeadCounts } from '../../API/lead';
import { IMyTarget, asyncGetMyTargets } from '../../API/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';

import AssignmentIcon from '@material-ui/icons/Assignment';
import ButtonCard from '../../components/ButtonCard';
import ClientSupportLeadsList from './clientSupportLeadsList';
import DashboardCard from '../../components/DashboardCard';
import TargetCard from '../../components/TargetCard';
import { useHistory } from 'react-router-dom';

const ClientSupportHome = () => {
	const history = useHistory();
	// Token
	const targetSource = useRef<CancelTokenSource | null>(null);
	const countSource = useRef<CancelTokenSource | null>(null);

	// State
	const [userCategory, setUserCategory] = useState(null);
	const [targetLoading, setTargetLoading] = useState(false);
	const [countLoading, setCountLoading] = useState(false);
	const [myTarget, setMyTarget] = useState<IMyTarget | null>(null);
	const [counts, setCounts] = useState<GMLeadCounts | null>(null);

	const manageUserCategory = (category: any) => {
		if (userCategory) {
			setUserCategory(null);
			history.push('/?page=1');
		} else {
			setUserCategory(category);
			history.push('/?page=1');
		}
	};

	const fetchTarget = useCallback(async (source: CancelTokenSource) => {
		try {
			const resp = await asyncGetMyTargets(setTargetLoading, source);
			setMyTarget(resp);
		} catch (error) {
			console.log(error);
		}
	}, []);
	const fetchCounts = useCallback(async (source: CancelTokenSource) => {
		try {
			const resp = await asyncGetGMLeadCounts(setCountLoading, source);
			setCounts(resp[0]);
			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		countSource.current = axios.CancelToken.source();
		fetchCounts(countSource.current);
		return () => {
			if (countSource.current) {
				countSource.current.cancel();
			}
		};
	}, [fetchCounts]);
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
								onClick={() => history.push('/posted-leads')}
							>
								<Typography variant="h5">My Leads</Typography>
							</ButtonCard>
						</Grid>

						<Grid item xs={12} md={3}>
							<TargetCard
								label="Target Amount"
								total={myTarget.dealTarget}
								available={
									myTarget.dealTarget -
									myTarget.completeDealTarget
								}
							/>
						</Grid>
					</Grid>
				</Box>
			)}
			{countLoading && <FetchCountLoader count={5} />}
			{counts && (
				<Grid container spacing={3} justifyContent="center">
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Tenant"
							value={counts.Tenant}
							Icon={AssignmentIcon}
							clickValue={'tenant'}
							onClick={manageUserCategory}
							selected={userCategory === 'tenant'}
						/>
					</Grid>
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Buyer"
							value={counts.Buyer}
							Icon={AssignmentIcon}
							clickValue={'buyer'}
							onClick={manageUserCategory}
							selected={userCategory === 'buyer'}
						/>
					</Grid>
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Owner"
							value={counts.Owner}
							Icon={AssignmentIcon}
							clickValue={'owner'}
							onClick={manageUserCategory}
							selected={userCategory === 'owner'}
						/>
					</Grid>
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Realtor"
							value={counts.Realtor}
							Icon={AssignmentIcon}
							clickValue={'realtor'}
							onClick={manageUserCategory}
							selected={userCategory === 'realtor'}
						/>
					</Grid>
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Builder"
							value={counts.Builder}
							Icon={AssignmentIcon}
							clickValue={'builder'}
							onClick={manageUserCategory}
							selected={userCategory === 'builder'}
						/>
					</Grid>
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Associate"
							value={counts.Associate}
							Icon={AssignmentIcon}
							clickValue={'associate'}
							onClick={manageUserCategory}
							selected={userCategory === 'associate'}
						/>
					</Grid>
					<Grid item xs={12} md={1}>
						<DashboardCard
							label="Unknown"
							value={counts.Unknown}
							Icon={AssignmentIcon}
							clickValue={'unknown'}
							onClick={manageUserCategory}
							selected={userCategory === 'unknown'}
						/>
					</Grid>
					{/* <Grid item xs={12} md={2}>
						<DashboardCard
							label="Not Interested"
							value={100}
							Icon={AssignmentIcon}
						/>
					</Grid> */}

					{/* <Grid item xs={12} md={2}>
						<DashboardCard
							label="Closed Deals"
							value={100}
							Icon={AssignmentIcon}
						/>
					</Grid> */}
				</Grid>
			)}

			<ClientSupportLeadsList userCategory={userCategory} />
		</>
	);
};

export default ClientSupportHome;
