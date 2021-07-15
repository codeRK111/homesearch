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
import { selectCurrentTab } from '../../../redux/actionTab/actionTab.selectors';
import useStyles from './searchPage.style';

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
	const [budgetList, setBudgetList] = React.useState([]);
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
			if (checked) {
				setBudgetList(rentItems);
			} else {
				setBudgetList([]);
			}
		} else {
			setOtherItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
			if (checked) {
				setBudgetList(otherItems);
			} else {
				setBudgetList([]);
			}
		}
	};

	const handleRent = (val) => (e) => {
		const { name, checked } = e.target;
		if (checked) {
			setBudgetList((prevState) => [...prevState, val]);
		} else {
			setBudgetList((prevState) =>
				prevState.filter((c) => c.name !== val.name)
			);
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
			setBudgetList((prevState) => [...prevState, val]);
		} else {
			setBudgetList((prevState) =>
				prevState.filter((c) => c.name !== val.name)
			);
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
		<Box height="100%" width="100%" className={classes.locationWrapper}>
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
									checked: classes.checked,
									colorSecondary: classes.checked,
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
											checked={c.checked}
											onChange={handleRent(c)}
											classes={{
												colorSecondary: classes.checked,
												checked: classes.checked,
											}}
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
											checked={c.checked}
											onChange={handleOtherItems(c)}
											size="small"
											classes={{
												colorSecondary: classes.checked,
												checked: classes.checked,
											}}
										/>
									}
									label={c.name}
								/>
							</div>
					  ))}
			</Box>
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
});

export default connect(mapStateToProps, null)(MenuListComposition);
