import { Box, Paper } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchProjectAdvertisementLeadsSchedule } from '../../redux/kra/kra.actions';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { parseDate } from '../../utils/render.utils';
import { selectfetchProjectAdvertisementLeadsScheduleLoading } from '../../redux/kra/kra.selector';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
	wrapper: {
		maxWidth: '300px',
		height: '400px',
		overflow: 'auto',
		padding: '1rem',
	},
	notificationWrapper: {
		cursor: 'pointer',

		'&:hover': {
			backgroundColor: '#bdc3c7',
		},
	},
}));

function SimplePopover({ loading, fetchSchedule }) {
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const [leads, setLeads] = React.useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useHistory();

	const onClick = (id) => (_) => {
		history.push(`/edit-project-advertisement-leads/${id}`);
	};

	const fetchCallBack = (status, data) => {
		if (status === 'success') {
			setLeads(data);
			setAsyncError(null);
		} else {
			setLeads([]);
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		fetchSchedule('5ff834ad527c84098cfedb87', fetchCallBack);
	}, []);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Badge badgeContent={leads.length} color="primary">
				<Avatar>
					<IconButton aria-describedby={id} onClick={handleClick}>
						<NotificationsIcon />
					</IconButton>
				</Avatar>
			</Badge>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Box className={classes.wrapper}>
					<Box display="flex" justifyContent="center" width="100%">
						<h4>Today</h4>
					</Box>
					{leads
						.filter((b) =>
							moment().isSame(moment(b.scheduleTime), 'date')
						)
						.map((c) => (
							<Box
								key={c.id}
								display="flex"
								width="100%"
								alignItems="center"
								className={classes.notificationWrapper}
								onClick={onClick(c.id)}
							>
								<Avatar>
									<NotificationsIcon
										style={{ color: '#e74c3c' }}
									/>
								</Avatar>
								<Box ml="0.4rem" mt="0.6rem">
									You have a meeting on{' '}
									<b>{parseDate(c.scheduleTime)}</b> with{' '}
									<b>{c.builderName}</b> ({c.contactNumber})
								</Box>
							</Box>
						))}
					<Box display="flex" justifyContent="center" width="100%">
						<h4>Tommorow</h4>
					</Box>
					{leads
						.filter(
							(b) =>
								!moment().isSame(moment(b.scheduleTime), 'date')
						)
						.map((c) => (
							<Box
								key={c.id}
								display="flex"
								width="100%"
								alignItems="center"
								className={classes.notificationWrapper}
								onClick={onClick(c.id)}
							>
								<Avatar>
									<NotificationsIcon
										style={{ color: '#f1c40f' }}
									/>
								</Avatar>
								<Box ml="0.4rem" mt="0.6rem">
									You have a meeting on{' '}
									<b>{parseDate(c.scheduleTime)}</b> with{' '}
									<b>{c.builderName}</b> ({c.contactNumber})
								</Box>
							</Box>
						))}
				</Box>
			</Popover>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	loading: selectfetchProjectAdvertisementLeadsScheduleLoading,
});

const dispatchStateToProps = (dispatch) => ({
	fetchSchedule: (id, callback) =>
		dispatch(fetchProjectAdvertisementLeadsSchedule({ id, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(SimplePopover);
