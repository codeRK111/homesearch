import { CircularProgress, IconButton } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';
import { UpdateInvoiceData, asyncupdateInvoice } from '../../../API/payment';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface IPropertyLeadStatusButton {
	id: string;
	initialStatus: UpdateInvoiceData['paymentStatus'];
}

const ChangePaymentStatus: React.FC<IPropertyLeadStatusButton> = memo(
	({ id, initialStatus }) => {
		const [loading, setLoading] = useState(false);
		const [status, setStatus] =
			useState<UpdateInvoiceData['paymentStatus']>(initialStatus);
		const { setSnackbar } = useRepositoryAction(ResourceType.UI);

		const onClick = async () => {
			try {
				setLoading(true);
				const resp = await asyncupdateInvoice(id, {
					paymentStatus: status === 'paid' ? 'unpaid' : 'paid',
				} as UpdateInvoiceData);
				setStatus(resp.paymentStatus);
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
					<IconButton onClick={onClick}>
						{status === 'paid' ? (
							<CheckCircleIcon color="primary" />
						) : (
							<CancelIcon />
						)}
					</IconButton>
				)}
			</>
		);
	}
);

export default ChangePaymentStatus;
