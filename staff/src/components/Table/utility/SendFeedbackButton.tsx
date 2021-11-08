import { Button, CircularProgress } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import { PaymentReviewStatus } from '../../../model/subscription.interface';
import { asyncSendFeedbackForm } from '../../../API/payment';

interface IPropertyLeadStatusButton {
	id: string;
	initialStatus: PaymentReviewStatus;
}

const SendSubscriptionFeedbackButton: React.FC<IPropertyLeadStatusButton> =
	memo(({ id, initialStatus }) => {
		const [loading, setLoading] = useState(false);
		const [status, setStatus] = useState(initialStatus);
		const { setSnackbar } = useRepositoryAction(ResourceType.UI);

		const renderFeedbackStatus = (status: PaymentReviewStatus) => {
			switch (status) {
				case PaymentReviewStatus.Received:
					return (
						<Button
							variant="contained"
							size="small"
							color="primary"
							disabled
						>
							Received
						</Button>
					);
				case PaymentReviewStatus.Sent:
					return (
						<Button
							variant="contained"
							size="small"
							color="primary"
							disabled
						>
							Sent
						</Button>
					);

				default:
					return (
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={onClick}
						>
							Send
						</Button>
					);
			}
		};

		const onClick = async () => {
			try {
				setLoading(true);
				const resp = await asyncSendFeedbackForm(id);
				setStatus(resp.paymentReviewStatus);
				setLoading(false);
			} catch (error: any) {
				setLoading(false);
				setSnackbar({
					open: true,
					message: error.message,
					severity: 'error',
				});
			}
		};

		// useEffect(() => {
		// 	return () => {
		// 		setStatus(initialStatus);
		// 	};
		// }, [initialStatus]);
		return (
			<>
				{loading ? (
					<CircularProgress size={20} color="inherit" />
				) : (
					renderFeedbackStatus(status)
				)}
			</>
		);
	});

export default SendSubscriptionFeedbackButton;
