import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import { BrowseLeadInputType, asyncBrowseLeads } from '../../API/lead';
import React, { useCallback, useEffect, useState } from 'react';

import { City } from '../../model/city.interface';
import { FetchMyLeadsResponseData } from '../../model/lead.interface';
import MyPostedLeadsTable from '../../components/Table/leads/myLeads';
import SearchCity from '../../components/Search/city';
import TablePagination from '../../components/Table/pagination';

const BrowsePropertiesPage = () => {
	// State
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [city, setCity] = useState<City | null>(null);
	const [location, setLoaction] = useState('');
	const [propertyRequirements, setPropertyRequirements] = useState<string[]>(
		[]
	);
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		leads: [],
		totalDocs: 0,
	});

	// Callback
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setPropertyRequirements([
				...propertyRequirements,
				event.target.value,
			]);
		} else {
			setPropertyRequirements((prevState) =>
				prevState.filter((c) => c !== event.target.value)
			);
		}
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: BrowseLeadInputType = { page, limit };

			if (city) {
				filter.city = city.id;
			}
			if (location) {
				filter.location = location;
			}
			if (propertyRequirements.length > 0) {
				filter.propertyRequirements = propertyRequirements;
			}
			const resp = await asyncBrowseLeads(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				leads: [],
			});
			setLoading(false);
		}
	}, [page, limit, city, location, propertyRequirements]);

	const manageLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoaction(e.target.value);
	};

	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	return (
		<Container>
			<Box mt="1rem">
				<Typography variant="h5" gutterBottom>
					Browse Properties
				</Typography>
				<Grid container spacing={3} justifyContent="center">
					<Grid item xs={12} md={6}>
						<SearchCity
							label="Search By City"
							onSelect={(value: City | null) => {
								setCity(value);
							}}
							value={city}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							variant="filled"
							label="Search By Location"
							fullWidth
							size="small"
							value={location}
							onChange={manageLocation}
						/>
					</Grid>
					<Grid item xs={12} md={7}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										value={'Flat'}
										checked={propertyRequirements.includes(
											'Flat'
										)}
										onChange={handleChange}
									/>
								}
								label="Flat"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'Duplex'}
										checked={propertyRequirements.includes(
											'Duplex'
										)}
										onChange={handleChange}
									/>
								}
								label="Duplex"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'1BHK'}
										checked={propertyRequirements.includes(
											'1BHK'
										)}
										onChange={handleChange}
									/>
								}
								label="1BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'2BHK'}
										checked={propertyRequirements.includes(
											'2BHK'
										)}
										onChange={handleChange}
									/>
								}
								label="2BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'3BHK'}
										checked={propertyRequirements.includes(
											'3BHK'
										)}
										onChange={handleChange}
									/>
								}
								label="3BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'4BHK'}
										checked={propertyRequirements.includes(
											'4BHK'
										)}
										onChange={handleChange}
									/>
								}
								label="4BHK"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={'Fully Furnished'}
										checked={propertyRequirements.includes(
											'Fully Furnished'
										)}
										onChange={handleChange}
									/>
								}
								label="Fully Furnished"
							/>
						</FormGroup>
					</Grid>
				</Grid>
				<Box mt="1rem">
					<MyPostedLeadsTable loading={loading} leads={data.leads} />
					<TablePagination
						limit={limit}
						setLimit={setLimit}
						page={page}
						setPage={handlePage}
						totalDocs={data.totalDocs}
					/>
				</Box>
			</Box>
		</Container>
	);
};

export default BrowsePropertiesPage;
