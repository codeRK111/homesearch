import {
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PresentIcon from '@material-ui/icons/CheckCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useState } from 'react';
import { downloadInvoice } from '../../utils/asyncPayment';

const useStyles = makeStyles((theme) => ({
	successWrapper: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: 20,
	},

	bold: {
		fontWeight: 700,
		letterSpacing: 1,
	},
	icon: {
		fontSize: '6rem',
		color: 'green',
	},
}));

const PaymentSuccess = ({
	heading = 'Payment Successful!',
	text = 'Our executive will contact with you soon.',
	data = null,
	subscriptionId = null,
}) => {
	const { successWrapper, icon, bold } = useStyles();
	const [loading, setLoading] = useState(false);

	const download = async () => {
		if (subscriptionId) {
			try {
				setLoading(true);
				await downloadInvoice(subscriptionId);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	return (
		<div>
			<Container>
				<Paper className={successWrapper}>
					<PresentIcon className={icon} />
					<Box mt="1.5rem">
						<Typography variant="h5" className={bold}>
							{heading}
						</Typography>
					</Box>
					{data && (
						<Box mt="1rem">
							<Typography className={bold} align="center">
								{data}
							</Typography>
						</Box>
					)}
					<Box mt="1rem">
						<Typography className={bold} align="center">
							{text}
						</Typography>
					</Box>
					{subscriptionId && (
						<Box mt="1rem">
							<Button
								color="primary"
								variant="contained"
								startIcon={<GetAppIcon />}
								onClick={download}
								disabled={loading}
								endIcon={
									loading ? (
										<CircularProgress
											color="inherit"
											size={15}
										/>
									) : (
										<></>
									)
								}
							>
								Download Invoice
							</Button>
						</Box>
					)}
				</Paper>
			</Container>
		</div>
	);
};

export default PaymentSuccess;
