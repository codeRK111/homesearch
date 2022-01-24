import { Box, Checkbox, FormControlLabel } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalStyles from '../../../../common.style';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative',
		display: 'block',
		width: '100%',
		zIndex: 100000,
		'&:hover': {
			'& $dropdownContent': {
				display: 'block',
			},
			// backgroundColor: 'red',
		},
	},
	button: {
		display: 'flex',
		width: '100%',
		padding: '1rem 0',
		border: 'none',
		borderRadius: 20,
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		fontSize: '1rem',
		backgroundColor: theme.shadowColor,
	},
	dropdownContent: {
		display: 'none',
		position: 'absolute',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		backgroundColor: theme.shadowColor,
		borderRadius: 20,
		padding: '1rem',
		height: '30vh',
		overflow: 'auto',
		width: '100%',
		boxSizing: 'border-box',
	},
}));

const rentItems = [
	{
		label: 'Flat / Apartment',
		value: 'flat',
	},
	{
		label: 'Villa',
		value: 'independenthouse',
	},
	{
		label: 'Hostel',
		value: 'hostel',
	},
	{
		label: 'PG',
		value: 'pg',
	},
];
const saleItems = [
	{
		label: 'Flat / Apartment',
		value: 'flat',
	},
	{
		label: 'Villa',
		value: 'independenthouse',
	},
	{
		label: 'Land',
		value: 'land',
	},
];

const PropertyTypeFilter = ({ pFor, types, setTypes }) => {
	console.log({ types });
	const { wrapper, button, dropdownContent } = useStyles();
	const { bold, colorPrimary, pointer, flexCenter } = useGlobalStyles();

	const handleTypes = (event) => {
		const { checked, name } = event.target;
		setTypes((prevState) => ({ ...prevState, [name]: checked }));
	};
	const arr = pFor === 'rent' ? rentItems : saleItems;
	return (
		<div className={wrapper}>
			<button
				className={clsx(
					button,
					bold,
					colorPrimary,
					pointer,
					flexCenter
				)}
			>
				Property Type
				<ExpandMoreIcon />
			</button>
			<div className={dropdownContent}>
				{arr.map((c, i) => (
					<Box>
						<FormControlLabel
							key={i}
							control={
								<Checkbox
									name={c.value}
									checked={types[c.value]}
									onChange={handleTypes}
									size="small"
									color="primary"
								/>
							}
							label={c.label}
						/>
					</Box>
				))}
			</div>
		</div>
	);
};

export default PropertyTypeFilter;
