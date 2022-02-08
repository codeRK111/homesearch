import {
	Box,
	Chip,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { capitalizeFirstLetter, toCurrency } from '../../../utils/render.utils';

import AbsentIcon from '@material-ui/icons/Cancel';
import BackdropLoader from '../../../components/v2/backdrop/loader';
import Nav from '../../../components/v2/pageNav/nav.component';
import PresentIcon from '@material-ui/icons/CheckCircle';
import { asyncGetMyPackages } from '../../../utils/asyncPackage';
import clsx from 'clsx';
import { useStyles } from '../../tenantPackages/package.style';

const MySubscriptions = () => {
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
	const [packageState, setPackageState] = useState({
		loading: false,
		data: [],
		error: '',
	});

	const fetchPackages = useCallback(async () => {
		try {
			setPackageState((prevState) => ({
				...prevState,
				error: '',
				loading: true,
			}));
			const resp = await asyncGetMyPackages();
			setPackageState((prevState) => ({
				...prevState,
				data: resp,
				loading: false,
			}));
		} catch (error) {
			setPackageState((prevState) => ({
				...prevState,
				loading: false,
				error: error.message,
			}));
		}
	}, []);

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	const { loading, data, error } = packageState;

	return (
		<>
			<BackdropLoader open={loading} />
			<Nav />
			<Container>
				<Box p="1rem">
					<Typography variant="h5" gutterBottom>
						My Packages
					</Typography>
					<Typography gutterBottom color="error">
						{error}
					</Typography>
					<Box mt="2rem">
						<Grid container spacing={3}>
							{packageState.data
								.map((b) => b.packageId)
								.map((c) => (
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
																		{
																			b.detail
																		}
																	</span>
																</div>
															)
														)}
													</Grid>
												</Grid>
											</Box>
										</Paper>
									</Grid>
								))}
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default MySubscriptions;
