import { Box, FormControl, InputLabel, TextField } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import useStyles from './searchFeedBackForm.style';

const options = [
	'I need to talk to customer service',
	"I still haven't found what I'm Looking for",
	'Property already sold out',
	'Property already rented out',
	'Broker posing as owner',
	'Incorrect Price/Area',
	'For sale but listed under rent',
	'Incorrect contact information',
	'Property shown here doesnt exist',
	'Incorrect location information',
	'For rent but listed under sale',
	'Others',
];

const SearchFeedback = ({ feedback, onSubmit }) => {
	const classes = useStyles();
	const [category, setCategory] = React.useState(
		'I need to talk to customer service'
	);
	const handleChange = (e) => setCategory(e.target.value);
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
			{!feedback && (
				<Box mt="1rem">
					<FormControl
						variant="outlined"
						className={classes.formControl}
						fullWidth
						size="small"
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							label="Category"
							value={category}
							onChange={handleChange}
						>
							{options.map((c, i) => (
								<MenuItem value={c} key={i}>
									{c}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			)}
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
				<button className={classes.submit} onClick={onSubmit}>
					Submit
				</button>
			</Box>
		</Box>
	);
};

export default SearchFeedback;
