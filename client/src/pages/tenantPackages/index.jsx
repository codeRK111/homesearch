import {
	Box,
	Chip,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import AbsentIcon from '@material-ui/icons/Cancel';
import BackdropLoader from '../../components/v2/backdrop/loader';
import Nav from '../../components/v2/pageNav/nav.component';
import PresentIcon from '@material-ui/icons/CheckCircle';
import { asyncFetchPackages } from '../../utils/asyncPackage';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { toCurrency } from '../../utils/render.utils';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	packageWrapper: {
		padding: '1rem',
		backgroundColor: 'transparent',
		borderRadius: 20,
		height: '100%',
		boxSizing: 'border-box',

		position: 'relative',
	},
	popularPackageWrapper: {
		border: `3px solid ${theme.palette.primary.main}`,
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
	mostPopular: {
		position: 'absolute',
		padding: '0.5rem 1rem',
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff',
		fontSize: '0.8rem',
		borderRadius: 5,
		left: '50%',
		top: 0,
		transform: 'translate(-50%, -50%)',
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
		mostPopular,
		popularPackageWrapper,
	} = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [packages, setPackages] = useState([]);
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

	const fetchPackages = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await asyncFetchPackages();
			setPackages(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	return (
		<div>
			<Nav />
			<BackdropLoader open={loading} text="Loading Packages ..." />
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
							{packages.map((c) => (
								<Grid item xs={12} md={4}>
									<Paper
										className={clsx(packageWrapper, {
											[popularPackageWrapper]:
												c.mostPopular,
										})}
										elevation={5}
									>
										{c.mostPopular && (
											<Box className={mostPopular}>
												Most Popular
											</Box>
										)}
										<Box mt="2rem"></Box>
										<Typography
											variant="h6"
											align="center"
											gutterBottom
											className={bold}
										>
											{c.name}
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
															className={
																lineThrough
															}
														>
															&#x20B9;{' '}
															{toCurrency(
																c.actualPrice
															)}
														</Typography>
														<Box ml="0.3rem">
															<b
																className={
																	price
																}
															>
																&#x20B9;{' '}
																{toCurrency(
																	c.price
																)}
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
												<Grid item xs={12} md={10}>
													{c.packageDetails.map(
														(b) => (
															<div
																className={
																	specificationWrapper
																}
																key={b._id}
															>
																{b.detailType ===
																'present' ? (
																	<PresentIcon color="primary" />
																) : (
																	<AbsentIcon color="secondary" />
																)}

																<span>
																	{b.detail}
																</span>
															</div>
														)
													)}
												</Grid>
											</Grid>
										</Box>
										<Box
											mt="1rem"
											display="flex"
											justifyContent="center"
											style={{ position: 'relative' }}
										>
											<button
												className={button}
												onClick={onBuy(c.id)}
											>
												Buy Now
											</button>
										</Box>
									</Paper>
								</Grid>
							))}
						</Grid>
					</Box>
				</Container>
			</Box>
		</div>
	);
};

export default TenantPackagePage;
