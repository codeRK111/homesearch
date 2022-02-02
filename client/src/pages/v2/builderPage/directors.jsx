import { Avatar, Grid, Typography } from '@material-ui/core';

import React from 'react';
import { StaticPaths } from '../../../utils/render.utils';
import Ticker from 'react-ticker';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	counterWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	counter: {
		height: 150,
		width: 150,
	},
	title: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
		marginTop: '0.5rem',
		color: '#847d7d',
	},
}));

const Directors = ({ directors }) => {
	const styles = useStyles();
	return (
		<>
			<Ticker>
				{() => (
					<Grid container spacing={3} justify="center">
						{directors.map((c) => (
							<Grid item xs={12} md={3} key={c._id}>
								<div className={styles.counterWrapper}>
									<Avatar
										src={StaticPaths.builder(c.image)}
										className={styles.counter}
										alt="Director"
									/>

									<Typography className={styles.title}>
										{c.name}
									</Typography>
								</div>
							</Grid>
						))}
					</Grid>
				)}
			</Ticker>
		</>
	);
};

export default Directors;
