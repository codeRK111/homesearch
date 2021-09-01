import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const IOSSwitchButton = withStyles((theme) => ({
	root: {
		width: 36,
		height: 22,
		padding: 0,
		margin: theme.spacing(1),
	},
	switchBase: {
		padding: 1,
		'&$checked': {
			transform: 'translateX(16px)',
			color: theme.palette.common.white,
			'& + $track': {
				backgroundColor: '#52d869',
				opacity: 1,
				border: 'none',
			},
		},
		'&$focusVisible $thumb': {
			color: '#52d869',
			border: '6px solid #fff',
		},
	},
	thumb: {
		width: 20,
		height: 20,
	},
	track: {
		borderRadius: 26 / 2,
		border: `1px solid ${theme.palette.grey[400]}`,
		backgroundColor: theme.palette.grey[50],
		opacity: 1,
		transition: theme.transitions.create(['background-color', 'border']),
	},
	checked: {},
	focusVisible: {},
}))(({ classes, ...props }) => {
	return (
		<Switch
			focusVisibleClassName={classes.focusVisible}
			disableRipple
			classes={{
				root: classes.root,
				switchBase: classes.switchBase,
				thumb: classes.thumb,
				track: classes.track,
				checked: classes.checked,
			}}
			{...props}
		/>
	);
});

const IOSSwitch = ({ checked, onChange, label }) => {
	return (
		<FormControlLabel
			control={<IOSSwitchButton checked={checked} onChange={onChange} />}
			label={label}
		/>
	);
};

export default IOSSwitch;
