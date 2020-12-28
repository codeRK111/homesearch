import Box from '@material-ui/core/Box';
import { Checkbox } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import useStyles from './propertyTypeFilter.styles';

// Redux

// STyles

function MenuListComposition({ currentTab, pFor, types, setTypes }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleTypes = (event) => {
		const { checked, name } = event.target;
		setTypes((prevState) => ({ ...prevState, [name]: checked }));
	};

	const anchorRef = React.useRef(null);

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const toggleOpen = (_) => setOpen(!open);

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const renderPropertyTypes = () =>
		pFor !== 'rent' ? (
			<Box p="1rem">
				{' '}
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="flat"
								checked={types.flat}
								onChange={handleTypes}
							/>
						}
						label="Apartment"
					/>
				</div>
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="independenthouse"
								checked={types.independenthouse}
								onChange={handleTypes}
							/>
						}
						label="Villa"
					/>
				</div>
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="land"
								checked={types.land}
								onChange={handleTypes}
							/>
						}
						label="Land"
					/>
				</div>
			</Box>
		) : (
			<Box p="1rem">
				{' '}
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="flat"
								checked={types.flat}
								onChange={handleTypes}
							/>
						}
						label="Apartment"
					/>
				</div>
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="independenthouse"
								checked={types.independenthouse}
								onChange={handleTypes}
							/>
						}
						label="Independent House"
					/>
				</div>
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="hostel"
								checked={types.hostel}
								onChange={handleTypes}
							/>
						}
						label="Hostel"
					/>
				</div>
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="pg"
								checked={types.pg}
								onChange={handleTypes}
							/>
						}
						label="PG"
					/>
				</div>
			</Box>
		);

	return (
		<Box height="100%" width="100%" className={classes.wrapper}>
			<Box
				display="flex"
				ref={anchorRef}
				height="100%"
				alignItems="center"
				width="100%"
				justifyContent="center"
				className={classes.buttonWrapper}
				onClick={toggleOpen}
			>
				Property Type
				<ExpandMoreIcon />
			</Box>

			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				style={{
					zIndex: 1000,
				}}
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
							<Paper
								elevation={3}
								onMouseLeave={handleClose}
								className={classes.valueWrapper}
							>
								{renderPropertyTypes()}
							</Paper>
						</ClickAwayListener>
					</Grow>
				)}
			</Popper>
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
});

export default connect(mapStateToProps, null)(MenuListComposition);
