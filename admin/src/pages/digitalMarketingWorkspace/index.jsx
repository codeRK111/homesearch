import { Grid } from '@material-ui/core';
import ProjectCard from './projectCard.component';
import React from 'react';
import useStyles from './style';

const DigitalMarketingWorkspace = () => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<h1>Projects</h1>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<ProjectCard />
				</Grid>
			</Grid>
		</div>
	);
};

export default DigitalMarketingWorkspace;
