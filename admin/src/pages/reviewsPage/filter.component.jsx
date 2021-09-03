import {
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';

import React from 'react';
import SearchProjectByName from '../../components/search/project.component';
import SearchPropertyByName from '../../components/search/properties.component';

const FilterReviews = ({
	propertyItemType,
	setPropertyItemType,
	status,
	setStatus,
	top,
	setTop,
	project,
	setProject,
	property,
	setProperty,
	pFor,
}) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={3}>
				{pFor === 'project' ? (
					<SearchProjectByName
						value={project}
						onSelect={setProject}
						padding={false}
					/>
				) : (
					<SearchPropertyByName
						value={property}
						onSelect={setProperty}
						padding={false}
					/>
				)}
			</Grid>
			<Grid item xs={12} md={3}>
				<FormControl variant="filled" fullWidth>
					<InputLabel id="demo-simple-select-filled-label">
						Property Type
					</InputLabel>
					<Select
						labelId="demo-simple-select-filled-label"
						id="demo-simple-select-filled"
						value={propertyItemType}
						onChange={(e) => setPropertyItemType(e.target.value)}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'flat'}>Apartment</MenuItem>
						<MenuItem value={'independenthouse'}>Villa</MenuItem>
						<MenuItem value={'land'}>Land</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={3}>
				<FormControl variant="filled" fullWidth>
					<InputLabel id="demo-simple-select-filled-label">
						Status
					</InputLabel>
					<Select
						labelId="demo-simple-select-filled-label"
						id="demo-simple-select-filled"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
						<MenuItem value={'active'}>Active</MenuItem>
						<MenuItem value={'inactive'}>Inactive</MenuItem>
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} md={3}>
				<FormControlLabel
					control={
						<Checkbox
							checked={top}
							onChange={(e) => setTop(e.target.checked)}
							name="checkedA"
						/>
					}
					label="Top Reviews"
				/>
			</Grid>
		</Grid>
	);
};

export default FilterReviews;
