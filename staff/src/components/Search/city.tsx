// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { City } from '../../model/city.interface';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { asyncSearchCity } from '../../API/city';

interface ISearchCity {
	onSelect: (city: City | null) => void;
	value: City | null;
	label?: string;
}

export default function SearchCity({
	label = 'Enter City Name',
	onSelect,
	value,
}: ISearchCity) {
	const [open, setOpen] = React.useState(false);
	const [placeName, setPlaceName] = React.useState('');
	const [options, setOptions] = React.useState<City[]>([]);
	const [loading, setLoading] = React.useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPlaceName(value);
		if (value.length === 2 || value.length >= 4) {
			setLoading(true);
			asyncSearchCity(value)
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
