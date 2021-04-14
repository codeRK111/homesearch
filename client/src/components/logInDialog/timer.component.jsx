import { Button, CircularProgress, Typography } from '@material-ui/core';
import { memo, useEffect, useRef, useState } from 'react';

import React from 'react';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';

const Timer = ({ initialMinute = 0, initialSeconds = 0, phoneNumber }) => {
	const [resendState, setResendState] = React.useState({
		loading: false,
		error: null,
	});
	const cancelToken = React.useRef(undefined);
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

	const buttonProps = {};

	const onResendOTP = async () => {
		try {
			setResendState({
				error: null,
				loading: true,
			});
			cancelToken.current = axios.CancelToken.source();
			await axios.get(apiUrl(`/users/sendOtp/${phoneNumber}`), {
				cancelToken: cancelToken.current.token,
			});

			setResendState({
				error: null,
				loading: false,
			});
			setMinutes(2);
			setSeconds(2);
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
		} catch (error) {
			if (error.response) {
				setResendState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setResendState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};

	if (resendState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}

	return (
		<div>
			{minutes === 0 && seconds === 0 ? (
				<Button
					onClick={onResendOTP}
					size="small"
					variant="contained"
					{...buttonProps}
				>
					Resend OTP
				</Button>
			) : (
				<Typography variant="caption">
					OTP expires in{' '}
					<b>
						{minutes < 10 ? `0${minutes}` : minutes}:
						{seconds < 10 ? `0${seconds}` : seconds}
					</b>
				</Typography>
			)}
		</div>
	);
};

export default Timer;
