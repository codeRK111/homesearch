import { Box, Divider, Grid, SvgIcon } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CountUp from 'react-countup';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fullHeight: {
			height: '100%',
		},
		icon: {
			fontSize: '3rem',
			color: theme.palette.primary.main,
		},
		cursor: {
			cursor: 'pointer',
		},
		selected: {
			border: `4px solid ${theme.palette.primary.main}`,
		},
	})
);

interface IDashboardCard {
	label: string;
	value: number;
	Icon?: typeof SvgIcon;
	clickValue: any;
	onClick: (value: any) => void;
	selected?: boolean;
}

export default function DashboardCard({
	label,
	value,
	clickValue,
	onClick,
	selected,
}: IDashboardCard) {
	const classes = useStyles();

	return (
		<Card
			className={clsx(classes.fullHeight, classes.cursor, {
				[classes.selected]: selected,
			})}
			elevation={1}
			onClick={() => onClick(clickValue)}
		>
			<Grid container className={classes.fullHeight}>
				<Grid item xs={12}>
					<CardContent>
						<Typography
							variant="h6"
							align="center"
							style={{ fontSize: '1.1rem' }}
						>
							{label}
						</Typography>
					</CardContent>
					<Box mb="1rem">
						<Divider />
					</Box>

					<Typography variant="h5" align="center" color="primary">
						<CountUp
							start={0}
							end={value}
							duration={1}
							onEnd={() => console.log('Ended! 👏')}
							onStart={() => console.log('Started! 💨')}
							delay={0}
						>
							{({ countUpRef, start }) => (
								<div>
									<span ref={countUpRef} />
								</div>
							)}
						</CountUp>
					</Typography>
				</Grid>
			</Grid>
		</Card>
	);
}
