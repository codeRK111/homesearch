import { Box, Button, Grid, Paper } from '@material-ui/core';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CategoryIcon from '@material-ui/icons/Category';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import TimerIcon from '@material-ui/icons/Timer';
import WorkIcon from '@material-ui/icons/Work';
import { capitalizeFirstLetter } from '../../utils/render.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchMyTasks } from '../../redux/kra/kra.actions';
import { selectfetchMyTasksLoading } from '../../redux/kra/kra.selector';
import { useHistory } from 'react-router-dom';
import useStyles from './workspace.style';

const Workspace = ({ loading, fetchMyTasks }) => {
	const classes = useStyles();
	const history = useHistory();
	const [asyncError, setAsyncError] = React.useState(null);
	const [data, setData] = React.useState(null);

	const fetchCallBack = (status, data) => {
		if (status === 'success') {
			setData(data);
			setAsyncError(null);
		} else {
			setData(null);
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		fetchMyTasks(fetchCallBack);
	}, []);

	const onClick = (c) => () => {
		if (c.pType === 'project') {
			history.push(`/manage-task/${c.id}`);
		} else {
			history.push(`/manage-task-property/${c.id}`);
		}
	};

	const renderTaskName = (c) => {
		switch (c.pType) {
			case 'project':
				return 'Project Advertisement';

			default:
				return 'Property Advertisement';
		}
	};

	const renderForCard = (c) => {
		if (c.pType === 'property') {
			return (
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
										<CategoryIcon
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
											Category
										</span>
										<span className={classes.info}>
											{capitalizeFirstLetter(c.pFor)}
										</span>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Grid>
			);
		} else {
			return null;
		}
	};

	return (
		<Box p="1rem">
			<Box display="flex" justifyContent="center">
				<h2> My Workspace</h2>
				{asyncError && <p className="color-red">{asyncError}</p>}
			</Box>
			{!loading &&
				data &&
				data.projectAdvertisement.map((c) => (
					<Box width="100%" mt="3rem">
						<Paper>
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
														className={
															classes.iconWrapper
														}
													>
														<WorkIcon
															className={
																classes.icon
															}
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
														<span
															className={
																classes.label
															}
														>
															Task Assigned
														</span>
														<span
															className={
																classes.info
															}
														>
															{renderTaskName(c)}
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
														className={
															classes.iconWrapper
														}
													>
														<TimerIcon
															className={
																classes.icon
															}
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
														<span
															className={
																classes.label
															}
														>
															Calls / day
														</span>
														<span
															className={
																classes.info
															}
														>
															{c.minCallsPerDay}
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
														className={
															classes.iconWrapper
														}
													>
														<CalendarTodayIcon
															className={
																classes.icon
															}
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
														<span
															className={
																classes.label
															}
														>
															Calls / month
														</span>
														<span
															className={
																classes.info
															}
														>
															{c.minCallsPerMonth}
														</span>
													</Box>
												</Grid>
											</Grid>
										</Box>
									</Paper>
								</Grid>
								{renderForCard(c)}
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
														className={
															classes.iconWrapper
														}
													>
														<PersonIcon
															className={
																classes.icon
															}
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
														<span
															className={
																classes.label
															}
														>
															Task Assigned By
														</span>
														<span
															className={
																classes.info
															}
														>
															{c.admin.name}
														</span>
													</Box>
												</Grid>
											</Grid>
										</Box>
									</Paper>
								</Grid>
							</Grid>

							<Box
								mt="1rem"
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<h3>Task Description</h3>
								<p className={classes.textCenter}>
									{c.message}
								</p>
							</Box>
							<Box
								mt="1rem"
								display="flex"
								justifyContent="center"
							>
								<Button
									size="large"
									variant="contained"
									color="primary"
									onClick={onClick(c)}
								>
									Manage Task
								</Button>
							</Box>
						</Paper>
					</Box>
				))}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectfetchMyTasksLoading,
});

const dispatchStateToProps = (dispatch) => ({
	fetchMyTasks: (callback) => dispatch(fetchMyTasks({ callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(Workspace);
