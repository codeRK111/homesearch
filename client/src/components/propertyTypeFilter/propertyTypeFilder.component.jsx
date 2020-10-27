import React from 'react';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';

// STyles
import useStyles from './propertyTypeFilter.styles';

function MenuListComposition({ currentTab }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('female');

	const handleChange = (event) => {
		setValue(event.target.value);
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

	const renderPropertyTypes = () => {
		if (currentTab === 'rent') {
			return (
				<FormControl component="fieldset">
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value="female"
							control={<Radio />}
							label="Flat"
						/>
						<FormControlLabel
							value="male"
							control={<Radio />}
							label="Land"
						/>
						<FormControlLabel
							value="other"
							control={<Radio />}
							label="Independent House"
						/>
						<FormControlLabel
							value="male"
							control={<Radio />}
							label="Hostel"
						/>
						<FormControlLabel
							value="other"
							control={<Radio />}
							label="PG"
						/>
						<FormControlLabel
							value="other"
							control={<Radio />}
							label="All"
						/>
					</RadioGroup>
				</FormControl>
			);
		} else {
			return (
				<FormControl component="fieldset">
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value="female"
							control={<Radio />}
							label="Flat"
						/>
						<FormControlLabel
							value="male"
							control={<Radio />}
							label="Land"
						/>
						<FormControlLabel
							value="other"
							control={<Radio />}
							label="Independent House"
						/>
						<FormControlLabel
							value="all"
							control={<Radio />}
							label="All"
						/>
					</RadioGroup>
				</FormControl>
			);
		}
	};

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
