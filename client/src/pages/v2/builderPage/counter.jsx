import { Grid, Typography } from '@material-ui/core';

import CountUp from 'react-countup';
import React from 'react';
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
		borderRadius: '50%',
		border: `4px solid ${theme.palette.primary.main}`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& span': {
			fontSize: '2rem',
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		marginTop: '1rem',
		color: '#847d7d',
	},
}));

const Counter = ({
	totalProjects,
	underConstructionProjects,
	completedProjects,
}) => {
	const styles = useStyles();
	return (
		<>
			<Grid container spacing={3} justify="center">
				<Grid item xs={12} md={3}>
					<div className={styles.counterWrapper}>
						<div className={styles.counter}>
							<CountUp
								start={0}
								end={totalProjects}
								duration={2}
								onEnd={() => console.log('Ended! 👏')}
								onStart={() => console.log('Started! 💨')}
								delay={0}
							>
								{({ countUpRef, start }) => (
									<span ref={countUpRef} />
								)}
							</CountUp>
						</div>
						<Typography className={styles.title}>
							Total Projects
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} md={3}>
					<div className={styles.counterWrapper}>
						<div className={styles.counter}>
							<span>{completedProjects}</span>
						</div>
						<Typography className={styles.title}>
							Completed Projects
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} md={3}>
					<div className={styles.counterWrapper}>
						<div className={styles.counter}>
							<span>{underConstructionProjects}</span>
						</div>
						<Typography className={styles.title}>
							Under construction Projects
						</Typography>
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default Counter;
