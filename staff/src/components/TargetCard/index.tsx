import { Box, Paper, Typography } from '@material-ui/core';

import AssessmentIcon from '@material-ui/icons/Assessment';
import CountUp from 'react-countup';
import React from 'react';
import { SpaceBetween } from '../UI/Flex/index';
import useStyles from './targetCard.style';

interface ITargetCard {
	label: string;
	total: number;
	available: number;
}

const TargetCard: React.FC<ITargetCard> = ({ label, total, available }) => {
	const style = useStyles();
	return (
		<Paper className={style.wrapper}>
			<SpaceBetween>
				<Box className={style.iconWrapper}>
					<AssessmentIcon className={style.icon} />
				</Box>
				<Box ml="1rem">
					<Typography color="textPrimary" gutterBottom align="center">
						{label} - <b>{total}</b>
					</Typography>
					<Typography
						color="primary"
						gutterBottom
						variant="h4"
						align="center"
					>
						<CountUp
							start={0}
							end={available}
							duration={2}
							onEnd={() => console.log('Ended! 👏')}
							onStart={() => console.log('Started! 💨')}
							delay={0}
						>
							{({ countUpRef, start }) => (
								<span ref={countUpRef} />
							)}
						</CountUp>{' '}
					</Typography>
					<Typography
						variant="caption"
						display="block"
						align="center"
					>
						Remaining
					</Typography>
				</Box>
			</SpaceBetween>
		</Paper>
	);
};

export default TargetCard;
