import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import React, { memo, useEffect, useRef, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { addAgentResponse } from '../../utils/asyncQueries';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { parseDate } from '../queryTable/agentQueries.component';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	error: {
		color: 'red',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AgentActions = memo(
	({ open, handleClose, id, title, actions, fetchQueries }) => {
		const classes = useStyles();
		const cancelToken = useRef();
		const [loading, setLoading] = useState(false);
		const [data, setData] = useState([]);
		const [message, setMessage] = useState('');
		const [error, setError] = useState(false);

		const onSubmit = async () => {
			if (message) {
				try {
					cancelToken.current = axios.CancelToken.source();
					const data = {
						message,
						date: Date.now(),
					};
					const resp = await addAgentResponse(
						id,
						data,
						cancelToken.current,
						setLoading
					);
					setMessage('');
					const existingActions = resp.action;
					existingActions.sort(function (a, b) {
						// Turn your strings into dates, and then subtract them
						// to get a value that is either negative, positive, or zero.
						return new Date(b.date) - new Date(a.date);
					});
					setData(existingActions);
					setError(error);
					// fetchQueries();
				} catch (error) {
					setError(error);
				}
			}
		};

		const buttonProps = {};
		if (loading) {
			buttonProps.endIcon = (
				<CircularProgress size={20} color="inherit" />
			);
		}

		useEffect(() => {
			const existingActions = actions;
			existingActions.sort(function (a, b) {
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				return new Date(b.date) - new Date(a.date);
			});
			setData(existingActions);

			return () => {
				if (cancelToken.current !== undefined) {
					cancelToken.current.cancel();
				}
			};
		}, [actions]);

		return (
			<div>
				<Dialog
					fullScreen
					open={open}
					onClose={handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleClose}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								{title}
							</Typography>
						</Toolbar>
					</AppBar>
					{error && (
						<Typography
							align="center"
							className={classes.error}
							gutterBottom
						>
							{error}
						</Typography>
					)}
					<Box p="1rem">
						<TextField
							multiline
							rows={10}
							fullWidth
							variant="filled"
							label="Your Meessage"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<Box display="flex" justifyContent="flex-end" mt="1rem">
							<Button
								variant="contained"
								color="primary"
								onClick={onSubmit}
								disabled={loading}
								{...buttonProps}
							>
								Submit
							</Button>
						</Box>
					</Box>
					<List>
						{data.map((c) => (
							<ListItem key={c._id}>
								<ListItemText
									primary={c.message}
									secondary={parseDate(c.date)}
								/>
							</ListItem>
						))}
					</List>
				</Dialog>
			</div>
		);
	}
);

export default AgentActions;
