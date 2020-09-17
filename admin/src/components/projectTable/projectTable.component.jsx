import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CustomSelect from './selectBuilder.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectProjects,
	selectFetchProjectsLoading as fetchProjectsLoading,
} from '../../redux/project/project.selector';
import { fetchProjects } from '../../redux/project/project.action';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';

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

const types = {
	flat: 'Flat',
	land: 'Land',
	independenthouse: 'Independent House',
};

const menuItems = [
	{
		label: '2',
		value: 2,
	},
	{
		label: '3',
		value: 3,
	},
];

function Orders({
	fetchProjects,
	loading,
	match: { params },
	allProjects = [],
}) {
	const [page, setPage] = React.useState(0);
	const [count, setCount] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	console.log(allProjects);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleProjects = (status, data = null) => {
		console.log(status);
		console.log(data);
		if (status === 'success') {
			setCount(data);
		}
	};
	React.useEffect(() => {
		fetchProjects(handleProjects, {
			status: params.status,
			page: page + 1,
			limit: rowsPerPage,
		});
	}, [fetchProjects, params.status, page, rowsPerPage]);

	const classes = useStyles();

	return (
		<React.Fragment>
			<Backdrop
				className={classes.backdrop}
				open={loading}
				// onClick={handleClose}
			>
				loading...
			</Backdrop>

			<div className={classes.tableWrapper}>
				{/* <p className={classes.colorRed}>{error}</p> */}
				<Box mb="1rem">
					<TablePagination
						component="div"
						count={count}
						page={page}
						rowsPerPageOptions={[2, 5, 10, 20, 40, 50]}
						labelRowsPerPage={'Properties per page'}
						onChangePage={handleChangePage}
						rowsPerPage={rowsPerPage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						classes={{
							root: classes.noSpace,
						}}
					/>
				</Box>
				<Box mb="0.5rem">
					{count ? <b>{count} results found</b> : ''}
				</Box>
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
								Title
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Description
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
							<TableCell style={{ color: '#ffffff' }}>
								Status
							</TableCell>
							<TableCell
								align="right"
								style={{ color: '#ffffff' }}
							>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{allProjects.map((c, i) => (
							<TableRow key={i}>
								<TableCell>{i + 1}</TableCell>
								<TableCell>{c.title}</TableCell>
								<TableCell>{c.description}</TableCell>
								<TableCell>{c.projectType}</TableCell>
								<TableCell>{c.complitionStatus}</TableCell>
								<TableCell>{c.city.name}</TableCell>
								<TableCell>{c.builder.developerName}</TableCell>
								<TableCell>{c.location.name}</TableCell>
								<TableCell>
									<span>
										{moment(c.createdAt).format(
											'YYYY-MM-DD'
										)}
									</span>
								</TableCell>
								<TableCell>
									{c.status}
									{/* <CustomSelect
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
									/> */}
								</TableCell>

								<TableCell align="right">
									{/* <Link to={`/edit-builder/${c.id}`}>
										Edit
									</Link> */}
									Not ready yet
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className={classes.seeMore}>
				<Link color="primary" href="#" onClick={preventDefault}>
					{/* See more orders */}
				</Link>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = createStructuredSelector({
	allProjects: selectProjects,
	loading: fetchProjectsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProjects: (callback, param) =>
		dispatch(fetchProjects({ callback, param })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
