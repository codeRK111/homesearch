import { Box, CircularProgress, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Blog } from '../../model/blog.interface';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { parseDate } from '../../utils/render';
import { useHistory } from 'react-router';

// import EditIcon from '@material-ui/icons/Edit';

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

interface IBlogsTable {
	loading: boolean;
	blogs: Blog[];
}

const BlogsTable: React.FC<IBlogsTable> = ({ loading, blogs }) => {
	const classes = useStyles();
	const history = useHistory();
	// State

	const [data, setData] = useState<Array<Blog>>([]);

	// Callbacks
	const onEdit = (id: string) => () => {
		history.push(`/blogs/${id}`);
	};

	// Effects
	useEffect(() => {
		setData(blogs);
	}, [blogs]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 9 }, (_, i) => i + 1).map((c) => (
				<StyledTableCell key={c}>
					<CircularProgress size={15} color="inherit" />
				</StyledTableCell>
			))}
		</StyledTableRow>
	);

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Title</StyledTableCell>
							<StyledTableCell>Author</StyledTableCell>
							<StyledTableCell>Category</StyledTableCell>
							<StyledTableCell>Tags</StyledTableCell>
							<StyledTableCell>Views</StyledTableCell>
							<StyledTableCell>Created On</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell>Update</StyledTableCell>

							{/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
						</TableRow>
					</TableHead>

					<TableBody>
						{loading
							? Loader
							: data.map((row, i) => (
									<StyledTableRow key={row.id}>
										<StyledTableCell>
											{i + 1}
										</StyledTableCell>

										<StyledTableCell>
											{row.title ? row.title : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.author ? row.author : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.category ? row.category : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.tags
												? row.tags.join(',')
												: '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.views ? row.views : 0}
										</StyledTableCell>

										<StyledTableCell>
											{parseDate(row.createdAt)}
										</StyledTableCell>

										<StyledTableCell>
											{row.status}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												size="small"
												onClick={onEdit(
													row.id as string
												)}
											>
												<EditIcon color="primary" />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default BlogsTable;
