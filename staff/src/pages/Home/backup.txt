import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DashboardCard from '../../components/DashboardCard';
import { DashboardData } from '../../model/apiResponse.interface';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RenderByRole from '../../components/RenderByRole';
import Skeleton from '@material-ui/lab/Skeleton';
import { StaffType } from '../../model/staff.interface';
import WorkIcon from '@material-ui/icons/Work';
import { asyncGetDashboardContent } from '../../API/page';
import useStyles from './homePage.style';

const HomePage: React.FC = () => {
	const style = useStyles();

	// state
	const [data, setData] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const resp = await asyncGetDashboardContent();
				setData(resp);
				setLoading(false);
			} catch (error) {
				setData(null);
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className={style.pageWrapper}>
			<Box mb="2rem" mt="2rem">
				<Typography variant="h4" gutterBottom align="center">
					Welcome to{' '}
					<Typography color="primary" variant="h4" display="inline">
						Homesearch18
					</Typography>
				</Typography>
			</Box>
			{loading && (
				<Grid container spacing={3}>
					<Grid item xs={6} md={3}>
						<Skeleton className={style.skeleton} />
					</Grid>
					<Grid item xs={6} md={3}>
						<Skeleton className={style.skeleton} />
					</Grid>
					<Grid item xs={6} md={3}>
						<Skeleton className={style.skeleton} />
					</Grid>
					<Grid item xs={6} md={3}>
						<Skeleton className={style.skeleton} />
					</Grid>
				</Grid>
			)}
			{data && (
				<>
					<RenderByRole type={StaffType.GM}>
						<Grid container spacing={3} justify="center">
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Total Leads"
									value={data.totalLeads}
									Icon={AssignmentIcon}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="New Leads"
									value={data.newLeads}
									Icon={NewReleasesIcon}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Active Leads"
									value={data.activeLeads}
									Icon={WorkIcon}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Leads under client support"
									value={data.clientSupportLeads}
									Icon={AssignmentIndIcon}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Leads under BDM"
									value={data.bdmLeads}
									Icon={AssignmentIndIcon}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Leads on hold"
									value={data.holdLeads}
									Icon={PlayArrowIcon}
								/>
							</Grid>
						</Grid>
					</RenderByRole>
					<RenderByRole type={StaffType.ClientSupport}>
						<Grid container spacing={3} justify="center">
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Total Leads"
									value={data.totalLeads}
									Icon={AssignmentIcon}
								/>
							</Grid>

							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Active Leads"
									value={data.activeLeads}
									Icon={WorkIcon}
								/>
							</Grid>

							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Leads on hold"
									value={data.holdLeads}
									Icon={PlayArrowIcon}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Completed Leads"
									value={data.forwardedLeads}
									Icon={CheckCircleIcon}
								/>
							</Grid>
						</Grid>
					</RenderByRole>
					<RenderByRole type={StaffType.BDM}>
						<Grid container spacing={3} justify="center">
							<Grid item xs={6} md={3}>
								<DashboardCard
									label="Total Leads"
									value={data.totalLeads}
									Icon={AssignmentIcon}
								/>
							</Grid>
						</Grid>
					</RenderByRole>
				</>
			)}
		</div>
	);
};

export default HomePage;
