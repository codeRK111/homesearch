import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Box, Grid } from '@material-ui/core';

import ProjectCard from './project-card';
import React from 'react';

const CustomSlider = ({ docs = [], Card }) => {
	return (
		<Box style={{ boxSizing: 'border-box', padding: '1rem' }}>
			<Grid container spacing={5} justify="center">
				{docs.map((c, i) => (
					<Grid item xs={12} md={3} key={c.id}>
						<ProjectCard project={c} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default CustomSlider;
