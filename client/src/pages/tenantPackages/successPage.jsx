import { Box, Container, Paper, Typography } from '@material-ui/core';

import PresentIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
}) => {
	const { successWrapper, icon, bold } = useStyles();

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
				</Paper>
			</Container>
		</div>
	);
};

export default PaymentSuccess;
