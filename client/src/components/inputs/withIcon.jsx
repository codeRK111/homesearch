import {
	FormControl,
	FormHelperText,
	InputAdornment,
	InputBase,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import useStyles from './input.style';

const WithIcon = ({ type, error, ...otherProps }) => {
	const style = useStyles();
	const icons = {
		name: <PersonIcon className={style.icon} />,
		email: <EmailIcon className={style.icon} />,
		phone: <PhoneIcon className={style.icon} />,
		message: <MessageIcon className={style.icon} />,
	};
	return (
		<FormControl fullWidth error={!!error}>
			<InputBase
				id="filled-adornment-weight"
				//   value={values.weight}
				//   onChange={handleChange('weight')}
				startAdornment={
					<InputAdornment position="end">
						{icons[type] ? icons[type] : ''}
					</InputAdornment>
				}
				classes={{
					root: style.root,
					focused: style.focused,
					input: style.input,
				}}
				error={!!error}
				{...otherProps}
			/>
			<FormHelperText>{error}</FormHelperText>
		</FormControl>
	);
};

export default WithIcon;
