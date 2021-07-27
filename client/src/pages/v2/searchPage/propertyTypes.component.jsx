import Box from '@material-ui/core/Box';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../../redux/actionTab/actionTab.selectors';
import useStyles from './searchPage.style';

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
			<Box>
				{' '}
				<div>
					<FormControlLabel
						control={
							<Checkbox
								name="flat"
								checked={types.flat}
								onChange={handleTypes}
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
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
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
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
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
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
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
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
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
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
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
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
								size="small"
								classes={{
									colorSecondary: classes.checked,
									checked: classes.checked,
								}}
							/>
						}
						label="PG"
					/>
				</div>
			</Box>
		);

	return (
		<Box width="100%" className={classes.wrapper}>
			{renderPropertyTypes()}
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
});

export default connect(mapStateToProps, null)(MenuListComposition);
