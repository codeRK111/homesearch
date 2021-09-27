// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import { Box, Typography } from '@material-ui/core';
import React, { useRef } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { searchPlace } from '../../utils/asyncCity';
import useGlobalStyles from '../../common.style';

export default function ({
	label = 'Enter City Name',
	heading,
	onSelect,
	type = 'city',
	city = null,
	location = null,
	error,
	padding = true,
	value,
}) {
	const globalStyle = useGlobalStyles();
	const cancelToken = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [placeName, setPlaceName] = React.useState('');
	const [options, setOptions] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const otherProps = {};
	if (city && type === 'city') {
		otherProps.value = city;
	}
	if (location && type === 'location') {
		otherProps.value = location;
	}

	const onChange = (e, value, reason) => {
		setPlaceName(value);
		console.log({ value });
		if (value.length === 2 || value.length >= 4) {
			cancelToken.current = axios.CancelToken.source();
			if (type === 'city') {
				if (reason === 'input') {
					searchPlace(
						{
							name: placeName,
						},
						cancelToken.current,
						setLoading
					).then((data) => {
						setOptions(data);
					});
				}
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
			{!error && heading && (
				<Typography variant="caption" display="block" gutterBottom>
					{heading}
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
				onChange={(_, value) => {
					onSelect(value);
				}}
				onInputChange={onChange}
				value={value}
				getOptionLabel={(option) => option.name}
				options={options}
				loading={loading}
				renderInput={(params) => (
					<div ref={params.InputProps.ref}>
						<input
							{...params.inputProps}
							placeholder={label}
							className={globalStyle.input}
							label={label}
						/>
					</div>
				)}
				{...otherProps}
			/>
		</Box>
	);
}
