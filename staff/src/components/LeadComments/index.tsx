import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { LeadComment } from '../../model/lead.interface';
import Paper from '@material-ui/core/Paper';
import { asyncUpdateLead } from '../../API/lead';
import { parseDate } from '../../utils/render';

interface ILeadsComments {
	open: boolean;
	handleClose: () => void;
	comments?: Array<LeadComment>;
	id?: string;
	number: string;
	fetchLeads: () => void;
}

export default function LeadsComments({
	open,
	handleClose,
	id,
	comments,
	number,
	fetchLeads,
}: ILeadsComments) {
	const descriptionElementRef = React.useRef<HTMLElement>(null);

	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	const onSubmit = async () => {
		if (!id) return;
		if (!message) return;
		try {
			setLoading(true);
			await asyncUpdateLead(id, { message, number });
			setLoading(false);
			fetchLeads();
			setMessage('');
			handleClose();
		} catch (err: any) {
			console.log(err);
			setLoading(false);
		}
	};

	const renderComments = (): JSX.Element => {
		if (comments) {
			return (
				<Grid container spacing={3}>
					{comments.map((c) => (
						<Grid item xs={12} key={c._id}>
							<Paper>
								<List>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar
												alt="Remy Sharp"
												src="/static/images/avatar/1.jpg"
											/>
										</ListItemAvatar>

										<ListItemText
											primary={c.from.name}
											secondary={
												<React.Fragment>
													<Typography
														component="span"
														variant="caption"
														color="textPrimary"
													>
														{parseDate(c.date)}
													</Typography>{' '}
													<br />
													<Typography
														variant="body2"
														color="textPrimary"
													>
														{c.message}
													</Typography>
												</React.Fragment>
											}
										/>
									</ListItem>
								</List>
							</Paper>
						</Grid>
					))}
				</Grid>
			);
		} else {
			return <></>;
		}
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll={'paper'}
				fullWidth
				maxWidth="sm"
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<Box
					p="1rem"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h5">Comments</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<DialogContent dividers={true}>
					{comments && renderComments()}
				</DialogContent>
				<Box p="1rem" display="flex">
					<Box width="100%">
						<TextField
							label="Enter Message"
							variant="filled"
							fullWidth
							multiline
							rows={2}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</Box>
					<Box>
						<Button
							color="primary"
							variant="contained"
							style={{
								display: 'block',
								height: '100%',
							}}
							onClick={onSubmit}
							disabled={loading}
						>
							{loading ? (
								<CircularProgress color="inherit" />
							) : (
								'Submit'
							)}
						</Button>
					</Box>
				</Box>
			</Dialog>
		</div>
	);
}
