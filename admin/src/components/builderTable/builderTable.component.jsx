import { Avatar, CircularProgress } from '@material-ui/core';

import BuilderStatusSwitch from './statusSwitch.component';
import { Link } from 'react-router-dom';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { renderBuilderImage } from '../../utils/path';

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

function BuildersTable({ builders, loading }) {
	const classes = useStyles();

	const progress = <CircularProgress size={20} color="inherit" />;

	const loader = (
		<TableRow>
			{Array.from({ length: 8 }, (index) => index + 1).map((_, i) => (
				<TableCell key={i}>{progress}</TableCell>
			))}
		</TableRow>
	);

	return (
		<React.Fragment>
			<div className={classes.tableWrapper}>
				{/* <p className={classes.colorRed}>{error}</p> */}
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
								Logo
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Developer Name
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Number
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Email
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Office address
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Operating since
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Status
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Update
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading
							? loader
							: builders.map((c, i) => (
									<TableRow key={i}>
										<TableCell>{i + 1}</TableCell>
										<TableCell>
											{renderBuilderImage(c.logo) ? (
												<Avatar
													src={renderBuilderImage(
														c.logo
													)}
													alt="Builder Logo"
												/>
											) : (
												'-'
											)}
										</TableCell>
										<TableCell>{c.developerName}</TableCell>
										<TableCell>{c.phoneNumber}</TableCell>
										<TableCell>{c.email}</TableCell>

										<TableCell>{c.officeAddress}</TableCell>
										<TableCell>
											<span>
												{moment(
													c.operatingSince
												).format('YYYY-MM-DD')}
											</span>
										</TableCell>
										<TableCell>
											<BuilderStatusSwitch
												id={c.id}
												adminStatus={c.status}
											/>
										</TableCell>

										<TableCell align="center">
											<Link to={`/edit-builder/${c.id}`}>
												Edit
											</Link>
										</TableCell>
									</TableRow>
							  ))}
					</TableBody>
				</Table>
			</div>
		</React.Fragment>
	);
}

export default BuildersTable;
