import { Avatar, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { StaticPaths } from '../../../utils/render.utils';
import Ticker from 'react-ticker';
import { asyncGetTestimonials } from '../../../utils/asyncTestimonial';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	counterWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	paperWrapper: {
		margin: '1rem',
		width: 300,
		height: 400,
		padding: '1rem',
		overflow: 'auto',
		background: 'transparent',
		borderRadius: 20,
		[theme.breakpoints.up('sm')]: {
			width: 400,
			height: 450,
		},
	},
	title: {
		fontSize: '0.8rem',
		fontWeight: 'bold',
		marginTop: '1rem',
		color: '#847d7d',
		textAlign: 'center',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1rem',
		},
	},
	name: {
		fontSize: '1rem',
		fontWeight: 'bold',
		marginTop: '1rem',
		color: theme.utilColor,
		textAlign: 'center',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.2rem',
		},
	},
	counter: {
		height: 150,
		width: 150,
	},
}));

const Testimonials = () => {
	const styles = useStyles();
	const [data, setData] = useState({
		totalDocs: 0,
		testimonials: [],
	});

	const fetchTestimonials = useCallback(async () => {
		try {
			const resp = await asyncGetTestimonials({
				limit: 3,
				page: 1,
				status: 'active',
			});
			console.log({ resp });
			setData(resp);
		} catch (error) {}
	}, []);

	useEffect(() => {
		fetchTestimonials();
	}, [fetchTestimonials]);
	return (
		<>
			{data.testimonials.length > 0 && (
				<Ticker>
					{() => (
						<div style={{ display: 'flex' }}>
							{data.testimonials.map((c) => (
								<Paper
									className={styles.paperWrapper}
									elevation={10}
								>
									<div className={styles.counterWrapper}>
										<Avatar
											src={StaticPaths.testimonial(
												c.photo
											)}
											className={styles.counter}
											alt="Director"
										/>

										<Typography className={styles.title}>
											<i>{c.description}</i>
										</Typography>
										<Typography className={styles.name}>
											<i>- {c.name}</i>
										</Typography>
									</div>
								</Paper>
							))}
						</div>
					)}
				</Ticker>
			)}
		</>
	);
};

export default Testimonials;
