import { Grid, Typography } from '@material-ui/core';

import PackageCard from './package.component';
import React from 'react';

const Packages = ({ data, loading, error, fetchPackages }) => {
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
						<PackageCard
							propertyPackage={c}
							fetchPackages={fetchPackages}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Packages;
