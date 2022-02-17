import { Avatar, Box, Chip, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import {
	getBuilderDetails,
	getProjectsOfABuilder,
} from '../../../utils/asyncBuilder';

import BackdropLoader from '../../../components/v2/backdrop/loader';
import BuilderImages from './carousal';
import Counter from './counter';
import CustomSlider from './projects';
import Directors from './directors';
import EmailIcon from '@material-ui/icons/Email';
import ErrorBackdrop from '../../../components/v2/backdropMessage';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import { parseDate } from '../../../utils/render.utils';
import useStyles from './builder.style';
import { withAsync } from '../../../hoc/withAsync';

const BuilderPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { slug },
	},
}) => {
	// Style
	const classes = useStyles();

	// API Cancel Token
	const cancelBuilderToken = useRef();

	// Builder Data
	const [builder, setBuilder] = useState(null);

	// Project data
	const [projectLoading, setProjectLoading] = useState(false);
	const [projectError, setProjectError] = useState('');
	const [projects, setProjects] = useState([]);

	// Fetch Projects
	const fetchProjects = useCallback(async (id) => {
		try {
			setProjectError('');
			setProjectLoading(true);
			const resp = await getProjectsOfABuilder(id);
			setProjects(resp);
			setProjectLoading(false);
		} catch (error) {
			setProjectLoading(false);
			setProjectError(error.message);
		}
	}, []);

	// Fetch Builder
	const fetchBuilder = useCallback(async () => {
		try {
			cancelBuilderToken.current = axios.CancelToken.source();
			const resp = await getBuilderDetails(
				slug,
				cancelBuilderToken.current,
				setLoading
			);
			setError(null);
			setBuilder(resp);
		} catch (error) {
			setBuilder(null);
			setError(error);
		}
	}, [slug, setLoading, setError]);

	React.useEffect(() => {
		fetchBuilder();

		return () => {
			if (cancelBuilderToken.current) {
				cancelBuilderToken.current.cancel();
			}
		};
	}, [fetchBuilder]);
	React.useEffect(() => {
		if (builder && builder.id) {
			fetchProjects(builder.id);
		}
	}, [fetchProjects, builder]);
	return (
		<div className={classes.wrapper}>
			<BackdropLoader open={loading} text="Loading Details ..." />
			{builder && (
				<>
					<Grid container justify="space-between" spacing={3}>
						<Grid item xs={12} md={4}>
							<Box display={'flex'} alignItems={'center'}>
								<Avatar
									alt="Builder Logo"
									src={`/assets/builders/${builder.logo}`}
								/>
								<Typography
									variant="h4"
									style={{ marginLeft: '0.5rem' }}
								>
									<b>{builder.developerName}</b>
								</Typography>
							</Box>
							<Box mt="1rem" display={'flex'}>
								{builder.cities.map((c) => (
									<Chip
										key={c.id}
										icon={<LocationCityIcon />}
										label={c.name}
										variant="outlined"
									/>
								))}
							</Box>
							<Box mt="0.5rem">
								<Typography variant="caption">
									Operation Since{' '}
									<b>{parseDate(builder.operatingSince)}</b>{' '}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={2}>
							<Box
								display={'flex'}
								alignItems={'center'}
								mt="0.5rem"
							>
								<PhoneIcon color="primary" />
								<Box ml="1rem">
									<Typography>
										{builder.phoneNumber}
									</Typography>
								</Box>
							</Box>
							<Box
								display={'flex'}
								alignItems={'center'}
								mt="0.5rem"
							>
								<EmailIcon color="primary" />
								<Box ml="1rem">
									<Typography>{builder.email}</Typography>
								</Box>
							</Box>
							<Box
								display={'flex'}
								alignItems={'center'}
								mt="0.5rem"
							>
								<LocationOnIcon color="primary" />
								<Box ml="1rem">
									<Typography>
										{builder.corporateOfficeAddress}
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<BuilderImages images={builder.photos} />
						</Grid>
						<Grid item xs={12}>
							<Typography
								variant="h4"
								gutterBottom
								align="center"
							>
								<b>About {builder.developerName}</b>
							</Typography>
							<Typography align="center">
								{builder.description}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Counter
								totalProjects={builder.totalProjects}
								underConstructionProjects={
									builder.underConstructionProjects
								}
								completedProjects={builder.completedProjects}
							/>
						</Grid>
						<Grid item xs={12}>
							<Box mt="1rem">
								<Typography
									variant="h4"
									gutterBottom
									align="center"
								>
									<b>Projects By {builder.developerName}</b>
								</Typography>
								<CustomSlider docs={projects} />
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box mt="1rem">
								<Typography
									variant="h4"
									gutterBottom
									align="center"
								>
									<b>Our Directors</b>
								</Typography>
								<Box mt="2rem">
									<Grid container justify="center">
										<Grid item xs={12} md={6}>
											<Directors
												directors={builder.directors}
											/>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</>
			)}
			<ErrorBackdrop open={!!error} message={error} />
		</div>
	);
};

export default withAsync(BuilderPage);
