import { makeStyles, withStyles } from '@material-ui/core/styles';

import AgentActions from '../agentAction';
import { Box } from '@material-ui/core';
import { DOMAIN_NAME } from '../../utils/staticData';
import Paper from '@material-ui/core/Paper';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { capitalizeFirstLetter } from '../../pages/addProperty/hostel.component';
import moment from 'moment';
import { renderPropertyTypes } from '../../utils/render.utils';

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY, h:mm:ss a');
};
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

function AgentQueriesTable({ queries, fetchQueries }) {
	const [allQueries, setAllQueries] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState({
		id: null,
		title: '',
		action: [],
	});

	const handleClose = () => {
		setOpen(false);
		fetchQueries();
	};
	React.useEffect(() => {
		setAllQueries(queries);
	}, [queries]);

	const onActionClick = (data) => (_) => {
		setSelectedRow({
			...data,
			title: renderTitle(data),
		});
		setOpen(true);
	};

	const classes = useStyles();
	const renderTitle = (data) => {
		switch (data.type) {
			case 'property':
				return data.property.title;
			case 'project':
				return (
					<a
						href={`${DOMAIN_NAME}/project-details/${data.project.id}`}
						target="_blank"
					>
						{data.project.title}
					</a>
				);
			case 'projectproperty':
				return data.projectProperty.title;

			default:
				break;
		}
	};

	// useEffect(() => {
	// 	if (!open) {
	// 		fetchQueries();
	// 	}
	// }, [open, fetchQueries]);

	return (
		<Box>
			<AgentActions
				open={open}
				handleClose={handleClose}
				id={selectedRow.id}
				title={selectedRow.title}
				actions={selectedRow.action}
				fetchQueries={fetchQueries}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Agent</StyledTableCell>
							<StyledTableCell>Property</StyledTableCell>
							<StyledTableCell>Property For</StyledTableCell>
							<StyledTableCell>Property Type</StyledTableCell>
							<StyledTableCell>Query For</StyledTableCell>
							<StyledTableCell>User</StyledTableCell>
							<StyledTableCell>Number</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Created</StyledTableCell>
							<StyledTableCell align="center">
								Actions
							</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{allQueries.map((row, i) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell>{i + 1}</StyledTableCell>
								<StyledTableCell>
									{row.agent.name}
								</StyledTableCell>
								<StyledTableCell>
									{renderTitle(row)}
								</StyledTableCell>
								<StyledTableCell>
									{capitalizeFirstLetter(row.type)}
								</StyledTableCell>
								<StyledTableCell>
									{renderPropertyTypes(row.pType)}
								</StyledTableCell>
								<StyledTableCell>
									{row.queryType}
								</StyledTableCell>
								<StyledTableCell>
									{row.user.name}
								</StyledTableCell>
								<StyledTableCell>
									{row.user.number}
								</StyledTableCell>
								<StyledTableCell>
									{row.user.email}
								</StyledTableCell>
								<StyledTableCell>
									{parseDate(row.createdAt)}
								</StyledTableCell>
								<StyledTableCell>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="space-around"
									>
										<Tooltip title="View">
											<Box
												className="pointer"
												onClick={onActionClick(row)}
											>
												<QuestionAnswerIcon size="small" />
											</Box>
										</Tooltip>
									</Box>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default AgentQueriesTable;
