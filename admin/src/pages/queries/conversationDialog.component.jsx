import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Loader from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import useGlobalStyle from '../../common.style';
import { parseDate } from '../../utils/render.utils';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, id }) {
	const classes = useStyles();
	const globalClasses = useGlobalStyle();
	let cancelToken;
	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});
	const [conversations, setConversations] = React.useState([]);

	React.useEffect(() => {
		if (open) {
			(async () => {
				try {
					setAsyncState({
						error: null,
						loading: true,
					});
					cancelToken = axios.CancelToken.source();
					const res = await axios.get(
						`/api/v1/queries/query-conversation/${id}`,
						{
							cancelToken: cancelToken.token,
						}
					);

					setAsyncState({
						error: null,
						loading: false,
					});
					setConversations(
						res.data.data.conversations.sort((a, b) => {
							return moment(b.date).diff(a.date);
						})
					);
				} catch (error) {
					if (error.response) {
						setAsyncState({
							error: error.response.data.message,
							loading: false,
						});
					} else {
						setAsyncState({
							error:
								'We are having some issues, please try again later',
							loading: false,
						});
					}
				}
			})();
		}

		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, [id, open]);

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
							View Conversations
						</Typography>
						{asyncState.loading && (
							<Loader color="inherit" size={30} />
						)}
					</Toolbar>
				</AppBar>
				{asyncState.error && (
					<p className={globalClasses.errorMessage}>
						{asyncState.error}
					</p>
				)}
				<List>
					{conversations.map((c) => (
						<div key={c.id}>
							<ListItem>
								<ListItemText
									primary={c.message}
									secondary={parseDate(c.date)}
								/>
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
			</Dialog>
		</div>
	);
}
