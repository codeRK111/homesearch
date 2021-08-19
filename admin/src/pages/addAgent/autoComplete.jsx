/* eslint-disable no-use-before-define */

import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function AutocompleteProjects({ projects, onSelect }) {
	return (
		<Autocomplete
			multiple
			id="tags-filled"
			options={projects}
			getOptionLabel={(option) => option.title}
			onChange={(_, value) => {
				console.log(value);
				onSelect(value);
			}}
			style={{ width: '100%' }}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Select Project"
					variant="filled"
				/>
			)}
		/>
	);
}
