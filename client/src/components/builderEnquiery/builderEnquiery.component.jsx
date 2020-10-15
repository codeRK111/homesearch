import React from 'react';
import { Grid, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	title: {
		color: theme.fontColor,
	},
	contact: {
		border: `1px solid ${theme.colorOne}`,
		padding: '0.8rem 2rem',
		color: theme.colorOne,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.colorOne,
			color: '#ffffff',
		},
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%',
	},
}));

const BuilderEnquiery = () => {
	const classes = useStyles();
	return (
		<div>
			<Grid container component="main">
				<Grid item xs={false} sm={false} md={6}>
					<Box>
						<img
							src={require('../../assets/tr.png')}
							alt=""
							srcset=""
							className={classes.image}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box
						p="1rem"
						display="flex"
						flexDirection="column"
						alignItems="center"
						mt="10rem"
						className={classes.inquuiryWrapper}
					>
						<h3>Contact us to sell or rent your projects</h3>
						<p className={classes.title}>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Ipsa quisquam doloribus, aspernatur dolor nemo
							dolorum a accusantium necessitatibus impedit
							asperiores.
						</p>
						<Box mt="1rem">
							<button className={classes.contact}>
								Contact Us
							</button>
						</Box>
						<Box mt="1rem">
							<Divider />
						</Box>
						<p>
							For more details call: <b>1234432198</b>
						</p>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default BuilderEnquiery;
