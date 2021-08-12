import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import AddTower from './addTower.component';
import Tower from './tower.component';
import useGlobalStyles from '../../../common.style';

const ProjectPhases = memo(
	({ project, fetchProject, properties, onAddClick }) => {
		const gClasses = useGlobalStyles();
		return (
			<>
				{Array.from({ length: project.phases }, (_, i) => ++i).map(
					(phase) => (
						<Box key={phase} mb="2rem">
							<AppBar position="static" color="default">
								<Toolbar>
									<Typography
										variant="h6"
										className={gClasses.flexGrow}
									>
										Phase - {phase}
									</Typography>
									<AddTower
										project={project}
										phase={phase}
										fetchProject={fetchProject}
									/>
								</Toolbar>
							</AppBar>

							<Box p="1rem">
								<Grid container spacing={3}>
									{project.towerNames
										.filter((a) => a.phase === phase)
										.map((c) => (
											<Grid
												item
												xs={12}
												md={4}
												key={c._id}
											>
												<Tower
													project={project}
													fetchProject={fetchProject}
													properties={properties}
													tower={c}
													onAddClick={onAddClick}
												/>
											</Grid>
										))}
								</Grid>
							</Box>
						</Box>
					)
				)}
			</>
		);
	}
);

export default ProjectPhases;
