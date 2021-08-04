// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import { Box, Typography } from '@material-ui/core';
import React, { useRef } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { searchPlace } from '../../utils/asyncFunctions';

export default function SearchPlace({
	label = 'Enter City Name',
	onSelect,
	type = 'city',
	city = null,
	location = null,
	error,
}) {
	const cancelToken = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [placeName, setPlaceName] = React.useState('');
	const [options, setOptions] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			cancelToken.current = axios.CancelToken.source();
			if (type === 'city') {
				searchPlace(
					{
						name: placeName,
					},
					cancelToken.current,
					setLoading
				).then((data) => {
					setOptions(data);
				});
			} else {
				searchPlace(
					{
						name: placeName,
						city: city.id,
					},
					cancelToken.current,
					setLoading,
					'location'
				).then((data) => {
					setOptions(data);
				});
			}
		}
	};

	const otherProps = {};
	if (city && type === 'city') {
		otherProps.value = city;
	}
	if (location && type === 'location') {
		otherProps.value = location;
	}

	return (
		<Box p="0.5rem">
			{error && (
				<Typography style={{ color: 'red' }} variant="caption">
					{error}
				</Typography>
			)}
			<Autocomplete
				id="asynchronous-demo"
				style={{ width: '100%' }}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, value) =>
					option.name === value.name
				}
				onChange={(_, value) => {
					onSelect(value);
				}}
				getOptionLabel={(option) => option.name}
				options={options}
				loading={loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						variant="filled"
						value={placeName}
						onChange={(e) => setPlaceName(e.target.value)}
						onKeyDown={onKeyDown}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
				{...otherProps}
			/>
		</Box>
	);
}
