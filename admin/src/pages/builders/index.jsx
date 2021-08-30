import React, { useCallback, useEffect, useRef, useState } from 'react';

import BuildersTable from '../../components/builderTable/builderTable.component';
import FilterBuilders from './filter.component';
import TablePagination from './pagination.component';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { getAllBuilders } from '../../utils/asyncBuilder';
import useStyles from './builders.style';
import { withAsync } from '../../hoc/withAsync';

const BuildersPage = ({
	match: {
		params: { status },
	},
	loading,
	setLoading,
	error,
	setError,
}) => {
	// Styles
	const style = useStyles();

	// Cancel Token
	const source = useRef(null);

	// State
	const [filter, setFilter] = useState({
		developerName: '',
		email: '',
		phoneNumber: '',
		city: null,
	});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState({
		builders: [],
		totalDocs: 0,
	});

	// Fetch Data
	const fetchBuilders = useCallback(() => {
		source.current = axios.CancelToken.source();
		const filterData = {
			page,
			limit,
			status,
			...filter,
		};

		getAllBuilders(filterData, source.current, setLoading)
			.then((resp) => {
				setData(resp);
				setError(null);
			})
			.catch((error) => {
				setError(error);
			});
	}, [page, limit, filter, setLoading, setError, status]);

	// Callbacks
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFilter((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleCity = (city) => {
		setFilter((prevState) => ({
			...prevState,
			city,
		}));
	};
	const resetFilter = () => {
		setFilter({
			developerName: '',
			email: '',
			phoneNumber: '',
			city: null,
			status,
		});
	};

	const handlePage = (_, value) => {
		setPage(value);
	};

	useEffect(() => {
		fetchBuilders();
	}, [fetchBuilders]);
	return (
		<div className={style.wrapper}>
			<h1>Builders</h1>
			<FilterBuilders
				filter={filter}
				handleChange={handleChange}
				handleCity={handleCity}
				resetFilter={resetFilter}
			/>
			{error && (
				<Typography
					align="center"
					gutterBottom
					style={{ color: 'red' }}
				>
					{error}
				</Typography>
			)}
			{!loading && (
				<Typography gutterBottom>
					<b>{data.totalDocs} </b> builders found
				</Typography>
			)}
			<BuildersTable loading={loading} builders={data.builders} />
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</div>
	);
};

export default withAsync(BuildersPage);
