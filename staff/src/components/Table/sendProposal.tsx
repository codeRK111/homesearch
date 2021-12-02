import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { ILead } from '../../model/lead.interface';
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
	return (
		<>
			<SendQueryDialog lead={lead} open={open} toggleOpen={setOpen} />
			<Button
				startIcon={<SendIcon />}
				variant="contained"
				size="small"
				onClick={onButtonClick}
			>
				Send
			</Button>
		</>
	);
};

export default SendProposal;
