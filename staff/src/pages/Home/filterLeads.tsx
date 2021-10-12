import { Box, Grid, TextField } from '@material-ui/core';

import { City } from '../../model/city.interface';
import LeadsTab from '../../components/Tab/leadFilter';
import React from 'react';
import SearchCity from '../../components/Search/city';

interface IFilterLeads {
	setTimeInterval: (value: string) => void;
	city: City | null;
	setCity: (val: City | null) => void;
	number: string;
	setNumber: (val: string) => void;
}
const FilterLeads = ({
	setTimeInterval,
	city,
	setCity,
	number,
	setNumber,
}: IFilterLeads) => {
	return (
		<Box width="100%">
			<Box mb="1rem" mt="1rem">
				<Grid container spacing={1} justifyContent="center">
					<Grid item xs={12} md={4}>
						<SearchCity
							label="Filter By City"
							value={city}
							onSelect={(val) => {
								setCity(val);
							}}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							label="Filter By Number"
							variant="filled"
							size="small"
							fullWidth
							value={number}
							onChange={(e) => {
								setNumber(e.target.value);
							}}
						/>
					</Grid>
				</Grid>
			</Box>
			<LeadsTab setTimeInterval={setTimeInterval} />
		</Box>
	);
};

export default FilterLeads;
