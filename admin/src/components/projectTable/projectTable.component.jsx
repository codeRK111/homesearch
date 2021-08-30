import { Link, useHistory, withRouter } from 'react-router-dom';
import { hsiID, renderPropertyTypes } from '../../utils/render.utils';

import Box from '@material-ui/core/Box';
import CustomSelect from './selectBuilder.component';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import renderByRole from '../roleRender/roleRender.component';

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
	noSpace: {
		padding: 0,
		margin: 0,
	},
}));

function Orders({ projects, fetchProjects }) {
	const history = useHistory();

	const onActionClick = (data) => (_) => {
		history.push(`/add-agent/${data.id}`);
	};

	const classes = useStyles();

	const StatusHeadingNode = renderByRole(
		<TableCell style={{ color: '#ffffff' }}>Status</TableCell>,
		[
			{
				type: 'propertyActions',
				value: 'status',
			},
		]
	);
	const UpdateHeadingNode = renderByRole(
		<TableCell align="right" style={{ color: '#ffffff' }}>
			Action
		</TableCell>,
		[
			{
				type: 'propertyActions',
				value: 'update',
			},
		]
	);

	const renderStatusDataNode = (c) => {
		const Comp = renderByRole(
			<TableCell>
				{/* {c.status} */}
				<CustomSelect
					fetchProjects={fetchProjects}
					value={c.status}
					builderId={c.id}
					items={[
						{
							label: 'active',
							value: 'active',
						},
						{
							label: 'inactive',
							value: 'inactive',
						},
					]}
				/>
			</TableCell>,
			[
				{
					type: 'propertyActions',
					value: 'status',
				},
			]
		);
		return <Comp />;
	};
	const renderActionDataNode = (c) => {
		const Comp = renderByRole(
			<TableCell align="right">
				<Link to={`/edit-projects/${c.id}`}>Edit</Link>
			</TableCell>,
			[
				{
					type: 'propertyActions',
					value: 'update',
				},
			]
		);
		return <Comp />;
	};

	return (
		<React.Fragment>
			<div className={classes.tableWrapper}>
				<Table size="medium">
					<TableHead>
						<TableRow
							style={{
								backgroundColor: '#34495e',
							}}
						>
							<TableCell style={{ color: '#ffffff' }}>
								Project ID
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Title
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Builder
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Type
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Complition Status
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								City
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Location
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Builder
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Created At
							</TableCell>
							<StatusHeadingNode />
							<UpdateHeadingNode />
							<TableCell style={{ color: '#ffffff' }}>
								Manage Staffs
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{projects.map((c, i) => (
							<TableRow key={i}>
								<TableCell>{hsiID(c.docNumber)}</TableCell>
								<TableCell>{c.title}</TableCell>
								<TableCell>{c.builder.developerName}</TableCell>
								<TableCell>
									{renderPropertyTypes(c.projectType)}
								</TableCell>
								<TableCell>{c.complitionStatus}</TableCell>
								<TableCell>{c.city.name}</TableCell>
								<TableCell>{c.location.name}</TableCell>
								<TableCell>{c.builder.developerName}</TableCell>
								<TableCell>
									<span>
										{moment(c.createdAt).format(
											'YYYY-MM-DD'
										)}
									</span>
								</TableCell>
								{renderStatusDataNode(c)}
								{renderActionDataNode(c)}
								<TableCell>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="space-around"
									>
										<Tooltip title="View">
											<Box
												className="pointer"
												onClick={onActionClick(c)}
											>
												<GroupIcon size="small" />
											</Box>
										</Tooltip>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</React.Fragment>
	);
}

export default withRouter(Orders);
