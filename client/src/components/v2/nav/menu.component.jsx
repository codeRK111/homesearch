import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: 180,
	},
	container: {
		display: 'flex',
	},
	paper: {
		margin: theme.spacing(1),
	},
	svg: {
		width: 100,
		height: 100,
	},
	polygon: {
		fill: theme.palette.common.white,
		stroke: theme.palette.divider,
		strokeWidth: 1,
	},
}));

export default function SimpleGrow({ checked }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Grow in={checked}>
					<Paper elevation={4} className={classes.paper}>
						<svg className={classes.svg}>
							<polygon
								points="0,100 50,00, 100,100"
								className={classes.polygon}
							/>
						</svg>
					</Paper>
				</Grow>
				{/* Conditionally applies the timeout prop to change the entry speed. */}
				<Grow
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<Paper elevation={4} className={classes.paper}>
						<svg className={classes.svg}>
							<polygon
								points="0,100 50,00, 100,100"
								className={classes.polygon}
							/>
						</svg>
					</Paper>
				</Grow>
			</div>
		</div>
	);
}
