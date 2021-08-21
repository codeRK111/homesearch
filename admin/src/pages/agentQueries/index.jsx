// import axios from 'axios';

import { Box, FormControl, Grid, InputLabel, Select } from '@material-ui/core';
import React, { useRef } from 'react';

import useStyles from './agentQueries.style';

const AgentQueries = () => {
	const cancelToken = useRef(undefined);
	const [page, setPage] = React.useState(1);
	const [via, setVia] = React.useState('web');
	const [queryFor, setQueryFor] = React.useState('');
	const [propertyFor, setPropertyFor] = React.useState('');
	const [propertyType, setPropertyType] = React.useState('');
	const [limit, setLimit] = React.useState(10);
	const handleChange = (event, value) => {
		setPage(value);
	};
	const [data, setData] = React.useState({
		queries: [],
		totalDocs: 0,
	});
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<h1>Agent Queries</h1>
			<Box mb="2rem">
				<Grid container spacing={1}>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Query For
							</InputLabel>
							<Select
								native
								value={queryFor}
								onChange={(e) => setQueryFor(e.target.value)}
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" disabled />
								<option value={'number'}>Number</option>
								<option value={'message'}>Enquiry</option>
								<option value={'whatsapp'}>Whatsapp</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Property For
							</InputLabel>
							<Select
								native
								value={propertyFor}
								onChange={(e) => setPropertyFor(e.target.value)}
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" disabled />

								<option value={'project'}>Project</option>
								<option value={'projectProperty'}>
									Project Property
								</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Property Type
							</InputLabel>
							<Select
								native
								value={propertyType}
								onChange={(e) =>
									setPropertyType(e.target.value)
								}
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" disabled />
								<option value={'flat'}>Apartment</option>
								<option value={'independenthouse'}>
									Villa
								</option>

								<option value={'land'}>Land</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Via
							</InputLabel>
							<Select
								native
								value={via}
								onChange={(e) => setVia(e.target.value)}
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option value={'web'}>Web</option>
								<option value={'app'}>Mobile App</option>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default AgentQueries;
