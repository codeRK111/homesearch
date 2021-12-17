import {
	Avatar,
	Box,
	CircularProgress,
	Divider,
	FormControlLabel,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core';
import { ILead, LeadComment } from '../../model/lead.interface';
import React, { useState } from 'react';
import { UpdateLeadData, asyncUpdateLead } from '../../API/lead';
import { parseDate, renderStaffRole } from '../../utils/render';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DateTimePickerComponent from '../Pickers/dateTime';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { StaffType } from '../../model/staff.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface ILeadsComments {
	open: boolean;
	handleClose: () => void;
	comments?: Array<LeadComment>;
	id?: string;
	number: string;
	fetchLeads?: () => void;
	updateLeadComment?: (lead: ILead) => void;
}

export default function LeadsComments({
	open,
	handleClose,
	id,
	comments,
	number,
	fetchLeads,
	updateLeadComment,
}: ILeadsComments) {
	const descriptionElementRef = React.useRef<HTMLElement>(null);
	const { user } = useTypedSelector((state) => state.auth);
	const [message, setMessage] = useState('');
	const [date, setDate] = useState<null | Date>(new Date());
	const [reschdule, setReschdule] = useState(false);
	const [loading, setLoading] = useState(false);

	const manageReschdule = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReschdule(event.target.checked);
	};

	const manageDate = (value: Date | null) => {
		setDate(value);
	};
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
		const info: UpdateLeadData = { message, number };
		if (reschdule) {
			info['reschedule'] = date;
		} else {
			info['reschedule'] = undefined;
		}
		try {
			setLoading(true);
			const newLead = await asyncUpdateLead(id, info);
			setLoading(false);
			if (fetchLeads) {
				fetchLeads();
			}
			if (updateLeadComment) {
				updateLeadComment(newLead);
			}
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
													<b>
														{renderStaffRole(
															c.from.type
														)}
													</b>{' '}
													<br />
													<Typography
														component="span"
														variant="caption"
														color="textPrimary"
													>
														{/* {parseDate(c.date)} */}
														Loading Time ...
													</Typography>{' '}
													<br />
													{user &&
														(user.id ===
															c.from.id ||
															user.type ===
																StaffType.GM) &&
														c.reschedule && (
															<Typography variant="caption">
																Reschedule on{' '}
																<b>
																	{parseDate(
																		c.reschedule
																	)}
																</b>{' '}
															</Typography>
														)}
													<Box p="0.3rem">
														<Divider />
													</Box>
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
				<Box pl="1rem">
					<FormControlLabel
						control={
							<Switch
								checked={reschdule}
								onChange={manageReschdule}
								name="checkedB"
								color="primary"
							/>
						}
						label="Reschedule"
					/>
				</Box>
				{reschdule && (
					<Box p="1rem">
						<DateTimePickerComponent
							label="Choose reschedule date and time"
							handleDateChange={manageDate}
							date={date}
						/>
					</Box>
				)}

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
