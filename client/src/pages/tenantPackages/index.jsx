import { Box, Chip, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { capitalizeFirstLetter, toCurrency } from '../../utils/render.utils';

import AbsentIcon from '@material-ui/icons/Cancel';
import BackdropLoader from '../../components/v2/backdrop/loader';
import Nav from '../../components/v2/pageNav/nav.component';
import PresentIcon from '@material-ui/icons/CheckCircle';
import { asyncFetchPackages } from '../../utils/asyncPackage';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { useStyles } from './package.style';

const packageCategories = ['tenant', 'builder', 'realtor', 'owner', 'buyer'];

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
		ribbonWrapper,
		ribbon,
	} = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [packages, setPackages] = useState([]);
	const [displayPackages, setDisplayPackages] = useState([]);
	const [category, setCategory] = useState('tenant');
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
			setDisplayPackages(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (category) {
			const filteredPackages = packages.filter(
				(c) => c.category === category
			);
			setDisplayPackages(filteredPackages);
		} else {
			setDisplayPackages(packages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category]);

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	return (
		<div>
			<Nav />
			<BackdropLoader open={loading} text="Loading Packages ..." />
			<Box mt="2rem" mb="2rem">
				<>
					<Typography
						variant="h4"
						align="center"
						component="h1"
						gutterBottom
					>
						Packages
					</Typography>

					<Box mt="1rem" display={'flex'} justifyContent={'center'}>
						{packageCategories.map((c, i) => (
							<Chip
								key={i}
								label={capitalizeFirstLetter(c)}
								onClick={() => setCategory(c)}
								variant={
									category === c ? 'default' : 'outlined'
								}
								color={category === c ? 'primary' : 'default'}
							/>
						))}
					</Box>
					{displayPackages.length === 0 && !loading && (
						<Box mt="1rem">
							<Typography align="center" component="h1">
								No Package Found
							</Typography>
						</Box>
					)}
					<Box mt="2rem" p="1rem">
						<Grid container spacing={3} justify="center">
							{displayPackages.map((c) => (
								<Grid item xs={12} md={3}>
									<Paper
										className={clsx(packageWrapper, {
											[popularPackageWrapper]:
												c.mostPopular,
										})}
										elevation={5}
									>
										{c.category && (
											<div className={ribbonWrapper}>
												<div className={ribbon}>
													{capitalizeFirstLetter(
														c.category
													)}
												</div>
											</div>
										)}
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
											flex={1}
										>
											<Box
												display={'flex'}
												flexDirection={'column'}
												justifyContent={'flex-end'}
											>
												<button
													className={button}
													onClick={onBuy(c.id)}
												>
													Buy Now
												</button>
											</Box>
										</Box>
									</Paper>
								</Grid>
							))}
						</Grid>
					</Box>
				</>
			</Box>
		</div>
	);
};

export default TenantPackagePage;
