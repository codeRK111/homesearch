import { Box, Paper, Typography } from '@material-ui/core';

import { LeadAssigns } from '../../../model/lead.interface';
import React from 'react';
import { dateFormat } from '../../../utils/render';

interface ILeadAssigns {
	assigns: LeadAssigns[];
}

export const LeadAssignComponent: React.FC<ILeadAssigns> = ({ assigns }) => {
	return (
		<>
			{assigns.map((c, i) => (
				<Paper key={c._id}>
					<Box p="0.5rem">
						<Box display={'flex'} alignItems="center">
							<Typography variant="caption">
								{dateFormat.day(c.date).toUpperCase()}&nbsp;
								{dateFormat.time(c.date)} <br />
								{dateFormat.fullDate(c.date)}
							</Typography>
						</Box>
						<Typography style={{ fontSize: '0.8rem' }}>
							<b>{c.to.name}</b>
						</Typography>
					</Box>
				</Paper>
			))}
		</>
	);
};
