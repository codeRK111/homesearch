import React, {useCallback, useEffect, useRef, useState} from 'react';
import {leadStyle} from "./leads.style";
import ErrorCard from '../../components/errorCard';
import TablePagination from '../builders/pagination.component';
import axios from 'axios';
import {getAllLeads} from "../../utils/asyncLead";
import {withAsync} from "../../hoc/withAsync";
import LeadsTable from "../../components/tables/leads.component";
import LeadsStatusFilter from "./statusFilter";
import Box from '@material-ui/core/Box';

const LeadsPage = ({
					   loading,
					   setLoading,
					   error,
					   setError
				   }) => {
	// Style
	const style = leadStyle();

	// Async Token
	const cancelToken = useRef(null);

	// State
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState('active');
	const [attended, setAttended] = useState(false);
	const [limit, setLimit] = useState(10);
	const [selectedLeads, setSelectedLeads] = useState([]);
	const [data, setData] = useState({
		totalDocs: 0,
		leads: []
	});

	// Callback
	const handlePage = (_, pageNumber) => {
		setPage(pageNumber);
	};

	const manageSelectedLeads = (lead) => {
		if (selectedLeads.includes(lead)) {
			setSelectedLeads(prevState => prevState.filter(c => c !== lead));
		} else {
			setSelectedLeads(prevState => [...prevState, lead]);
		}
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = {
				page,
				limit,
				status,
				attended
			};

			const resp = await getAllLeads(
				filter,
				cancelToken.current,
				setLoading
			);
			setData(resp);
			setError(null);
		} catch (error) {
			setError(error);
			setData({
				totalDocs: 0,
				leads: []
			});
		}
	}, [page, attended, limit, status, setError, setLoading]);

	// Effects

	/* Reset page after filter change */
	useEffect(() => {
		setPage(1);
	}, [limit, status, attended]);

	/* Fetch join requests */
	useEffect(() => {
		fetchLeads();

		// Cancel request on unmount
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchLeads]);
	return (
		<div className={style.wrapper}>
			<h1>Leads</h1>
			{error && <ErrorCard error={error}/>}
			<p>
				<b>{data.totalDocs}</b> leads found
			</p>
			<Box mb={"1rem"}>
				<LeadsStatusFilter status={status} setStatus={setStatus} attended={attended} setAttended={setAttended}
				/>
			</Box>
			<LeadsTable loading={loading} leads={data.leads} selectedLeads={selectedLeads}
						manageSelectedLeads={manageSelectedLeads}/>

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


export default withAsync(LeadsPage);