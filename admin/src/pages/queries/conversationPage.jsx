import React from 'react';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import useGlobalStyle from '../../common.style';
import { useHistory } from 'react-router-dom';
import ConversationsDialog from './conversationDialog.component';

const ConversationPage = ({
	match: {
		params: { id },
	},
}) => {
	let cancelToken;
	const history = useHistory();
	const globalClasses = useGlobalStyle();

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	// Dialog State
	const [open, setOpen] = React.useState(false);

	// Message
	const [message, setMessage] = React.useState('');

	const handleChange = (event) => {
		setMessage(event.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onClick = async () => {
		if (message) {
			try {
				setAsyncState({
					error: null,
					loading: true,
				});
				cancelToken = axios.CancelToken.source();
				await axios.patch(
					`/api/v1/queries/query-conversation/${id}`,
					{
						message,
					},
					{
						cancelToken: cancelToken.token,
					}
				);

				setAsyncState({
					error: null,
					loading: false,
				});
				history.push('/queries');
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
		}
	};

	const buttonProps = {};

	if (asyncState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<Box p="1rem">
			<ConversationsDialog
				open={open}
				handleClose={handleClose}
				id={id}
			/>
			<Box
				display="flex"
				width="100%"
				justifyContent="space-between"
				alignItems="center"
			>
				<h3>Add Message</h3>
				<Button
					onClick={handleClickOpen}
					size="small"
					variant="outlined"
				>
					View Full Conversations
				</Button>
			</Box>
			{asyncState.error && (
				<p className={globalClasses.errorMessage}>{asyncState.error}</p>
			)}
			<TextField
				multiline
				rows={7}
				variant="filled"
				fullWidth
				value={message}
				onChange={handleChange}
				placeholder="Message"
			/>
			<Box mt="1rem">
				<Button
					variant="contained"
					color="primary"
					onClick={onClick}
					{...buttonProps}
				>
					Submit
				</Button>
			</Box>
		</Box>
	);
};

export default ConversationPage;
