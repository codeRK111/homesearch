import { ILead, LeadProposalStatus } from '../../model/lead.interface';
import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import SendQueryDialog from '../Dialogs/sendQuery';

type SendProposalProps = {
	lead: ILead;
};
const SendProposal: React.FC<SendProposalProps> = ({ lead }) => {
	const [open, setOpen] = useState(false);

	const onButtonClick = () => {
		setOpen(true);
	};

	const renderButton = () => {
		switch (lead.proposalStatus) {
			case LeadProposalStatus.Sent:
				return (
					<Button variant="contained" size="small" disabled>
						Already Sent
					</Button>
				);
			case LeadProposalStatus.NotSent:
				return (
					<Button
						startIcon={<SendIcon />}
						variant="contained"
						size="small"
						onClick={onButtonClick}
					>
						Send
					</Button>
				);
			case LeadProposalStatus.Accepted:
				return (
					<Button
						startIcon={<SendIcon />}
						variant="contained"
						color="primary"
						size="small"
						disabled
					>
						Accepted
					</Button>
				);
			case LeadProposalStatus.Declined:
				return (
					<Button
						startIcon={<SendIcon />}
						variant="contained"
						color="secondary"
						size="small"
						onClick={onButtonClick}
					>
						Resend
					</Button>
				);

			default:
				break;
		}
	};

	return (
		<>
			<SendQueryDialog lead={lead} open={open} toggleOpen={setOpen} />

			{renderButton()}
		</>
	);
};

export default SendProposal;
