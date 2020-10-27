import React from 'react';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';

// STyles
import useStyles from './furnishing.styles';

function MenuListComposition({ currentTab }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState({
		furnished: false,
		semifurnished: false,
		unfurnished: false,
	});

	const handleChange = (event) => {
		const { name, checked } = event.target;
		setValue((prevState) => ({
			...prevState,
			[name]: checked,
		}));
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
		return (
			<FormControl component="fieldset" className={classes.formControl}>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.furnished}
								onChange={handleChange}
								name="furnished"
							/>
						}
						label="Furnished"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.semifurnished}
								onChange={handleChange}
								name="semifurnished"
							/>
						}
						label="Semi-furnished"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.unfurnished}
								onChange={handleChange}
								name="unfurnished"
							/>
						}
						label="unfurnished"
					/>
				</FormGroup>
			</FormControl>
		);
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
				Furnishing Status
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
