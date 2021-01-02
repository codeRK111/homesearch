import {
	fetchAllUsersSTart,
	removeUser,
	toggleUserInfo,
} from '../../redux/users/users.actions';
import { green, red } from '@material-ui/core/colors';
import {
	selectAllUsers,
	selectLoading,
} from '../../redux/users/users.selector';

import AlertDialogue from '../alertDialogue/alertDialogue.component';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomSelect from './select.component';
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';
import React from 'react';
import RenderByRole from '../roleRender/roleRender.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

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
		overflowX: 'auto',
	},
}));

function Orders({
	loading,
	allUsers,
	fetchUsersStart,
	removeUser,
	toggleUserInfo,
}) {
	const history = useHistory();
	React.useEffect(() => {
		fetchUsersStart();
	}, [fetchUsersStart]);

	const classes = useStyles();

	const [alertOpen, setAlertOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [userId, setUserId] = React.useState(null);
	const [errorMessage, setErrorMessage] = React.useState('');

	const setError = (msg) => {
		console.log(msg);
		setErrorMessage(msg);
	};

	const handleMobileStatus = (event) => {};
	const toggleStatus = (id, status) => (event) => {
		let futureStatus;
		if (status === 'active') {
			futureStatus = 'inactive';
		} else {
			futureStatus = 'active';
		}
		toggleUserInfo(futureStatus, id, setError);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleClickAlertOpen = (id) => () => {
		setUserId(id);
		setAlertOpen(true);
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const deleteUser = () => {
		console.log('object');
		removeUser(userId, handleAlertClose);
	};

	const ActionHeadingNode = RenderByRole(
		<TableCell align="right" style={{ color: '#ffffff' }}>
			Action
		</TableCell>,
		[
			{
				type: 'userActions',
				value: 'update',
			},
		]
	);

	const StatusNode = (row) => {
		const Comp = RenderByRole(
			<TableCell
				width="6%"
				className="pointer"
				onClick={toggleStatus(row.id, row.status)}
			>
				<div>
					<Tooltip title="Toggle" placement="left-start">
						<Box>{row.status}</Box>
					</Tooltip>
				</div>
			</TableCell>,
			[
				{
					type: 'userActions',
					value: 'status',
				},
			],
			<TableCell width="6%" className="pointer">
				<Box>{row.status}</Box>
			</TableCell>
		);

		return <Comp />;
	};
	const mobileStatusNode = (row) => {
		const Comp = RenderByRole(
			<TableCell width="6%">
				<CustomSelect
					value={row.mobileStatus}
					userId={row.id}
					items={[
						{
							label: 'Public',
							value: 'public',
						},
						{
							label: 'Private',
							value: 'private',
						},
						{
							label: 'Semi Private',
							value: 'semi-private',
						},
					]}
				/>
			</TableCell>,
			[
				{
					type: 'userActions',
					value: 'update',
				},
			],
			<TableCell width="6%" className="pointer">
				<Box>{row.mobileStatus}</Box>
			</TableCell>
		);

		return <Comp />;
	};
	const ActionDataNode = (row) => {
		const Comp = RenderByRole(
			<TableCell align="right" width="6%">
				<Box display="flex" justifyContent="flex-end">
					<div className={classes.iconButton}>
						<Tooltip title="Edit" placement="left-start">
							<EditIcon
								style={{
									color: green[500],
								}}
								onClick={() =>
									history.push(`/users/editUser/${row.id}`)
								}
							/>
						</Tooltip>
					</div>
				</Box>
			</TableCell>,
			[
				{
					type: 'userActions',
					value: 'update',
				},
			]
		);

		return <Comp />;
	};
	return (
		<React.Fragment>
			<AlertDialogue
				open={alertOpen}
				handleClickOpen={handleClickAlertOpen}
				handleClose={handleAlertClose}
				onSubmit={deleteUser}
			/>
			<div className={classes.flexWrapper}>
				<h3>Users</h3>
				{loading && <CircularProgress size={20} />}
			</div>
			<p className="color-red">{errorMessage}</p>
			<div className={classes.tableWrapper}>
				<Table size="medium">
					<TableHead>
						<TableRow
							style={{
								backgroundColor: '#34495e',
							}}
						>
							<TableCell style={{ color: '#ffffff' }}>
								ID
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								City
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Name
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Image
							</TableCell>
							<TableCell colSpan={3} style={{ color: '#ffffff' }}>
								Info
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Mobile Status
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Photo Status
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								User Status
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Payment Status
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Register Via
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Gender
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Role
							</TableCell>
							<ActionHeadingNode />
						</TableRow>
					</TableHead>
					<TableBody>
						{allUsers.map((row) => (
							<TableRow key={row.id}>
								<TableCell width="6%">
									{row.serialNumber}
								</TableCell>
								<TableCell width="6%">
									{row.city.name}
								</TableCell>
								<TableCell width="6%">{row.name}</TableCell>
								<TableCell width="6%">
									<img
										src={`/profile/${row.photo}`}
										alt="user"
										height="100px"
										width="100px"
									/>
								</TableCell>
								<TableCell colSpan={3}>
									<b>Email: </b>
									{row.email}
									<br />
									<b>Phone</b>:{row.number}
									<br />
									<b>CreatedAt:</b>
									{moment(row.createdAt).format('YYYY-MM-DD')}
									<br />
									{row.createdBy && (
										<span>
											<b>CreatedBy:</b>
											{row.createdBy}
										</span>
									)}
								</TableCell>
								{mobileStatusNode(row)}
								<TableCell width="6%">
									{row.photoStatus}
								</TableCell>
								{StatusNode(row)}
								<TableCell width="6%">
									{row.paymentStatus}
								</TableCell>
								<TableCell>
									{row.registerThrough}
									<br />
									<b>Via:</b>
									{row.registerVia}
								</TableCell>
								<TableCell width="6%">{row.gender}</TableCell>
								<TableCell width="6%">{row.role}</TableCell>
								{ActionDataNode(row)}
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
	allUsers: selectAllUsers,
	loading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchUsersStart: () => dispatch(fetchAllUsersSTart()),
	removeUser: (userId, callback) =>
		dispatch(removeUser({ userId, callback })),
	toggleUserInfo: (status, userId, callback) =>
		dispatch(toggleUserInfo({ user: { status }, userId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
