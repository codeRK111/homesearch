import { Box, Paper, Typography } from '@material-ui/core';

import { LeadReschedule } from '../../../model/lead.interface';
import React from 'react';
import { dateFormat } from '../../../utils/render';

interface ILeadsReschedules {
	reschedules: LeadReschedule[];
}

export const LeadsReschedules: React.FC<ILeadsReschedules> = ({
	reschedules,
}) => {
	return (
		<>
			{reschedules.map((c, i) => (
				<Paper key={c._id}>
					<Box p="0.5rem" display={'flex'} alignItems="center">
						<div
							style={{
								width: 5,
								height: 5,
								background: i === 0 ? 'red' : 'transparent',
								marginRight: '1rem',
								borderRadius: '50%',
							}}
						></div>
						<Typography variant="caption">
							<b>
								{dateFormat.day(c.reschedule).toUpperCase()}
								&nbsp;
								{dateFormat.time(c.reschedule)} <br />
								{dateFormat.fullDate(c.reschedule)}
							</b>
						</Typography>
					</Box>
				</Paper>
			))}
		</>
	);
};
