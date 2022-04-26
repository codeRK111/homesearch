import {
	Box,
	Chip,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

import { City } from '../../model/city.interface';
import { CommentStatus } from '../../model/lead.interface';
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
	status: string | CommentStatus;
	setStatus: (status: string | CommentStatus) => void;
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
	status,
	setStatus,
}: IFilterLeads) => {
	const [tagText, setTagText] = useState('');

	const handleChangeStatus = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setStatus(event.target.value as CommentStatus);
	};
	return (
		<Box width="100%">
			<Box mb="1rem" mt="1rem">
				<Grid container spacing={1} justifyContent="center">
					<Grid item xs={12} md={3}>
						<SearchCity
							label="Filter By City"
							value={city}
							onSelect={(val) => {
								setCity(val);
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
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
					<Grid item xs={12} md={3}>
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-label">
								Select Comment Status
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={status}
								onChange={handleChangeStatus}
								variant="filled"
							>
								<MenuItem value={''}>All</MenuItem>
								<MenuItem value={CommentStatus.Busy}>
									Busy
								</MenuItem>
								<MenuItem value={CommentStatus.CallNotReceived}>
									Call Not Received
								</MenuItem>
								<MenuItem value={CommentStatus.Inerested}>
									Inerested
								</MenuItem>
								<MenuItem value={CommentStatus.NotInService}>
									Not In Service
								</MenuItem>
								<MenuItem value={CommentStatus.NotInterested}>
									Not Interested
								</MenuItem>
								<MenuItem value={CommentStatus.SwitchOff}>
									Switch Off
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={3}>
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
