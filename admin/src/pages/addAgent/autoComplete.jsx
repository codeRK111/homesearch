/* eslint-disable no-use-before-define */

import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function AutocompleteProjects({ projects, onSelect, agents }) {
	return (
		<Autocomplete
			multiple
			value={agents}
			id="tags-filled"
			options={projects}
			getOptionLabel={(option) => option.name}
			onChange={(_, value) => {
				onSelect(value.map((c) => c.id));
			}}
			style={{ width: '100%' }}
			renderInput={(params) => (
				<TextField {...params} label="Select Staff" variant="filled" />
			)}
		/>
	);
}
