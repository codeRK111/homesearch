import { Box } from '@material-ui/core';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import React from 'react';
import useStyles from './phoneNumber.style';

const ShowPhoneNumber = () => {
	const style = useStyles();
	return (
		<Box className={style.wrapper}>
			<PhoneInTalkIcon />
			<a href="tel:8260123123" className={style.link}>
				+91 8260-123-123
			</a>
		</Box>
	);
};

export default ShowPhoneNumber;
