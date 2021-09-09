// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import { Box, Typography } from '@material-ui/core';
import React, { useRef } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { getAllUsers } from '../../utils/asyncUsers';

export default function SearchUserByName({
	label = 'Search User',
	onSelect,
	error,
	padding = true,
	value,
}) {
	const cancelToken = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [placeName, setPlaceName] = React.useState('');
	const [options, setOptions] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const onChange = (e) => {
		const { value } = e.target;
		setPlaceName(value);
		if (value.length === 2 || value.length >= 4) {
			cancelToken.current = axios.CancelToken.source();
			getAllUsers(
				{ name: placeName, limit: 500, status: 'active' },
				cancelToken.current,
				setLoading
			).then((data) => {
				setOptions(data.users);
			});
		}
	};

	const boxProps = {};
	if (padding) {
		boxProps.p = '0.5rem';
	}

	return (
		<Box {...boxProps}>
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
				// getOptionSelected={(option, value) =>
				// 	option.name === value.name
				// }
				onChange={(_, value) => {
					onSelect(value);
				}}
				value={value}
				getOptionLabel={(option) => option.name}
				options={options}
				loading={loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						variant="filled"
						value={placeName}
						onChange={onChange}
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
			/>
		</Box>
	);
}
