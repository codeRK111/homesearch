import {
	Avatar,
	Box,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	TableCell,
	Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { City } from '../../../model/city.interface';
import { ILead } from '../../../model/lead.interface';
import { IStaff } from '../../../model/staff.interface';
import {
	parseDate,
	renderCellData,
	renderLeadStage,
} from '../../../utils/render';
import { UpdateLeadDialog } from '../../Dialogs/updateLead';
import { AddLeadComment } from '../../Forms/add-lead-comment';
import { CollapsableRow } from '../collapsable-row';
import AssignStaff from './assign-lead';
import ChangeLeadStatus from './change-lead-status';
import { LeadAssignComponent } from './leads-assigns';
import { LeadsReschedules } from './leads-reschedules';
import { LeadStatus } from './leads-status';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 12,
	},
	body: {
		fontSize: 13,
		verticalAlign: 'top',
	},
}))(TableCell);

interface ILeadRow {
	data: ILead;
	selectedId: string;
	id: string;
	setSelectedId: (id: string) => void;
	staffs: IStaff[];
}
export const LeadRow: React.FC<ILeadRow> = ({
	data,
	selectedId,
	id,
	setSelectedId,
	staffs,
}) => {
	const [row, setRow] = useState<null | ILead>(null);
	const [editOpen, setEditOpen] = useState(false);

	useEffect(() => {
		if (data) {
			setRow(data);
		}
	}, [data]);

	const onSuccess = (lead: ILead) => {
		if (lead) {
			setRow(lead);
		}
	};
	return (
		<>
			{row && (
				<UpdateLeadDialog
					open={editOpen}
					setOpen={setEditOpen}
					id={row.id as string}
					onSuccess={onSuccess}
				/>
			)}
			{row && (
				<CollapsableRow
					id={id}
					selectedId={selectedId}
					setSelectedId={setSelectedId}
					element={
						<>
							<StyledTableCell>
								<IconButton
									size="small"
									onClick={() => setEditOpen(true)}
								>
									<EditIcon />
								</IconButton>
								<LeadsReschedules
									reschedules={row.reschedules}
								/>
							</StyledTableCell>

							<StyledTableCell>
								{row.tags && (
									<Box mt="0.3rem">
										{row.tags.map((c, i) => (
											<Typography
												key={i}
												gutterBottom
												variant="caption"
												display="block"
											>
												<b>{c}</b>
											</Typography>
										))}
									</Box>
								)}
							</StyledTableCell>

							<StyledTableCell>
								<b>Name: </b>
								{row.name ? row.name : '-'} <br />
								<b>Email: </b>
								{row.email ? row.email : '-'} <br />
								<b>Phone: </b> {row.number} <br />
								<b>City: </b>{' '}
								{row.city ? (row.city as City).name : '-'}{' '}
								<br />
								<b>Location: </b> {row.preferedLocation}
								<br />
								<b>Category: </b>{' '}
								{renderCellData(row.userCategory)}
								<br />
								<b>Requirement: </b>{' '}
								{renderCellData(row.requirement)}
								<br />
								<b>Requirement Type: </b>{' '}
								{renderCellData(row.category)}
								<br />
								<b>Property Type: </b>{' '}
								{renderCellData(row.pType)}
								<br />
								{row.propertyRequirements && (
									<Box>
										{row.propertyRequirements.map(
											(c, i) => (
												<Chip key={i} label={c} />
											)
										)}
									</Box>
								)}
								{renderCellData(row.minPrice)} to{' '}
								{renderCellData(row.maxPrice)}
							</StyledTableCell>

							<StyledTableCell>
								<b>Created At: </b>
								{parseDate(row.createdAt as Date)} <br />
								<b>Posted By: </b>
								{row.createdBy?.name} <br />
								<b>Stage: </b>
								{renderLeadStage(row)} <br />
							</StyledTableCell>

							<StyledTableCell>
								<AssignStaff
									id={row.id as string}
									staffs={staffs}
									onSuccess={onSuccess}
								/>
								<Box>
									<LeadAssignComponent
										assigns={row.assigns}
									/>
								</Box>
							</StyledTableCell>
							<StyledTableCell>
								<ChangeLeadStatus
									id={row.id as string}
									onSuccess={onSuccess}
								/>
								<Box>
									<LeadStatus statuses={row.leadStatus} />
								</Box>
							</StyledTableCell>

							{/* <StyledTableCell>
									<SendProposal lead={row} />
								</StyledTableCell> */}
						</>
					}
				>
					<Typography gutterBottom>
						<b>Comments:</b>
					</Typography>

					<AddLeadComment
						id={row.id as string}
						onSuccess={onSuccess}
					/>

					<Box
						style={{
							maxHeight: 300,
							overflow: 'auto',
						}}
					>
						<List>
							{!!row.comments?.length ? (
								row.comments?.map((c) => (
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
														variant="body2"
														color="textPrimary"
													>
														{parseDate(c.date)} -
													</Typography>
													{c.message}
												</React.Fragment>
											}
										/>
									</ListItem>
								))
							) : (
								<Typography>No Comments found</Typography>
							)}
						</List>
					</Box>
				</CollapsableRow>
			)}
		</>
	);
};
