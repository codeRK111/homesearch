import { Grid, Typography } from '@material-ui/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	highlightWrapper: {
		width: '100%',
		height: 70,
		background: '#c3c1c1',
		transition:
			'background-color 200ms linear, width 200ms linear,height 200ms linear',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		'&:hover': {
			width: '110%',
			height: 80,
			background: '#dec029',
		},
		'& span': {
			fontWeight: 'bold',
			fontSize: '1.5vw',
		},
	},

	desc: {
		fontSize: '0.9rem',
	},
}));

const HighlightContainer = ({ value, title, ...otherProps }) => {
	const { highlightWrapper, desc } = useStyles();
	return (
		<Grid container spacing={1} style={{ position: 'relative' }}>
			<Grid item xs={6}>
				<div className={highlightWrapper}>
					<span>{value}</span>
				</div>
			</Grid>
			<Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
				<Typography className={desc}>{title}</Typography>
			</Grid>
		</Grid>
	);
};

export default HighlightContainer;
