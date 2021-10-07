import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardCard from '../../components/DashboardCard';
import { Grid } from '@material-ui/core';
import React from 'react';

const GmHome = () => {
	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} md={3}>
					<DashboardCard
						label="Owner"
						value={100}
						Icon={AssignmentIcon}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default GmHome;
