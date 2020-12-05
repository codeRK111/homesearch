import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import { handleRERA } from '../../../utils/render.utils';
import { useMediaQuery } from '@material-ui/core';
import useStyles from '../propertyDetails.style';

const Header = ({ project }) => {
	console.log(project);
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const rera = handleRERA(project.legalClearance);
	return (
		<Box>
			{!mobile && (
				<Paper elevation={1} className={classes.p1}>
					<Grid container>
						<Grid
							item
							xs={6}
							md={9}
							className={[classes.borderRight].join(' ')}
						>
							<Box ml="1rem">
								<h3 className={classes.title}>
									{project.title}
								</h3>
								<Box mt="0.3rem">
									<span>
										{project.location.name},
										{project.city.name}
									</span>
								</Box>
								{rera['show'] && (
									<Box mt="0.3rem">
										<span>
											{rera['show'] && (
												<a
													href={rera['value']}
													target="_blank"
												>
													{rera['value']}
												</a>
											)}
										</span>
									</Box>
								)}
							</Box>
						</Grid>
						<Grid
							item
							xs={6}
							md={3}
							className={[classes.center].join(' ')}
						>
							<Box ml="0.3rem" display="flex" alignItems="center">
								<span>by</span>

								<Box ml="0.5rem">
									<h3 className={classes.title}>
										{project.builder.developerName}
									</h3>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			)}
			{mobile && (
				<Paper elevation={1} className={classes.p1}>
					<Grid container>
						<Grid item xs={12}>
							<Box mb="1.5rem">
								<h3 className={classes.title}>
									{project.title}
								</h3>
								<Box mt="0.3rem">
									<span>
										{project.location.name},
										{project.city.name}
									</span>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box mt="1rem">
								<Box display="flex" alignItems="center">
									<span>by</span>

									<Box ml="0.5rem">
										<h3 className={classes.title}>
											{project.builder.developerName}
										</h3>
									</Box>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			)}
		</Box>
	);
};

export default Header;
