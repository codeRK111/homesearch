import { Box, Chip, Grid, Typography } from '@material-ui/core';

import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import useGlobalStyle from '../../../common.style';
import useStyles from './plan.style';

const PlanPage = () => {
	const classes = useStyles();
	const gClasses = useGlobalStyle();
	return (
		<div style={{ boxSizing: 'border-box' }}>
			<Nav />
			<Box mt="2rem">
				<Typography variant="h5" align="center">
					Our Packages
				</Typography>
			</Box>
			<Box className={classes.planWrapper}>
				<Grid container spacing={3} justify={'center'}>
					<Grid item xs={12} md={3}>
						<Box className={classes.plan}>
							<Box className={gClasses.justifyCenter}>
								<div className={classes.priceWrapper}>
									<span>₹1000</span>
								</div>
							</Box>
							<Box mt="1rem" mb="1rem">
								<Typography variant="h5" align="center">
									Diamond
								</Typography>
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="1rem"
							>
								<div className={classes.line}></div>
								<Chip
									label="Package Specifications"
									variant="outlined"
								/>
								<div className={classes.line}></div>
							</Box>
							<Box mt="1rem">
								{[...new Array(10)].map((c, i) => (
									<Box
										display="flex"
										alignItems="center"
										key={i}
										mt="0.3rem"
									>
										<div
											className={classes.bulletPoint}
										></div>
										<Typography variant="caption">
											Bacon ipsum dolor amet short ribs
											brisket Bacon ipsum dolor amet short
											ribs brisket
										</Typography>
									</Box>
								))}
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="1.5rem"
							>
								<button className={classes.button}>
									Pay ₹1000
								</button>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={3}>
						<Box className={classes.plan}>
							<Box className={gClasses.justifyCenter}>
								<div className={classes.priceWrapper}>
									<span>₹500</span>
								</div>
							</Box>
							<Box mt="1rem" mb="1rem">
								<Typography variant="h5" align="center">
									Gold
								</Typography>
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="1rem"
							>
								<div className={classes.line}></div>
								<Chip
									label="Package Specifications"
									variant="outlined"
								/>
								<div className={classes.line}></div>
							</Box>
							<Box mt="1rem">
								{[...new Array(10)].map((c, i) => (
									<Box
										display="flex"
										alignItems="center"
										key={i}
										mt="0.3rem"
									>
										<div
											className={classes.bulletPoint}
										></div>
										<Typography variant="caption">
											Bacon ipsum dolor amet short ribs
											brisket Bacon ipsum dolor amet short
											ribs brisket
										</Typography>
									</Box>
								))}
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="1.5rem"
							>
								<button className={classes.button}>
									Pay ₹500
								</button>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={3}>
						<Box className={classes.plan}>
							<Box className={gClasses.justifyCenter}>
								<div className={classes.priceWrapper}>
									<span>₹300</span>
								</div>
							</Box>
							<Box mt="1rem" mb="1rem">
								<Typography variant="h5" align="center">
									Silver
								</Typography>
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="1rem"
							>
								<div className={classes.line}></div>
								<Chip
									label="Package Specifications"
									variant="outlined"
								/>
								<div className={classes.line}></div>
							</Box>
							<Box mt="1rem">
								{[...new Array(10)].map((c, i) => (
									<Box
										display="flex"
										alignItems="center"
										key={i}
										mt="0.3rem"
									>
										<div
											className={classes.bulletPoint}
										></div>
										<Typography variant="caption">
											Bacon ipsum dolor amet short ribs
											brisket Bacon ipsum dolor amet short
											ribs brisket
										</Typography>
									</Box>
								))}
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="1.5rem"
							>
								<button className={classes.button}>
									Pay ₹300
								</button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default PlanPage;
