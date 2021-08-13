import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import AddTower from './addTower.component';
import RemovePhaseButton from './removePhase.component';
import Tower from './tower.component';
import useGlobalStyles from '../../../common.style';

const ProjectPhases = memo(
	({
		project,
		fetchProject,
		properties,
		onAddClick,
		onEditClick,
		onStatusChange,
	}) => {
		const gClasses = useGlobalStyles();

		return (
			<>
				{project.phases.map((phase) => (
					<Box key={phase._id} mb="2rem">
						<AppBar position="static" color="default">
							<Toolbar>
								<Typography
									variant="h6"
									className={gClasses.flexGrow}
								>
									Phase - {phase.name}
								</Typography>
								<AddTower
									project={project}
									phase={phase.name}
									fetchProject={fetchProject}
								/>
								{project.towerNames.filter(
									(a) => a.phase === phase.name
								).length === 0 && (
									<RemovePhaseButton
										projectId={project.id}
										phaseId={phase._id}
										fetchProject={fetchProject}
									/>
								)}
							</Toolbar>
						</AppBar>

						<Box p="1rem">
							<Grid container spacing={3}>
								{project.towerNames
									.filter((a) => a.phase === phase.name)
									.map((c) => (
										<Grid item xs={12} md={4} key={c._id}>
											<Tower
												project={project}
												fetchProject={fetchProject}
												properties={properties}
												tower={c}
												onAddClick={onAddClick}
												onEditClick={onEditClick}
												onStatusChange={onStatusChange}
											/>
										</Grid>
									))}
							</Grid>
						</Box>
					</Box>
				))}
			</>
		);
	}
);

export default ProjectPhases;
