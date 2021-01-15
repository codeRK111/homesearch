import {
	Box,
	Button,
	Dialog,
	Fab,
	Grid,
	Paper,
	Slide,
	TextField,
} from '@material-ui/core';

import CallMadeIcon from '@material-ui/icons/CallMade';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import Chart from 'react-google-charts';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import OpenedIcon from '@material-ui/icons/PhonePaused';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import useStyles from '../../workspace/workspace.style';
import useStylesKpi from '../kpi.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const StaffDetails = () => {
	const kpiClasses = useStylesKpi();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Box p="1rem">
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<Box className={kpiClasses.alertWrapper}>
					<h3>Add Feedback</h3>
					<Box width="100%">
						<TextField
							multiline={true}
							rows={6}
							id="filled-basic"
							label="Enter Your Message"
							variant="filled"
							style={{ width: '100%' }}
						/>
					</Box>
					<Box width="100%" mt="1rem">
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleClose}
						>
							Add Feedback
						</Button>
					</Box>
				</Box>
			</Dialog>
			<Box display="flex" justifyContent="center">
				<h2>Staff Details</h2>
			</Box>
			<Box display="flex" justifyContent="center" mb="2rem">
				<h3>John Doe</h3>
			</Box>
			<Box mb="3rem">
				<Grid container spacing={3}>
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
												1500
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
												800
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
												200
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
												10
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
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
												100
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
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
												500
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
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
												1000
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Paper>
						<Box className={kpiClasses.tableCardHeader}>
							Per Day
						</Box>
						<Chart
							chartType="PieChart"
							height="300px"
							loader={<div>Loading Chart</div>}
							data={[
								['Task', 'Hours per Day'],
								['Open', 11],
								['Close', 2],
								['Denied', 5],
							]}
							options={{
								title: 'My Daily Activities',
								backgroundColor: 'transparent',
								// Just add this option
								is3D: true,
								legend: 'none',
								// pieHole: 0.5,
								chartArea: {
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
								},
							}}
							rootProps={{ 'data-testid': '2' }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper>
						<Box className={kpiClasses.tableCardHeader}>
							Per Month
						</Box>
						<Chart
							chartType="PieChart"
							height="300px"
							loader={<div>Loading Chart</div>}
							data={[
								['Task', 'Hours per Day'],
								['Open', 8],
								['Close', 2],
								['Denied', 2],
							]}
							options={{
								title: 'My Daily Activities',
								backgroundColor: 'transparent',
								// Just add this option
								is3D: true,
								legend: 'none',
								// pieHole: 0.5,
								chartArea: {
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
								},
							}}
							rootProps={{ 'data-testid': '2' }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper>
						<Box className={kpiClasses.tableCardHeader}>Total</Box>
						<Chart
							chartType="PieChart"
							height="300px"
							loader={<div>Loading Chart</div>}
							data={[
								['Task', 'Hours per Day'],
								['Open', 15],
								['Close', 2],
								['Denied', 5],
							]}
							options={{
								title: 'My Daily Activities',
								backgroundColor: 'transparent',
								// Just add this option
								is3D: true,
								legend: 'none',
								// pieHole: 0.5,
								chartArea: {
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
								},
							}}
							rootProps={{ 'data-testid': '2' }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<Box className={kpiClasses.tableCardHeader}>
							Deal Opened
						</Box>
						<Chart
							width={'500px'}
							height={'300px'}
							chartType="BarChart"
							loader={<div>Loading Chart</div>}
							data={[
								['Month', 'Number'],
								['Jan', 817],
								['Feb', 417],
								['Mar', 517],
								['Apr', 500],
								['May', 617],
								['June', 317],
								['July', 217],
								['Aug', 617],
								['Sept', 717],
								['Oct', 1000],
								['Nov', 300],
								['Dec', 700],
							]}
							options={{
								chartArea: { width: '50%' },
								hAxis: {
									title: 'Number',
									minValue: 0,
								},
								vAxis: {
									title: 'Month',
								},
								// pieHole: 0.5,
							}}
							// For tests
							rootProps={{ 'data-testid': '1' }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<Box className={kpiClasses.tableCardHeader}>
							Deal Closed
						</Box>
						<Chart
							width={'500px'}
							height={'300px'}
							chartType="BarChart"
							loader={<div>Loading Chart</div>}
							data={[
								['Month', 'Number'],
								['Jan', 817],
								['Feb', 417],
								['Mar', 517],
								['Apr', 500],
								['May', 617],
								['June', 317],
								['July', 217],
								['Aug', 617],
								['Sept', 717],
								['Oct', 1000],
								['Nov', 300],
								['Dec', 700],
							]}
							options={{
								chartArea: { width: '50%' },
								hAxis: {
									title: 'Number',
									minValue: 0,
								},
								vAxis: {
									title: 'Month',
								},
								// pieHole: 0.5,
							}}
							// For tests
							rootProps={{ 'data-testid': '1' }}
						/>
					</Paper>
				</Grid>
			</Grid>
			<Fab
				color="secondary"
				aria-label="edit"
				className={kpiClasses.fab}
				size="large"
				onClick={handleClickOpen}
			>
				<MessageIcon />
			</Fab>
		</Box>
	);
};

export default StaffDetails;
