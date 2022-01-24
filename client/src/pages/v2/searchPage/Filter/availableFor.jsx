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

const availableForNames = [
	'Family',
	'Bachelors (Men)',
	'Bachelors (Women)',
	'Job holder (Men)',
	'Job holder (Women)',
];

const AvailableForFilter = ({ availableFor, setAvailableFor }) => {
	const { wrapper, button, dropdownContent } = useStyles();
	const { bold, colorPrimary, pointer, flexCenter } = useGlobalStyles();

	const handleTypes = (event) => {
		const { checked, name } = event.target;
		if (checked) {
			setAvailableFor((prevState) => [...prevState, name]);
		} else {
			setAvailableFor((prevState) => prevState.filter((c) => c !== name));
		}
	};
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
				Availabe For
				<ExpandMoreIcon />
			</button>
			<div className={dropdownContent}>
				{availableForNames.map((c, i) => (
					<Box>
						<FormControlLabel
							key={i}
							control={
								<Checkbox
									name={c}
									checked={availableFor.includes(c)}
									onChange={handleTypes}
									size="small"
									color="primary"
								/>
							}
							label={c}
						/>
					</Box>
				))}
			</div>
		</div>
	);
};

export default AvailableForFilter;
