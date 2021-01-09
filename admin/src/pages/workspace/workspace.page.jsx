import { Box, Button, Grid, Paper } from '@material-ui/core';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import TimerIcon from '@material-ui/icons/Timer';
import WorkIcon from '@material-ui/icons/Work';
import { useHistory } from 'react-router-dom';
import useStyles from './workspace.style';

const Workspace = () => {
	const classes = useStyles();
	const history = useHistory();

	const onClick = (id) => () => {
		history.push(`/manage-task/${id}`);
	};
	return (
		<Box p="1rem">
			<Box display="flex" justifyContent="center">
				<h2> My Workspace</h2>
			</Box>
			<Box width="100%" mt="1rem">
				<Grid container justify="center" spacing={3}>
					<Grid item xs={12} md={3}>
						<Paper>
							<Box p="0.5rem">
								<Grid container justify="center">
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											className={classes.iconWrapper}
										>
											<WorkIcon
												className={classes.icon}
											/>
										</Box>
									</Grid>
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											flexDirection="column"
											justifyContent="center"
											alignItems="center"
										>
											<span className={classes.label}>
												Task Assigned
											</span>
											<span className={classes.info}>
												Project Advertisement
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3}>
						<Paper>
							<Box p="0.5rem">
								<Grid container justify="center">
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											className={classes.iconWrapper}
										>
											<TimerIcon
												className={classes.icon}
											/>
										</Box>
									</Grid>
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											flexDirection="column"
											justifyContent="center"
											alignItems="center"
										>
											<span className={classes.label}>
												Calls / day
											</span>
											<span className={classes.info}>
												10
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3}>
						<Paper>
							<Box p="0.5rem">
								<Grid container justify="center">
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											className={classes.iconWrapper}
										>
											<CalendarTodayIcon
												className={classes.icon}
											/>
										</Box>
									</Grid>
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											flexDirection="column"
											justifyContent="center"
											alignItems="center"
										>
											<span className={classes.label}>
												Calls / month
											</span>
											<span className={classes.info}>
												300
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3}>
						<Paper>
							<Box p="0.5rem">
								<Grid container justify="center">
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											className={classes.iconWrapper}
										>
											<PersonIcon
												className={classes.icon}
											/>
										</Box>
									</Grid>
									<Grid item xs={6}>
										<Box
											width="100%"
											height="100%"
											display="flex"
											flexDirection="column"
											justifyContent="center"
											alignItems="center"
										>
											<span className={classes.label}>
												Task Assigned By
											</span>
											<span className={classes.info}>
												Admin 3
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Box
				mt="1rem"
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<h3>Task Description</h3>
				<p className={classes.textCenter}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Unde, iure. Quaerat eaque eum, consectetur laboriosam atque
					reprehenderit quae facilis sed inventore veritatis
					architecto, nam debitis saepe provident asperiores, maxime
					nostrum?
				</p>
			</Box>
			<Box mt="1rem" display="flex" justifyContent="center">
				<Button
					size="large"
					variant="contained"
					color="primary"
					onClick={onClick('123')}
				>
					Manage Task
				</Button>
			</Box>
		</Box>
	);
};

export default Workspace;
