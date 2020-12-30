import { Box, Typography } from '@material-ui/core';

import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { searchCities } from '../../redux/city/city.actions';
import { selectSearchCityLoading } from '../../redux/city/city.selectors';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',

		backgroundColor: '#ffffff',
		borderRight: '1px solid #cccccc',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
	button: {
		textTransform: 'none',
	},
	icon: {
		fontSize: '18px',
		marginRight: '0.5rem',
		color: theme.colorOne,
	},
	buttonText: {
		display: 'flex',
		alignItems: 'center',
		color: '#707070',
		minWidth: '200px',
		justifyContent: 'center',
		padding: '0.5rem 0',
		boxSizing: 'border-box',
	},
	input: {
		border: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	searchWrapper: {
		display: 'flex',
		// border: '1px solid #cccccc',
		margin: '0.3rem',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	parent: {
		maxHeight: '30vh',
		width: '30vh',
		overflowY: 'auto',
	},
	searchIcon: {
		color: '#c1c1c1',
		marginRight: '0.3rem',
	},
	cRed: {
		color: 'red',
	},
	item: {
		padding: '0.5rem',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.fontColor,
		},
	},
}));

function MenuListComposition({
	searchCities,
	searchCityLoading,
	city,
	handleCity,
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [cityText, setCityText] = React.useState('');

	const [asyncError, setAsyncError] = React.useState(null);
	const [cities, setCities] = React.useState([]);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setCities(data);
			console.log(data);
			setOpen(true);
		} else {
			setAsyncError(data);
		}
	};
	const handleChange = (e) => setCityText(e.target.value);
	const onKeyUp = (e) => {
		if (e.target.value.trim().length > 3) {
			console.log(cityText);
			searchCities(handleFetchCities, cityText);
		}
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const onClick = (data) => (e) => {
		handleCity(data);
		handleClose(e);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					className={classes.button}
				>
					<div className={classes.buttonText}>
						<RoomRoundedIcon className={classes.icon} />
						<span>{city.name}</span>
						<ArrowDropDownOutlinedIcon />
					</div>
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					keepMounted={true}
					disablePortal
				>
					<Paper elevation={3} className={classes.parent}>
						<ClickAwayListener onClickAway={handleClose}>
							<Box id="menu-list-grow">
								<Box
									p="0.3rem"
									className={classes.searchWrapper}
								>
									<FontAwesomeIcon
										icon={faSearch}
										className={classes.searchIcon}
									/>
									<input
										type="text"
										className={classes.input}
										placeholder="Enter 4 letter of the city"
										value={cityText}
										onChange={handleChange}
										onKeyUp={onKeyUp}
									/>
								</Box>
								{asyncError && (
									<p className={classes.cRed}>{asyncError}</p>
								)}
								{searchCityLoading && (
									<Typography component="h5" align="center">
										Loading...
									</Typography>
								)}
								{cities.map((c) => (
									<div
										key={c.id}
										onClick={onClick(c)}
										className={classes.item}
									>
										{c.name}
									</div>
								))}
							</Box>
						</ClickAwayListener>
					</Paper>
				</Popper>
			</div>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuListComposition);
