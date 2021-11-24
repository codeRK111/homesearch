import { Box, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PresentIcon from '@material-ui/icons/CheckCircle';
import React from 'react';

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

const PaymentSuccess = () => {
	const { successWrapper, icon, bold } = useStyles();

	return (
		<div>
			<Container>
				<Paper className={successWrapper}>
					<PresentIcon className={icon} />
					<Box mt="1.5rem">
						<Typography variant="h5" className={bold}>
							Payment Successful!
						</Typography>
					</Box>
					<Box mt="1rem">
						<Typography className={bold}>
							Our executive will contact with you soon.
						</Typography>
					</Box>
				</Paper>
			</Container>
		</div>
	);
};

export default PaymentSuccess;
