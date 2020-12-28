import { Checkbox, Divider, FormControlLabel } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import useStyles from './budgetFilter.styles';

// Redux

// STyles

function MenuListComposition({
	currentTab,
	pFor,
	rentItems,
	setRentItems,
	otherItems,
	setOtherItems,
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
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

	const [selectAll, setSelectAll] = React.useState(false);

	const handleSelectAll = (e) => {
		const { checked } = e.target;
		setSelectAll(checked);

		if (pFor === 'rent') {
			setRentItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
		} else {
			setOtherItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
		}
	};

	const handleRent = (val) => (e) => {
		const { name, checked } = e.target;
		if (checked) {
		} else {
		}
		setRentItems((prevState) =>
			prevState.map((c) => {
				if (name === c.name) {
					c.checked = checked;
				}
				return c;
			})
		);
	};

	const handleOtherItems = (val) => (e) => {
		const { name, checked } = e.target;
		if (checked) {
		} else {
		}
		setOtherItems((prevState) =>
			prevState.map((c) => {
				if (name === c.name) {
					c.checked = checked;
				}
				return c;
			})
		);
	};

	return (
		<Box height="100%" width="100%" className={classes.wrapper}>
			<Box
				display="flex"
				ref={anchorRef}
				height="100%"
				alignItems="center"
				justifyContent="space-between"
				className={classes.buttonWrapperMobile}
				onClick={toggleOpen}
			>
				Budget
				<ExpandMoreIcon />
			</Box>

			<Popper
				open={open}
				anchorEl={anchorRef.current}
				placement="bottom"
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
								className={classes.valueWrapperMobile}
							>
								<Box>
									<div

									// onClick={click(c, 'L')}
									>
										<FormControlLabel
											control={
												<Checkbox
													name="flat"
													checked={selectAll}
													onChange={handleSelectAll}
													color="secondary"
													classes={{
														checked:
															classes.checked,
														colorSecondary:
															classes.checked,
													}}
												/>
											}
											label="Select All"
										/>
									</div>
									<Divider />
									{pFor === 'rent'
										? rentItems.map((c, i) => (
												<div
													key={i}

													// onClick={click(c, 'L')}
												>
													<FormControlLabel
														control={
															<Checkbox
																name={c.name}
																checked={
																	c.checked
																}
																onChange={handleRent(
																	c
																)}
															/>
														}
														label={c.name}
													/>
												</div>
										  ))
										: otherItems.map((c, i) => (
												<div
													key={i}

													// onClick={click(c, 'L')}
												>
													<FormControlLabel
														control={
															<Checkbox
																name={c.name}
																checked={
																	c.checked
																}
																onChange={handleOtherItems(
																	c
																)}
															/>
														}
														label={c.name}
													/>
												</div>
										  ))}
								</Box>
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
