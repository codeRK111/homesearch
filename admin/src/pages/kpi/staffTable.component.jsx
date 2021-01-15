import { useHistory, withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	table: {
		width: '100%',
	},
	header: {
		fontWeight: 'bold',
	},
});

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('John Doe', 159, 6.0, 24, 4.0),
	createData('Robert Haul', 237, 9.0, 37, 4.3),
	createData('Erik Rown', 262, 16.0, 24, 6.0),
	createData('Brad Harris', 305, 3.7, 67, 4.3),
	createData('Steve pit', 356, 16.0, 49, 3.9),
];

function BasicTable({ type }) {
	const classes = useStyles();
	const history = useHistory();

	return (
		<TableContainer>
			<Table
				className={classes.table}
				aria-label="simple table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell className={classes.header}>Name</TableCell>

						<TableCell align="right" className={classes.header}>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">
								<Link
									to={`/kpi/project-advertisement/${type}/123`}
								>
									View Details
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default withRouter(BasicTable);
