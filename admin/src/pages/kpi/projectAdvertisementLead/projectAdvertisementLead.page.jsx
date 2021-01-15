import { Box, Grid, Paper } from '@material-ui/core';

import CallMadeIcon from '@material-ui/icons/CallMade';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenedIcon from '@material-ui/icons/PhonePaused';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StaffTable from '../staffTable.component';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllLeads } from '../../../redux/kpi/kpi.actions';
import { selectFetchAllLeadsLoading } from '../../../redux/kpi/kpi.selector';
import useStyles from '../../workspace/workspace.style';
import useStylesKpi from '../kpi.styles';

const KPI = ({ loading, fetchAllLeads }) => {
	const classes = useStyles();
	const kpiClasses = useStylesKpi();
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
		fetchAllLeads(fetchCallBack);
	}, []);

	return (
		<Box p="1rem">
			<Box display="flex" justifyContent="center">
				<h2>Project Advertisement Leads</h2>
			</Box>
			{asyncError && <p>{asyncError}</p>}
			{!loading && data && (
				<Box>
					<h3>Data fetched</h3>
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
												<CallMadeIcon
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
													Total call
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
												<CallReceivedIcon
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
													Call Received
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
												<CallMissedIcon
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
													Call Missed
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
												<ScheduleIcon
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
													Call Scheduled
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
												<SuccessIcon
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
													Deal Closed
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
												<OpenedIcon
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
													Deal Opened
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
												<DeleteIcon
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
													Deal Rejected
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
												<PeopleIcon
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
													Total Staffs
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
						<Grid item xs={12} md={6}>
							<Paper>
								<Box>
									<Box className={kpiClasses.tableCardHeader}>
										Staffs
									</Box>
									<Box className={kpiClasses.tableWrapper}>
										<StaffTable type="staff-details" />
									</Box>
								</Box>
							</Paper>
						</Grid>
						<Grid item xs={12} md={6}>
							<Paper>
								<Box>
									<Box className={kpiClasses.tableCardHeader}>
										Admins
									</Box>
									<Box className={kpiClasses.tableWrapper}>
										<StaffTable type="admin-details" />
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectFetchAllLeadsLoading,
});

const dispatchStateToProps = (dispatch) => ({
	fetchAllLeads: (callback) => dispatch(fetchAllLeads({ callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(KPI);
