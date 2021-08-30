import { Button, Grid, TextField } from '@material-ui/core';

import React from 'react';
import SearchPlaceWithReset from '../../components/searchPlace/withReset';

const FilterBuilders = ({ filter, handleChange, handleCity, resetFilter }) => {
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} md={2}>
				<TextField
					variant="filled"
					name="developerName"
					label="Search by name"
					value={filter.developerName}
					onChange={handleChange}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<TextField
					variant="filled"
					name="email"
					label="Search by email"
					value={filter.email}
					onChange={handleChange}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<TextField
					variant="filled"
					name="phoneNumber"
					label="Search by number"
					value={filter.phoneNumber}
					onChange={handleChange}
					fullWidth
				/>
			</Grid>
			<Grid item xs={6} md={2}>
				<SearchPlaceWithReset
					type="city"
					value={filter.city}
					onSelect={(c) => {
						handleCity(c);
					}}
					padding={false}
				/>
			</Grid>
			<Grid item xs={6} md={2}>
				<Button
					variant="contained"
					fullWidth
					onClick={resetFilter}
					size="large"
				>
					Reset
				</Button>
			</Grid>
		</Grid>
	);
};

export default FilterBuilders;
