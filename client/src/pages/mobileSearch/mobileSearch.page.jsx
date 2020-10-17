import React from 'react';
import {
	IconButton,
	Box,
	FormControlLabel,
	Button,
	FormControl,
	Select,
	InputLabel,
	Paper,
	Checkbox,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

// Custom components
import PropertyTab from '../../components/propertyTab/propertyTab.component';

// Styles
import { useStyles } from './mobileSearch.styles';

const MobileSearch = () => {
	const history = useHistory();

	const goBack = (_) => {
		history.goBack();
	};

	const {
		searchWrapper,
		searchInput,
		searchIcon,
		filterWrapper,
	} = useStyles();
	return (
		<div>
			<Box>
				<IconButton onClick={goBack}>
					<ArrowBackIcon />
				</IconButton>
			</Box>
			<PropertyTab />
			<Box pl="1rem">
				<h4>Locality</h4>
			</Box>
			<Box pl="1rem" pr="1rem">
				<Paper className={searchWrapper} elevation={3}>
					<Box display="flex" alignItems="center">
						<SearchIcon className={searchIcon} />
						<input
							type="text"
							className={searchInput}
							placeholder="Search locality"
						/>
					</Box>
				</Paper>
			</Box>

			<Box className={filterWrapper}>
				<h4>Budget</h4>
				<Box>
					<Box>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="filled-age-native-simple">
								Min
							</InputLabel>
							<Select
								native
								label="Min"
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" />
								{Array.from(Array(20).keys()).map((c) => (
									<option value={c} key={c}>
										{c + 1}L
									</option>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box mt="1rem">
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="filled-age-native-simple">
								Max
							</InputLabel>
							<Select
								native
								label="Max"
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" />
								{Array.from(Array(20).keys()).map((c) => (
									<option value={c} key={c}>
										{c + 1}L
									</option>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>
				<Box mt="2rem">
					<h4>Unit Type</h4>

					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Flat / Apartment"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Independent House"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="PG"
						/>
					</div>
				</Box>
			</Box>
			<Box mt="2rem">
				<Button fullWidth color="primary" variant="contained">
					Search
				</Button>
			</Box>
		</div>
	);
};

export default MobileSearch;
