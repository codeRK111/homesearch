import {
	Box,
	Container,
	FormControlLabel,
	Grid,
	Switch,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { SearchAllResponse, searchAll } from '../../../API/lead';

import { City } from '../../../model/city.interface';
import { Location } from '../../../model/location.interface';
import MyPostedLeadsTable from '../../../components/Table/leads/myLeads';
import PropertyLeadsTable from '../../../components/Table/leads/propertyLead';
import SideBar from './sidebar';
import Tab from '../tab';
import TablePagination from '../../../components/Table/pagination';

const SearchProperty = () => {
	// State
	const [loading, setLoading] = useState(false);
	const [myData, setMyData] = useState(false);
	const [tab, setTab] = useState(0);
	const [city, setCity] = useState<City | null>(null);
	const [leadsPage, setLeadsPage] = useState(1);
	const [leadsLimit, setLeadsLimit] = useState(10);
	const [salesPage, setSalesPage] = useState(1);
	const [salesLimit, setSalesLimit] = useState(10);
	const [pFor, setPFor] = useState('');
	const [createdBy, setCreatedBy] = useState('');
	const [facing, setFacing] = useState('');
	const [location, setLoaction] = useState<Location | null>(null);
	const [propertyRequirements, setPropertyRequirements] = useState<string[]>(
		[]
	);
	const [availableFor, setAvailableFor] = useState<string[]>([]);
	const [data, setData] = useState<SearchAllResponse>({
		leads: [],
		sales: [],
		totalLeadDocs: 0,
		totalSalesDocs: 0,
	});

	const handleLeadsPage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setLeadsPage(pageNumber);
	};
	const handleSalesPage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setSalesPage(pageNumber);
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMyData(event.target.checked);
	};

	const fetchProperties = useCallback(async () => {
		const filter: any = {
			leadsPage,
			leadsLimit,
			salesPage,
			salesLimit,
			myData,
		};
		if (city) {
			filter.city = city.id;
		}
		if (createdBy) {
			filter.createdBy = createdBy;
		}
		if (location) {
			filter.location = location.id;
			filter.locationName = location.name;
		}
		if (pFor) {
			filter.for = pFor;
		}
		if (facing) {
			filter.facing = facing;
		}
		if (propertyRequirements.length > 0) {
			filter.propertyRequirements = propertyRequirements;
		}
		if (availableFor.length > 0) {
			filter.availableFor = availableFor;
		}

		try {
			setLoading(true);
			const resp = await searchAll(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}, [
		city,
		pFor,
		facing,
		propertyRequirements,
		availableFor,
		leadsPage,
		leadsLimit,
		salesPage,
		salesLimit,
		location,
		myData,
		createdBy,
	]);

	useEffect(() => {
		fetchProperties();
	}, [fetchProperties]);

	useEffect(() => {
		setLeadsPage(1);
		setSalesPage(1);
	}, [
		city,
		pFor,
		facing,
		propertyRequirements,
		availableFor,
		leadsLimit,
		salesLimit,
		location,
		myData,
		createdBy,
	]);

	const sidebarProps = {
		city,
		setCity,
		pFor,
		setPFor,
		facing,
		setFacing,
		location,
		setLoaction,
		propertyRequirements,
		setPropertyRequirements,
		availableFor,
		setAvailableFor,
		myData,
		createdBy,
		setCreatedBy,
	};
	return (
		<Container maxWidth="xl">
			<Box mt="1rem">
				<Typography variant="h5" gutterBottom>
					Search Property
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} md={3}>
						<SideBar {...sidebarProps} />
					</Grid>
					<Grid item xs={12} md={9}>
						<Box>
							<FormControlLabel
								control={
									<Switch
										checked={myData}
										onChange={handleChange}
										name="checkedA"
									/>
								}
								label="My Posted Data"
							/>
						</Box>

						<Tab value={tab} setValue={setTab} />
						{tab === 0 && (
							<Box mt="1rem">
								<MyPostedLeadsTable
									loading={loading}
									leads={data.leads}
								/>
								<TablePagination
									limit={leadsLimit}
									setLimit={setLeadsLimit}
									page={leadsPage}
									setPage={handleLeadsPage}
									totalDocs={data.totalLeadDocs}
								/>
							</Box>
						)}
						{tab === 1 && (
							<Box mt="1rem">
								<PropertyLeadsTable
									loading={loading}
									leads={data.sales}
								/>
								<TablePagination
									limit={salesLimit}
									setLimit={setSalesLimit}
									page={leadsPage}
									setPage={handleSalesPage}
									totalDocs={data.totalSalesDocs}
								/>
							</Box>
						)}
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default SearchProperty;
