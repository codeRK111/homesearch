import { Box, Paper, Typography } from '@material-ui/core';

import CountUp from 'react-countup';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import React from 'react';
import { SpaceBetween } from '../UI/Flex/index';
import clsx from 'clsx';
import { toHumanReadable } from '../../utils/render';
import useStyles from './targetCard.style';

interface ITargetCard {
	label: string;
	total: number;
	available: number;
}

const TargetCard: React.FC<ITargetCard> = ({ label, total, available }) => {
	const style = useStyles();
	return (
		<Paper
			className={clsx(style.wrapper, {
				[style.borderRed]: available > 0,
				[style.borderGreen]: available < 0,
			})}
		>
			<SpaceBetween>
				<Box className={style.iconWrapper}>
					<MonetizationOnIcon className={style.icon} />
				</Box>
				<Box ml="1rem">
					<Typography color="textPrimary" gutterBottom align="center">
						{label} - <b>{toHumanReadable(total)}</b>
					</Typography>
					<Typography
						color="primary"
						gutterBottom
						variant="h4"
						align="center"
					>
						<CountUp
							start={0}
							end={
								available < 0 ? Math.abs(available) : available
							}
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
						{available < 0 ? 'Ahead' : 'Remaining'}
					</Typography>
				</Box>
			</SpaceBetween>
		</Paper>
	);
};

export default TargetCard;
