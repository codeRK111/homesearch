import { Box, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import AddSpeciality from './addSpeciality.component';
import Pagination from '@material-ui/lab/Pagination';
import ProjectSpecialitiesTable from '../../components/specialityTable';
import axios from 'axios';
import { getProjectSpecialities } from '../../utils/asyncFunctions';
import { useCancelAxios } from '../../hooks/useCancel';

const ProjectSpeciality = ({ toggleLoader }) => {
	const cancelToken = React.useRef(undefined);
	const [data, setData] = useState({
		specialities: [],
		totalDocs: 0,
	});
	const [page, setPage] = React.useState(1);
	const [limit, setLimit] = React.useState(5);
	useCancelAxios(cancelToken.current);
	const handleChange = (event, value) => {
		setPage(value);
	};
	const fetchData = () => {
		cancelToken.current = axios.CancelToken.source();
		getProjectSpecialities(cancelToken.current, toggleLoader, {
			page,
			limit,
		})
			.then((resp) => {
				console.log({ resp });
				setData(resp);
			})
			.catch((err) => {
				console.log({ err });
			});
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit]);

	return (
		<Box p="1rem">
			<AddSpeciality toggleLoader={toggleLoader} fetchData={fetchData} />
			<h3>All Specialities</h3>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb="1rem"
			>
				<p>
					{' '}
					<b>{data.totalDocs}</b> specialities found{' '}
				</p>
				<TextField
					id="outlined-number"
					label="Queries per page"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					variant="filled"
					value={limit}
					onChange={(e) => setLimit(e.target.value)}
				/>
			</Box>
			<ProjectSpecialitiesTable
				specialities={data.specialities}
				fetchData={fetchData}
			/>
			<Box mt="1rem" display="flex" justifyContent="center">
				<Pagination
					count={Math.ceil(data.totalDocs / limit)}
					page={page}
					onChange={handleChange}
					color="primary"
				/>
			</Box>
		</Box>
	);
};

export default ProjectSpeciality;
