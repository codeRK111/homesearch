import { Avatar, Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Iframe from 'react-iframe';

const useStyles = makeStyles((theme) => ({
	image: {
		maxHeight: '100%',
		width: '100%',
		objectFit: 'cover',
	},
	priceWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.57)',
		color: '#ffffff',
		padding: '0.4rem',
		fontSize: '12px',
		fontWeight: 600,
	},
	location: {
		color: theme.fontColor,
	},
	locationIcon: {
		color: theme.colorTwo,
		fontSize: '14px',
	},
	avatar: {
		backgroundColor: theme.colorOne,
		width: '100px',
		height: '100px',
	},
	title: {
		padding: 0,
		margin: 0,
	},
	callIcon: {
		fontSize: '1rem',
	},
	text: {
		color: theme.fontColor,
		lineHeight: 1.5,
		fontSize: '1.1rem',
	},
	hypen: {
		height: '4px',
		width: '15px',
		backgroundColor: theme.colorOne,
		borderRadius: 3,
		marginRight: '0.5rem',
	},
	seeAll: {
		border: `1px solid ${theme.colorOne}`,
		padding: '0.8rem 2rem',
		color: theme.colorOne,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.colorOne,
			color: '#ffffff',
		},
	},
}));

const Testimonial = () => {
	const classes = useStyles();
	return (
		<div>
			<Box mt="1rem">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Grid container spacing={3}>
							{[1, 2, 3, 4].map((_, i) => (
								<Grid item xs={12} md={3} key={i}>
									<Paper
										className={classes.cardWrapper}
										elevation={4}
									>
										<Box
											display="flex"
											flexDirection="column"
											alignItems="center"
											p="1rem"
										>
											<Avatar className={classes.avatar}>
												<img
													src={require('../../assets/face.jpeg')}
													alt="face"
												/>
											</Avatar>
											<Box>
												<p className={classes.text}>
													<i>
														Lorem ipsum dolor sit
														amet consectetur
														adipisicing elit. Ipsa
														reprehenderit molestiae
														hic fuga pariatur
														architecto accusamus
														iste eligendi quaerat
														soluta?
													</i>
												</p>
											</Box>
											<Box
												display="flex"
												alignItems="center"
											>
												<div
													className={classes.hypen}
												></div>
												<b>Avesh Khan</b>
											</Box>
										</Box>
									</Paper>
								</Grid>
							))}
						</Grid>
					</Grid>
					{/* <Grid item xs={12} md={6}>
						<Iframe
							url="http://www.youtube.com/embed/xDMP3i36naA"
							width="100%"
							height="100%"
							id="myId"
							className="myClassname"
							display="initial"
							position="relative"
						/>
					</Grid> */}
				</Grid>
				<Box mt="2rem" display="flex" justifyContent="center">
					<button className={classes.seeAll}>See all &#8594;</button>
				</Box>
			</Box>
		</div>
	);
};

export default Testimonial;
