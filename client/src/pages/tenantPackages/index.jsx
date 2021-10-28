import {
	Box,
	Chip,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';

import AbsentIcon from '@material-ui/icons/Cancel';
import Nav from '../../components/v2/pageNav/nav.component';
import PresentIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	packageWrapper: {
		padding: '1rem',
		backgroundColor: 'transparent',
		borderRadius: 20,
	},
	line: {
		flex: 1,
		width: '100%',
		height: 1,
		background: '#cccccc',
	},
	price: {
		fontSize: '1.3rem',
	},
	specificationWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1rem',
		'& > span': {
			marginLeft: '1rem',
			fontSize: '1rem',
			fontWeight: 600,
			letterSpacing: 1,
			lineHeight: 1.5,
		},
	},
	button: {
		border: `2px solid ${theme.palette.primary.main}`,
		backgroundColor: 'transparent',
		padding: '1rem 2rem',
		fontSize: '1rem',
		textTransform: 'uppercase',
		letterSpacing: 1,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			color: '#ffffff',
		},
	},
	bold: {
		fontWeight: 700,
		letterSpacing: 1,
	},
	lineThrough: {
		textDecoration: 'line-through',
	},
}));

const TenantPackagePage = (props) => {
	const {
		packageWrapper,
		line,
		price,
		specificationWrapper,
		button,
		bold,
		lineThrough,
	} = useStyles();
	const history = useHistory();
	const getQueryString = () => {
		const query = new URLSearchParams(props.location.search);
		return query.get('hs');
	};

	const onBuy = (packageName) => () => {
		const redirectURL = getQueryString()
			? `/confirm-package/${packageName}?hs=${getQueryString()}`
			: `/confirm-package/${packageName}`;
		history.push(redirectURL);
	};

	console.log(getQueryString());

	return (
		<div>
			<Nav />
			<Box mt="2rem" mb="2rem">
				<Container>
					<Typography
						variant="h4"
						align="center"
						component="h1"
						gutterBottom
					>
						Packages
					</Typography>
					<Box mt="2rem">
						<Grid container spacing={3} justify="center">
							<Grid item xs={12} md={4}>
								<Paper className={packageWrapper} elevation={5}>
									<Typography
										variant="h6"
										align="center"
										gutterBottom
										className={bold}
									>
										Bhubaneswar
									</Typography>
									<Typography
										variant="caption"
										align="center"
										gutterBottom
										display="block"
									>
										Starting at
									</Typography>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										mt="1rem"
									>
										<div className={line}></div>
										<Chip
											style={{ width: 150 }}
											label={
												<Box
													display="flex"
													alignItems="center"
												>
													<Typography
														variant="caption"
														className={lineThrough}
													>
														&#x20B9; 3499
													</Typography>
													<Box ml="0.3rem">
														<b className={price}>
															&#x20B9; 2999
														</b>
													</Box>
												</Box>
											}
											variant="outlined"
										/>
										<div className={line}></div>
									</Box>
									<Box mt="1rem">
										<Grid
											container
											spacing={0}
											justify="center"
										>
											<Grid item xs={12} md={8}>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>
														Get Information Of Upto
														5 Properties
													</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>
														Verfifed Properties
													</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>
														Properties From Owner
													</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>Site Visit</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>No Brokerage</span>
												</div>
											</Grid>
										</Grid>
										<Box
											mt="1rem"
											display="flex"
											justifyContent="center"
										>
											<button
												className={button}
												onClick={onBuy('b')}
											>
												Buy Now
											</button>
										</Box>
									</Box>
								</Paper>
							</Grid>
							<Grid item xs={12} md={4}>
								<Paper className={packageWrapper} elevation={5}>
									<Typography
										variant="h6"
										align="center"
										gutterBottom
										className={bold}
									>
										Other Cities
									</Typography>
									<Typography
										variant="caption"
										align="center"
										gutterBottom
										display="block"
									>
										Starting at
									</Typography>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										mt="1rem"
									>
										<div className={line}></div>
										<Chip
											label={
												<Box
													display="flex"
													alignItems="center"
												>
													<Typography
														variant="caption"
														className={lineThrough}
													>
														&#x20B9; 1499
													</Typography>
													<Box ml="0.3rem">
														<b className={price}>
															&#x20B9; 999
														</b>
													</Box>
												</Box>
											}
											variant="outlined"
										/>
										<div className={line}></div>
									</Box>
									<Box mt="1rem">
										<Grid
											container
											spacing={0}
											justify="center"
										>
											<Grid item xs={12} md={8}>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>
														Get Information Of Upto
														5 Properties
													</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>
														Verfifed Properties
													</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>
														Properties From Owner
													</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<AbsentIcon color="secondary" />
													<span>Site Visit</span>
												</div>
												<div
													className={
														specificationWrapper
													}
												>
													<PresentIcon color="primary" />
													<span>No Brokerage</span>
												</div>
											</Grid>
										</Grid>
										<Box
											mt="1rem"
											display="flex"
											justifyContent="center"
										>
											<button
												className={button}
												onClick={onBuy('oc')}
											>
												Buy Now
											</button>
										</Box>
									</Box>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</div>
	);
};

export default TenantPackagePage;
