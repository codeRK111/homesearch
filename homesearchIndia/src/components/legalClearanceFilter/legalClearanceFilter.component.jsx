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
import useStyles from './legalClearanceFilter.styles';

function MenuListComposition({ currentTab }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState({
		approvalOfBuilding: false,
		nocFromFireDepts: false,
		electricityConnUse: false,
		StructuralStatbilityCertificate: false,
		nocFromPollutionDepts: false,
		functionalCertificate: false,
		holdingTax: false,
		completionCertificate: false,
		reraapproved: false,
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
								checked={value.approvalOfBuilding}
								onChange={handleChange}
								name="approvalOfBuilding"
							/>
						}
						label="Approval of building"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.nocFromFireDepts}
								onChange={handleChange}
								name="nocFromFireDepts"
							/>
						}
						label="NOC from Fire depts"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.electricityConnUse}
								onChange={handleChange}
								name="electricityConnUse"
							/>
						}
						label="Electricity Connection use"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.StructuralStatbilityCertificate}
								onChange={handleChange}
								name="StructuralStatbilityCertificate"
							/>
						}
						label="Structural stability certificate"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.nocFromPollutionDepts}
								onChange={handleChange}
								name="nocFromPollutionDepts"
							/>
						}
						label="NOC from Pollution deptt"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.functionalCertificate}
								onChange={handleChange}
								name="functionalCertificate"
							/>
						}
						label="Occupation / functional certificate"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.holdingTax}
								onChange={handleChange}
								name="holdingTax"
							/>
						}
						label="Municipal /Holding Tax"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.completionCertificate}
								onChange={handleChange}
								name="completionCertificate"
							/>
						}
						label="Completion Certificate"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.reraapproved}
								onChange={handleChange}
								name="reraapproved"
							/>
						}
						label="RERA Approved"
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
				Legal Clearance
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
