import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialogue from '../alertDialogue/alertDialogue.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectAllAdmins,
	selectAllAdminsLoading,
	selectAllAdminsError,
} from '../../redux/admins/admins.selector';
import {
	fetchAllAdminsStart,
	removeAdmin,
	toggleAdminInfo,
} from '../../redux/admins/admins.actions';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import CustomSelect from './select.component';
// import moment from 'moment';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
	flexWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	iconButton: {
		cursor: 'pointer',
	},
	tableWrapper: {
		// overflowX: 'scroll',
	},
	colorRed: {
		color: 'red',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

function Orders({
	loading,
	allAdmins,
	fetchAllAdminsStart,
	error,
	removeAdmin,
	toggleAdminInfo,
}) {
	const history = useHistory();
	React.useEffect(() => {
		fetchAllAdminsStart();
	}, [fetchAllAdminsStart]);

	const classes = useStyles();

	const [alertOpen, setAlertOpen] = React.useState(false);
	const [userId, setUserId] = React.useState(null);

	const handleClickAlertOpen = (id) => () => {
		setUserId(id);
		setAlertOpen(true);
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const deleteUser = () => {
		console.log('object');
		removeAdmin(userId, handleAlertClose);
	};

	const toggleStatus = (id, status) => (event) => {
		let futureStatus;
		if (status === 'active') {
			futureStatus = 'inactive';
		} else {
			futureStatus = 'active';
		}
		toggleAdminInfo({ status: futureStatus }, id, console.log);
	};
	return (
		<React.Fragment>
			<Backdrop
				className={classes.backdrop}
				open={allAdmins.length === 0 && loading}
				// onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<AlertDialogue
				open={alertOpen}
				handleClickOpen={handleClickAlertOpen}
				handleClose={handleAlertClose}
				onSubmit={deleteUser}
			/>

			<div className={classes.tableWrapper}>
				<p className={classes.colorRed}>{error}</p>
				<Table size="medium">
					<TableHead>
						<TableRow
							style={{
								backgroundColor: '#34495e',
							}}
						>
							<TableCell style={{ color: '#ffffff' }}>
								SL no
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Username
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Name
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								User Type
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Status
							</TableCell>

							<TableCell
								align="right"
								style={{ color: '#ffffff' }}
							>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{allAdmins.map((row, i) => (
							<TableRow key={row.id}>
								<TableCell>{i + 1}</TableCell>
								<TableCell>{row.username}</TableCell>
								<TableCell>{row.name}</TableCell>

								<TableCell>
									<CustomSelect
										value={row.type}
										userId={row.id}
										items={[
											{
												label: 'Admin',
												value: 'admin',
											},
											{
												label: 'Staff',
												value: 'staff',
											},
											{
												label: 'Super Admin',
												value: 'super-admin',
											},
										]}
									/>
								</TableCell>
								<TableCell
									className="pointer"
									onClick={toggleStatus(row.id, row.status)}
								>
									<Tooltip
										title="Toggle"
										placement="left-start"
									>
										<Box>{row.status}</Box>
									</Tooltip>
								</TableCell>

								<TableCell align="right">
									<Box
										display="flex"
										justifyContent="flex-end"
									>
										<div className={classes.iconButton}>
											<Tooltip
												title="Edit"
												placement="left-start"
											>
												<EditIcon
													style={{
														color: green[500],
														marginRight: '0.5rem',
													}}
													onClick={() =>
														history.push(
															`/admins/editAdmin/${row.id}`
														)
													}
												/>
											</Tooltip>
										</div>
										<div className={classes.iconButton}>
											<Tooltip
												title="Delete"
												placement="left-start"
											>
												<DeleteIcon
													style={{ color: red[500] }}
													onClick={handleClickAlertOpen(
														row.id
													)}
												/>
											</Tooltip>
										</div>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className={classes.seeMore}>
				<Link color="primary" href="#" onClick={preventDefault}>
					{/* See more orders */}
				</Link>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = createStructuredSelector({
	allAdmins: selectAllAdmins,
	loading: selectAllAdminsLoading,
	error: selectAllAdminsError,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAllAdminsStart: () => dispatch(fetchAllAdminsStart()),
	removeAdmin: (adminId, callback) =>
		dispatch(removeAdmin({ adminId, callback })),
	toggleAdminInfo: (admin, adminId, callback) =>
		dispatch(toggleAdminInfo({ admin, adminId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
