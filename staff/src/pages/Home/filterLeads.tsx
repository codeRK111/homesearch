import { Box, Chip, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import { City } from '../../model/city.interface';
import LeadsTab from '../../components/Tab/leadFilter';
import SearchCity from '../../components/Search/city';

interface IFilterLeads {
	setTimeInterval: (value: string) => void;
	city: City | null;
	setCity: (val: City | null) => void;
	number: string;
	setNumber: (val: string) => void;
	removeTags: (val: number) => void;
	addTags: (val: string) => void;
	tags: string[];
}
const FilterLeads = ({
	setTimeInterval,
	city,
	setCity,
	number,
	setNumber,
	addTags,
	removeTags,
	tags,
}: IFilterLeads) => {
	const [tagText, setTagText] = useState('');
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
					<Grid item xs={12} md={4}>
						<TextField
							label="Search by tag name"
							variant="filled"
							size="small"
							fullWidth
							value={tagText}
							onChange={(e) => setTagText(e.target.value)}
							onKeyUp={(e) => {
								if (tagText && e.key === 'Enter') {
									addTags(tagText);
									setTagText('');
								}
							}}
						/>
						<Box>
							{tags.map((c, i) => (
								<Chip
									label={c}
									onDelete={() => removeTags(i)}
									variant="outlined"
									key={i}
								/>
							))}
						</Box>
					</Grid>
				</Grid>
			</Box>
			<LeadsTab setTimeInterval={setTimeInterval} />
		</Box>
	);
};

export default FilterLeads;
