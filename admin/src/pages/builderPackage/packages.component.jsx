import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import PackageCard from './package.component';

const Packages = ({ data, loading, error }) => {
	return (
		<div>
			{error && (
				<Typography color="error" align="center">
					{error}
				</Typography>
			)}
			<Grid container spacing={3}>
				{data.map((c) => (
					<Grid item xs={12} md={4} key={c.id}>
						<PackageCard builderPackage={c} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Packages;
