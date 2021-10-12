// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Location } from '../../model/location.interface';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { asyncSearchLocation } from '../../API/city';

interface ISearchLocation {
	city: string;
	onSelect: (city: Location | null) => void;
	value: Location | null;
	label?: string;
	error?: string;
}

export default function SearchLocation({
	label = 'Enter City Name',
	onSelect,
	value,
	city,
	error,
}: ISearchLocation) {
	const [open, setOpen] = React.useState(false);
	const [placeName, setPlaceName] = React.useState('');
	const [options, setOptions] = React.useState<Location[]>([]);
	const [loading, setLoading] = React.useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPlaceName(value);
		if ((value.length === 2 || value.length >= 4) && city) {
			setLoading(true);
			asyncSearchLocation(value, city)
				.then((resp) => {
					setLoading(false);
					setOptions(resp);
				})
				.catch((e) => {
					setLoading(false);
					setOptions([]);
				});
		}
	};

	return (
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
			onChange={(_, value, reason) => {
				if (reason === 'clear') {
					onSelect(null);
				} else {
					if (value) {
						onSelect(value);
					}
				}
			}}
			value={value}
			getOptionLabel={(option) => option.name}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					size="small"
					variant="filled"
					value={placeName}
					onChange={onChange}
					error={!!error}
					helperText={error}
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
	);
}
