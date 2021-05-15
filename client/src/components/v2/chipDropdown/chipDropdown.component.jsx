import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './chip.style';

const width = {
	sm: 75,
	md: 120,
	lg: 200,
	fullWidth: '100%',
};

const Chip = ({ size = 'sm', label = 'Select' }) => {
	const classes = useStyles({
		size: width[size] ? width[size] : 'sm',
	});
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper}>
			{label}
			<ExpandMoreIcon />
		</div>
	);
};

Chip.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'fullWidth']),
	label: PropTypes.string,
};

export default Chip;
