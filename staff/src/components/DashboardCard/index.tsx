import { Box, Divider, Grid, SvgIcon } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fullHeight: {
			height: '100%',
		},
		icon: {
			fontSize: '5rem',
			color: theme.palette.primary.main,
		},
	})
);

interface IDashboardCard {
	label: string;
	value: number;
	Icon: typeof SvgIcon;
}

export default function DashboardCard({ label, value, Icon }: IDashboardCard) {
	const classes = useStyles();

	return (
		<Card className={classes.fullHeight}>
			<Grid container className={classes.fullHeight}>
				<Grid item xs={7}>
					<CardContent>
						<Typography component="h6" variant="h6" align="center">
							{label}
						</Typography>
					</CardContent>
					<Box mb="1rem">
						<Divider />
					</Box>
					<Typography variant="h3" align="center" color="primary">
						{value}
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							height: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							bgcolor: '#dad4d4',
						}}
					>
						<Icon className={classes.icon} />
					</Box>
				</Grid>
			</Grid>
		</Card>
	);
}
