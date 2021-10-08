import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';

import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

interface ILeadsSearchBar {
	loading: boolean;
	value: string;
	setValue: (value: string) => void;
}

const LeadsSearchBar = ({ loading, value, setValue }: ILeadsSearchBar) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};
	return (
		<div>
			<TextField
				id="input-with-icon-textfield"
				variant="filled"
				placeholder="Search By Location ( Type min 3 characters )"
				size="medium"
				fullWidth
				value={value}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="start">
							{loading && (
								<CircularProgress color="inherit" size={20} />
							)}
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
};

export default LeadsSearchBar;
