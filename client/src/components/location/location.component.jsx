import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { searchLocations } from '../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';

// Redux

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
	button: {
		textTransform: 'none',
		marginLeft: '1rem',
		borderLeft: '1px solid #cccccc',
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
	},
	locationListWrapper: {
		padding: '0.5rem',
		fontSize: '0.8rem',
		maxHeight: '200px',
		overflowY: 'auto',
		[theme.breakpoints.down('sm')]: {
			height: '160px',
		},
	},
	locationWrapper: {
		padding: '0.5rem',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#cccccc',
		},
	},
	locationIcon: {
		color: theme.colorTwo,
		fontSize: '14px',
		marginRight: '0.2rem',
	},
	input: {
		border: 'none',
		width: '100%',
		'&:focus': {
			outline: 'none',
		},
	},
}));

function MenuListComposition({
	searchLocationLoading,
	searchLocations,
	className,
	onSelect,
	onError,
	city,
	...otherProps
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [location, setLocation] = React.useState('');
	const [locations, setLocations] = React.useState([]);
	const [noData, setNoData] = React.useState(false);

	const anchorRef = React.useRef(null);

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
		setLocation('');
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const handleFetchLocations = (status, data = null) => {
		if (status === 'success') {
			if (onError) {
				onError(null);
			}
			if (data.length > 0) {
				setNoData(false);
			} else {
				setNoData(true);
			}
			setLocations(data);
		} else {
			if (onError) {
				onError(data);
			}
		}
	};

	const onKeyDown = (e) => {
		if (e.target.value.trim().length > 2) {
			searchLocations(handleFetchLocations, e.target.value, city.id);
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const selectLocation = (data) => (e) => {
		setLocation('');
		setOpen(false);
		if (onSelect) {
			onSelect(data);
		}
	};

	return (
		<Box height="100%" width="100%">
			<Box
				display="flex"
				ref={anchorRef}
				height="100%"
				alignItems="center"
				width="100%"
			>
				<SearchIcon />
				<input
					type="text"
					className={classes.input}
					value={location}
					onKeyUp={onKeyDown}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="You can choose 3 locations"
					{...otherProps}
				/>
			</Box>
			{/* <Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					className={classes.button}
				>
					<div className={classes.buttonText}>
						<PersonIcon className={classes.icon} />
						<span>Account</span>
						<ArrowDropDownOutlinedIcon />
					</div>
				</Button> */}
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom'
									? 'center top'
									: 'center bottom',
						}}
					>
						<ClickAwayListener
							onClickAway={handleClose}
							mouseEvent="onMouseDown"
							touchEvent="onTouchStart"
						>
							<Paper elevation={3} onMouseLeave={handleClose}>
								{searchLocationLoading ? (
									<div
										className={classes.locationListWrapper}
									>
										<h3>Loading ...</h3>
									</div>
								) : (
									<div
										className={classes.locationListWrapper}
									>
										{noData ? (
											<div
												className={
													classes.locationListWrapper
												}
											>
												<h3>No results found</h3>
											</div>
										) : (
											locations.map((c) => (
												<div
													key={c.id}
													className={
														classes.locationWrapper
													}
													onClick={selectLocation(c)}
												>
													<RoomRoundedIcon
														className={
															classes.locationIcon
														}
													/>
													<span>{c.name}</span>
													&nbsp; (<b>{c.city.name}</b>
													)
												</div>
											))
										)}
									</div>
								)}
							</Paper>
						</ClickAwayListener>
					</Grow>
				)}
			</Popper>
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	searchLocationLoading: selectSearchLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name, city) =>
		dispatch(searchLocations({ name, city, callback })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuListComposition);
