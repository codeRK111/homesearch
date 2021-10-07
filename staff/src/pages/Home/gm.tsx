import { Box, Grid } from '@material-ui/core';
import {
	FetchCountLoader,
	FetchTargetLoader,
} from '../../components/Loader/HomePage';
import { GMLeadCounts, asyncGetGMLeadCounts } from '../../API/lead';
import { IMyTarget, asyncGetMyTargets } from '../../API/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';

import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardCard from '../../components/DashboardCard';
import GMLeadsList from './gmLeadsList';
import TargetCard from '../../components/TargetCard';

const GmHome = () => {
	// Token
	const targetSource = useRef<CancelTokenSource | null>(null);
	const countSource = useRef<CancelTokenSource | null>(null);
	// State
	const [userCategory, setUserCategory] = useState(null);
	const [leadType, setLeadType] = useState(null);
	const [targetLoading, setTargetLoading] = useState(false);
	const [countLoading, setCountLoading] = useState(false);
	const [myTarget, setMyTarget] = useState<IMyTarget | null>(null);
	const [counts, setCounts] = useState<GMLeadCounts | null>(null);

	const manageLeadType = (type: any) => {
		setUserCategory(null);
		setLeadType(type);
	};
	const manageUserCategory = (category: any) => {
		setUserCategory(category);
		setLeadType(null);
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
			{countLoading && <FetchCountLoader count={5} />}
			{counts && (
				<Grid container spacing={3} justifyContent="center">
					<Grid item xs={12} md={2}>
						<DashboardCard
							label="Owner"
							value={counts.Owner}
							Icon={AssignmentIcon}
							clickValue={'owner'}
							onClick={manageUserCategory}
							selected={userCategory === 'owner'}
						/>
					</Grid>
					<Grid item xs={12} md={2}>
						<DashboardCard
							label="Realtor"
							value={counts.Realtor}
							Icon={AssignmentIcon}
							clickValue={'realtor'}
							onClick={manageUserCategory}
							selected={userCategory === 'realtor'}
						/>
					</Grid>
					<Grid item xs={12} md={2}>
						<DashboardCard
							label="Builder"
							value={counts.Builder}
							Icon={AssignmentIcon}
							clickValue={'builder'}
							onClick={manageUserCategory}
							selected={userCategory === 'builder'}
						/>
					</Grid>
					{/* <Grid item xs={12} md={2}>
						<DashboardCard
							label="Not Interested"
							value={100}
							Icon={AssignmentIcon}
						/>
					</Grid> */}
					<Grid item xs={12} md={2}>
						<DashboardCard
							label="Active Deals"
							value={counts.Active}
							Icon={AssignmentIcon}
							clickValue={'active'}
							onClick={manageLeadType}
							selected={leadType === 'active'}
						/>
					</Grid>
					<Grid item xs={12} md={2}>
						<DashboardCard
							label="Inactive Deals"
							value={counts.Inactive}
							Icon={AssignmentIcon}
							clickValue={'inactive'}
							onClick={manageLeadType}
							selected={leadType === 'inactive'}
						/>
					</Grid>
					{/* <Grid item xs={12} md={2}>
						<DashboardCard
							label="Closed Deals"
							value={100}
							Icon={AssignmentIcon}
						/>
					</Grid> */}
				</Grid>
			)}
			{targetLoading && (
				<Box mt="4rem">
					<FetchTargetLoader count={2} />
				</Box>
			)}
			{myTarget && (
				<Box mt="4rem">
					<Grid container spacing={1} justifyContent="space-between">
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
						<Grid item xs={12} md={3}>
							<TargetCard
								label="Deals Target"
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
			<GMLeadsList userCategory={userCategory} leadStatus={leadType} />
		</>
	);
};

export default GmHome;
