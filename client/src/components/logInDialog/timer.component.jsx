import { Button, Typography } from '@material-ui/core';
import { memo, useEffect, useRef, useState } from 'react';

import React from 'react';

const Timer = ({ initialMinute = 0, initialSeconds = 0, resentOTP }) => {
	const [minutes, setMinutes] = useState(initialMinute);
	const [seconds, setSeconds] = useState(initialSeconds);
	const timer = useRef(null);
	useEffect(() => {
		timer.current = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(timer.current);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(timer.current);
		};
	});

	useEffect(() => {
		if (minutes === 0 && seconds === 0) {
			clearInterval(timer.current);
		}
	}, [minutes, seconds]);

	return (
		<div>
			{minutes === 0 && seconds === 0 ? (
				<Button onClick={resentOTP} size="small" variant="contained">
					Resend OTP
				</Button>
			) : (
				<Typography variant="caption">
					OTP expires in{' '}
					<b>
						{minutes}:{seconds < 10 ? `0` : seconds}
					</b>
				</Typography>
			)}
		</div>
	);
};

export default Timer;
