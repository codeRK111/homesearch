import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';

// Custom components
import PropertyTab from '../propertyTab/propertyTab.component';
import SearchButton from '../searchButton/searchButton.component';

const useStyles = makeStyles((theme) => ({
	title: {
		color: theme.fontColor,
		textAlign: 'center',
	},
	searchField: {
		borderLeft: 'none',
		borderTop: '1px solid #cccccc',
		paddingLeft: '10px',
		[theme.breakpoints.down('sm')]: {
			padding: '18.5px 14px',
			border: '1px solid #cccccc',
		},
	},
	wrapper: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	buttonWrapper: {
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
	},
}));

const SearchProperty = () => {
	const classes = useStyles();
	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			p={'1rem'}
		>
			<h1 className={classes.title}>
				Lorem ipsum dolor sit amet consectetur.
			</h1>
			<PropertyTab />
			<Box mt="2rem" display="flex" className={classes.wrapper}>
				<FormControl variant="outlined" className={classes.formControl}>
					<Select
						native
						inputProps={{
							name: 'age',
							id: 'filled-age-native-simple',
						}}
					>
						<option value={10}>Bhubaneswar</option>
						<option value={20}>Nayagarh</option>
						<option value={30}>Cuttack</option>
					</Select>
				</FormControl>
				<input
					type="text"
					placeholder="This is a dummy placeholder"
					className={classes.searchField}
				/>
				<div className={classes.buttonWrapper}>
					<SearchButton text="Search" />
				</div>
			</Box>
		</Box>
	);
};

export default SearchProperty;
