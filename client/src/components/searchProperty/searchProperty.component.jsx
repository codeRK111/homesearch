import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Paper } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Popper from '@material-ui/core/Popper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Custom components
import PropertyTab from '../propertyTab/propertyTab.component';
import SearchButton from '../searchButton/searchButton.component';
const img = require('../../assets/real.jpg');

const useStyles = makeStyles((theme) => ({
	title: {
		color: '#ffffff',
		textAlign: 'center',
		marginTop: '10%',
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
	bg: {
		position: 'relative',
		backgroundImage: `url("${img}")`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '90vh',
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	},
	formControl: {
		backgroundColor: '#ffffff',
	},
	budget: {
		backgroundColor: '#ffffff',
		height: '100%',
		cursor: 'pointer',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
		minWidth: '150px',
		maxWidth: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	property: {
		backgroundColor: '#ffffff',
		height: '100%',
		cursor: 'pointer',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
		},
		minWidth: '150px',
		borderLeft: '1px solid #cccccc',
		maxWidth: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: '18px',
		marginLeft: '0.5rem',
		color: theme.colorOne,
	},
	budgetPopper: {
		backgroundColor: '#ffffff',
		maxWidth: '200px',
	},
}));

const SearchProperty = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorElProperty, setAnchorElProperty] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const handleClickProperty = (event) => {
		setAnchorElProperty(anchorElProperty ? null : event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const openProperty = Boolean(anchorElProperty);
	const id = open ? 'simple-popper' : undefined;
	const idP = open ? 'simple-popper-Type' : undefined;
	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			p={'1rem'}
			className={classes.bg}
			position="relative"
		>
			<div className={classes.overlay}>
				<h1 className={classes.title}>
					Lorem ipsum dolor sit amet consectetur.
				</h1>
				<PropertyTab />
				<Box mt="2rem" display="flex" className={classes.wrapper}>
					<FormControl
						variant="outlined"
						className={classes.formControl}
					>
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
					<div
						className={classes.budgetWrapper}
						onClick={handleClick}
					>
						<div className={classes.budget}>
							Budget <ArrowDropDownOutlinedIcon />
						</div>
					</div>
					<Popper
						id={id}
						open={open}
						anchorEl={anchorEl}
						placement="top-start"
						popperOptions={{
							positionFixed: true,
						}}
						keepMounted={true}
						disablePortal={true}
					>
						<Paper className={classes.budgetPopper}>
							<BudgetItems />
						</Paper>
					</Popper>
					<div
						className={classes.budgetWrapper}
						onClick={handleClickProperty}
					>
						<div className={classes.property}>
							Property Type <ArrowDropDownOutlinedIcon />
						</div>
					</div>
					<Popper
						id={idP}
						open={openProperty}
						anchorEl={anchorElProperty}
						placement="bottom-start"
						popperOptions={{
							positionFixed: true,
						}}
						keepMounted={true}
						disablePortal={true}
					>
						<Paper className={classes.budgetPopper}>
							<PropertyItems />
						</Paper>
					</Popper>
					<div className={classes.buttonWrapper}>
						<SearchButton text="Search" />
					</div>
				</Box>
			</div>
		</Box>
	);
};

export default SearchProperty;

const styles = makeStyles({
	input: {
		width: '50px',
		padding: '0.5rem',
	},
	wrapper: {
		backgroundColor: '#ffffff',
		padding: '1rem',
		height: '500px',
		overflowY: 'scroll',
	},
	priceWrapper: {
		padding: '0.2rem',
		cursor: 'pointer',
	},
});

const BudgetItems = () => {
	const classes = styles();
	return (
		<Paper width="250px" className={classes.wrapper}>
			<Box display="flex" justifyContent="space-between">
				<input
					type="text"
					className={classes.input}
					placeholder="Min"
				/>
				<input
					type="text"
					className={classes.input}
					placeholder="Max"
				/>
			</Box>
			<Box mt="1rem">
				{Array.from(Array(20).keys()).map((c) => (
					<div key={c} className={classes.priceWrapper}>
						{c + 1}L
					</div>
				))}
			</Box>
		</Paper>
	);
};

const PropertyItems = () => {
	return (
		<Paper>
			<Box p="1rem">
				{' '}
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
		</Paper>
	);
};
