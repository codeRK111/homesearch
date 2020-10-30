import { Box, TextField } from '@material-ui/core';

import React from 'react';
import useStyles from './searchFeedBackForm.style';

const SearchFeedback = () => {
	const classes = useStyles();
	return (
		<Box>
			<Box>
				<TextField
					placeholder="Name"
					fullWidth
					variant="outlined"
					size="small"
				/>
			</Box>
			<Box mt="1rem">
				<TextField
					placeholder="Email"
					type="email"
					fullWidth
					variant="outlined"
					size="small"
				/>
			</Box>
			<Box mt="1rem">
				<TextField
					placeholder="Contact Number"
					type="number"
					variant="outlined"
					fullWidth
					size="small"
				/>
			</Box>
			<Box mt="1rem">
				<TextField
					placeholder="message"
					fullWidth
					multiline
					rows={5}
					variant="outlined"
					size="small"
				/>
			</Box>
			<Box mt="1rem">
				<button className={classes.submit}>Submit</button>
			</Box>
		</Box>
	);
};

export default SearchFeedback;
