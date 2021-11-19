import {
	Box,
	Button,
	CircularProgress,
	Container,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { parseDateUnixSecond, toHumanReadable } from '../../utils/render';

import { RazorpayPayment } from '../../model/payment.interface';
import { asyncVerifyPayment } from '../../API/payment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	textFieldWrapper: {
		width: '30rem',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	paperWrapper: {
		width: '30rem',
		padding: '1rem',
		borderRadius: 20,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	colorGreen: {
		color: 'green',
	},
}));

const VerifyPaymentPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const style = useStyles();
	const [paymentId, setPaymentId] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<null | RazorpayPayment>(null);

	const onVerify = async () => {
		try {
			setLoading(true);
			const resp = await asyncVerifyPayment(`pay_${paymentId}`);
			setData(resp);
			setLoading(false);
		} catch (error: any) {
			setData(null);
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	return (
		<Container>
			<Box mt="2rem">
				<Typography variant="h5" gutterBottom>
					Verify Payment
				</Typography>
				<Box mt="1rem" className={style.textFieldWrapper}>
					<TextField
						fullWidth
						label="Enter payment id"
						id="filled-start-adornment"
						value={paymentId}
						onChange={(e) => setPaymentId(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									pay_
								</InputAdornment>
							),
						}}
						variant="filled"
					/>
				</Box>
				<Box mt="1rem">
					<Button
						variant="contained"
						color="primary"
						size="large"
						disabled={!paymentId || loading}
						endIcon={
							loading ? (
								<CircularProgress size={20} color="inherit" />
							) : (
								<></>
							)
						}
						onClick={onVerify}
					>
						Verify
					</Button>
				</Box>
				{data && !loading && (
					<Box mt="1rem">
						<Paper className={style.paperWrapper}>
							<Box display="flex" alignItems="center">
								<Typography>ID:&nbsp;</Typography>
								<Typography>
									<b>{data.id}</b>
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mt="0.5rem">
								<Typography>Amount:&nbsp;</Typography>
								<Typography>
									<b>{toHumanReadable(data.amount / 100)}</b>
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mt="0.5rem">
								<Typography>Status:&nbsp;</Typography>
								<Typography
									className={clsx({
										[style.colorGreen]:
											data.status === 'captured',
									})}
								>
									<b>{data.status}</b>
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mt="0.5rem">
								<Typography>Contact:&nbsp;</Typography>
								<Typography>
									<b>{data.contact}</b>
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mt="0.5rem">
								<Typography>Email:&nbsp;</Typography>
								<Typography>
									<b>{data.email}</b>
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mt="0.5rem">
								<Typography>Payment Via:&nbsp;</Typography>
								<Typography>
									<b>{data.method}</b>
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mt="0.5rem">
								<Typography>Payment Time:&nbsp;</Typography>
								<Typography>
									<b>
										{parseDateUnixSecond(data.created_at)}
									</b>
								</Typography>
							</Box>
						</Paper>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default VerifyPaymentPage;
