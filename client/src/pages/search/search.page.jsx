import React from 'react';
import {
	Box,
	Paper,
	Grid,
	FormControlLabel,
	Checkbox,
	Divider,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';

// Custom Components
import AppBar from '../../components/appBar/appBar.component';
import ResultCard from '../../components/searchResultCard/searchResultCard.component';
import Footer from '../../components/footer/footer.component';

// Styles
import useStyles from './search.styles';

const SearchPage = () => {
	const classes = useStyles();
	return (
		<Box>
			<AppBar />
			<Box className={classes.searchWrapper}>
				<p>You are looking in</p>
				<Paper className={classes.searchBoxWrapper} elevation={3}>
					<SearchIcon />
					<input
						type="text"
						className={classes.input}
						value="Patia"
					/>
				</Paper>
			</Box>
			<Box className={classes.resultsWrapper}>
				<p>
					{' '}
					<b>283</b> properties found for <b>Bhubaneswar</b>{' '}
				</p>
				<Grid container spacing={3}>
					<Grid item md={9}>
						{Array.from(Array(6).keys()).map((c) => (
							<Box mt={c && '2rem'} key={c}>
								<ResultCard />
							</Box>
						))}
						<Box mt="2rem">
							<Paper>
								<Box
									p="1rem"
									display="flex"
									justifyContent="center"
								>
									<Pagination count={10} color="primary" />
								</Box>
							</Paper>
						</Box>
					</Grid>
					<Grid item md={3}>
						<Box pl="1rem">
							<Paper>
								<Box p="1rem">
									<b>Property Type</b>
									<Box mt="0.5rem" mb="0.5rem">
										<Divider />
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="Flat"
										/>
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="Land"
										/>
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="Independent House"
										/>
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="Hostel"
										/>
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="PG"
										/>
									</Box>
								</Box>
							</Paper>
						</Box>
						<Box pl="1rem" mt="1rem">
							<Paper>
								<Box p="1rem">
									<b>Budget</b>
									<Box mt="0.5rem" mb="0.5rem">
										<Divider />
									</Box>
									<Box>
										<Box mt="0.5rem">
											<FormControl fullWidth>
												<InputLabel id="demo-simple-select-label">
													Min Price
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
												>
													<MenuItem value={10}>
														Ten
													</MenuItem>
													<MenuItem value={20}>
														Twenty
													</MenuItem>
													<MenuItem value={30}>
														Thirty
													</MenuItem>
												</Select>
											</FormControl>
										</Box>
										<Box mt="1rem">
											<FormControl fullWidth>
												<InputLabel id="demo-simple-select-label">
													Max Price
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
												>
													<MenuItem value={10}>
														Ten
													</MenuItem>
													<MenuItem value={20}>
														Twenty
													</MenuItem>
													<MenuItem value={30}>
														Thirty
													</MenuItem>
												</Select>
											</FormControl>
										</Box>
									</Box>
								</Box>
							</Paper>
						</Box>
						<Box pl="1rem" mt="1rem">
							<Paper>
								<Box p="1rem">
									<b>Bedrooms </b>
									<Box mt="0.5rem" mb="0.5rem">
										<Divider />
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="1"
										/>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="2"
										/>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="3"
										/>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="3.5"
										/>
									</Box>
								</Box>
							</Paper>
						</Box>
						<Box pl="1rem" mt="1rem">
							<Paper>
								<Box p="1rem">
									<b>Availability </b>
									<Box mt="0.5rem" mb="0.5rem">
										<Divider />
									</Box>
									<Box>
										<FormControlLabel
											control={<Checkbox name="flat" />}
											label="Ready to move"
										/>
									</Box>
								</Box>
							</Paper>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Footer />
			</Box>
		</Box>
	);
};

export default SearchPage;
