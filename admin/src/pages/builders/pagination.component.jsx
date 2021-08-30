import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import React from 'react';

const TablePagination = ({
	limit,
	setLimit,
	page,
	setPage,
	totalDocs,
	title = 'Results per page',
	pages = [5, 10, 20, 30, 50],
}) => {
	return (
		<Box
			mt="1rem"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<FormControl variant="filled" style={{ width: 150 }}>
				<InputLabel id="demo-simple-select-filled-label">
					{title}
				</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={limit}
					onChange={(e) => setLimit(e.target.value)}
				>
					{pages.map((c, i) => (
						<MenuItem value={c} key={i}>
							{c}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Pagination
				count={Math.ceil(totalDocs / limit)}
				page={page}
				onChange={setPage}
				color="primary"
			/>
		</Box>
	);
};

TablePagination.propTypes = {
	limit: PropTypes.number.isRequired,
	setLimit: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	totalDocs: PropTypes.number.isRequired,
	title: PropTypes.string,
	pages: PropTypes.arrayOf(PropTypes.number),
};

export default TablePagination;
