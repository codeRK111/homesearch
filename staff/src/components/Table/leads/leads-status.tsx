import { Box, Paper, Typography } from '@material-ui/core';

import { LeadStatuses } from '../../../model/lead.interface';
import React from 'react';
import { dateFormat } from '../../../utils/render';

interface ILeadStatuses {
	statuses: LeadStatuses[];
}

export const LeadStatus: React.FC<ILeadStatuses> = ({ statuses }) => {
	return (
		<>
			{statuses.map((c, i) => (
				<Paper key={c._id}>
					<Box p="0.5rem">
						<Box display={'flex'} alignItems="center">
							<Typography variant="caption">
								{dateFormat.day(c.date).toUpperCase()}&nbsp;
								{dateFormat.time(c.date)} <br />
								{dateFormat.fullDate(c.date)}
							</Typography>
							<Box ml="1rem">
								<Typography style={{ fontSize: '0.7rem' }}>
									<b>{c.from.name}</b>
								</Typography>
							</Box>
						</Box>
						<Typography style={{ fontSize: '0.8rem' }}>
							<b>{c.value}</b>
						</Typography>
					</Box>
				</Paper>
			))}
		</>
	);
};
