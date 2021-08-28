import { Box, TextField } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function ProjectCard() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h5" component="h2">
					<Link>Project Title</Link>
				</Typography>
				<Box mt="1rem">
					<TextField
						label="Enter your remark"
						variant="filled"
						multiline={true}
						rows={3}
						fullWidth
					/>
				</Box>
				<Box mt="1rem">
					<Button variant="contained" color="primary">
						Submit
					</Button>
				</Box>
			</CardContent>
			<CardActions>
				<Button size="small">View Remarks</Button>
			</CardActions>
		</Card>
	);
}
