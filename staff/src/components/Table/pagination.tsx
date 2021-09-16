import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

interface ITablePagination {
	limit: number;
	setLimit: (value: number) => void;
	page: number;
	setPage: (event: React.ChangeEvent<unknown>, page: number) => void;
	totalDocs: number;
	title?: string;
	pages?: number[];
}

const TablePagination: React.FC<ITablePagination> = ({
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
					onChange={(e) => setLimit(e.target.value as number)}
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

export default TablePagination;
