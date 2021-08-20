import { Box, CardMedia, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import ImageLightBox from '../../../components/v2/lightBox';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import byBHK from '../../../assets/icons/byBHK.svg';
import byType from '../../../assets/icons/byType.svg';
import byUnit from '../../../assets/icons/byUnit.svg';
import clsx from 'clsx';
import { getProjectProperty } from '../../../utils/async';
import noImage from '../../../assets/no-image.jpg';
import useGlobalStyles from '../../../common.style';
import useStyles from './projectDetailsPage.style';

const Properties = ({ project }) => {
	let cancelToken = useRef();
	const [filterType, setFilterType] = useState('type');
	const [open, setOpen] = useState(false);
	const [properties, setProperties] = useState([]);
	const [property, selectedProperty] = useState(null);
	const [loading, setLoading] = useState(false);
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const onFilterClick = (type) => () => {
		setFilterType(type);
	};
	const onTitleClickClick = (property) => () => {
		selectedProperty(property);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (project) {
			cancelToken.current = axios.CancelToken.source();
			getProjectProperty(
				{
					project: project.id,
					type: filterType,
				},
				cancelToken.current,
				setLoading
			)
				.then((resp) => {
					setProperties(resp);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [project, filterType]);

	const renderTitles = (c) => {
		switch (project.projectType) {
			case 'flat':
			case 'independenthouse':
				return (
					<Box
						mb="1rem"
						key={c.id}
						className={classes.propertyTitle}
						onClick={onTitleClickClick(c)}
					>
						{c.tower && (
							<Typography variant="caption" display="block">
								<Link
									to={`/project-property/${c._id}`}
									target="_blank"
									className={clsx(
										globalClasses.bold,
										globalClasses.colorPrimary
									)}
								>
									{c.tower.name}
								</Link>
							</Typography>
						)}
						{c.speciality && (
							<Typography
								variant="caption"
								display="block"
								className={clsx(globalClasses.colorUtil)}
							>
								{c.speciality.name}
							</Typography>
						)}

						<Typography
							variant="caption"
							display="block"
							className={clsx(globalClasses.colorUtil)}
						>
							{c.superBuiltupArea} sqft
						</Typography>
						<Typography
							variant="caption"
							display="block"
							className={clsx(globalClasses.colorUtil)}
						>
							{c.numberOfBedrooms}Bed-
							{c.numberOfToilets} Bath
						</Typography>
						{filterType === 'unit' && (
							<Typography
								variant="caption"
								display="block"
								className={clsx(globalClasses.colorUtil)}
							>
								{c.numberOfUnits} Units
							</Typography>
						)}
					</Box>
				);
			case 'land':
				return (
					<Box
						mb="1rem"
						key={c.id}
						className={classes.propertyTitle}
						onClick={onTitleClickClick(c)}
					>
						{c.title && (
							<Typography variant="caption" display="block">
								<Link
									to={`/project-property/${c._id}`}
									target="_blank"
									className={clsx(
										globalClasses.bold,
										globalClasses.colorPrimary
									)}
								>
									{c.title}
								</Link>
							</Typography>
						)}
						{c.speciality && (
							<Typography
								variant="caption"
								display="block"
								className={clsx(globalClasses.colorUtil)}
							>
								{c.speciality.name}
							</Typography>
						)}
						<Typography
							variant="caption"
							display="block"
							className={clsx(globalClasses.colorUtil)}
						>
							<span>{c.plotArea} SqFt &nbsp;&nbsp; </span>
						</Typography>

						<Typography
							variant="caption"
							display="block"
							className={clsx(globalClasses.colorUtil)}
						>
							{c.price / 100000}L
						</Typography>
						{filterType === 'unit' && (
							<Typography
								variant="caption"
								display="block"
								className={clsx(globalClasses.colorUtil)}
							>
								{c.numberOfUnits} Units
							</Typography>
						)}
					</Box>
				);

			default:
				break;
		}
	};

	const floorPlanImage =
		property && property.floorPlan
			? `/assets/projects/${property.floorPlan}`
			: noImage;

	return (
		<Box mt="2rem" className={classes.floorPlanWrapper}>
			{/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
			<Grid container spacing={1}>
				<Grid item xs={12} md={5}>
					<Box className={globalClasses.justifySpaceAround}>
						<Box
							className={clsx(classes.planTypeWrapper, {
								[classes.planSelected]: filterType === 'type',
							})}
							onClick={onFilterClick('type')}
						>
							<img src={byType} alt="Unit" />
							<Typography
								variant="caption"
								className={globalClasses.bold}
							>
								By Type
							</Typography>
						</Box>
						<Box
							className={clsx(classes.planTypeWrapper, {
								[classes.planSelected]: filterType === 'unit',
							})}
							onClick={onFilterClick('unit')}
						>
							<img src={byUnit} alt="Unit" />
							<Typography
								variant="caption"
								className={globalClasses.bold}
							>
								By Unit
							</Typography>
						</Box>
						{project.projectType !== 'land' && (
							<Box
								className={clsx(classes.planTypeWrapper, {
									[classes.planSelected]:
										filterType === 'bhk',
								})}
								onClick={onFilterClick('bhk')}
							>
								<img src={byBHK} alt="Unit" />
								<Typography
									variant="caption"
									className={globalClasses.bold}
								>
									By BHK
								</Typography>
							</Box>
						)}
					</Box>
					<Box mt="2rem">
						<Box className={classes.floorPlanNameWrapper}>
							{loading ? (
								<Box>
									<Box mb="1rem">
										<Skeleton
											variant="rect"
											width={'100%'}
											height={70}
										/>
									</Box>
									<Box mb="1rem">
										<Skeleton
											variant="rect"
											width={'100%'}
											height={70}
										/>
									</Box>
									<Box mb="1rem">
										<Skeleton
											variant="rect"
											width={'100%'}
											height={70}
										/>
									</Box>
								</Box>
							) : (
								properties.map((c) => renderTitles(c))
							)}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={false} md={1}></Grid>
				<Grid item xs={12} md={5}>
					{loading ? (
						<Box
							display="flex"
							alignItems="center"
							width="100%"
							height="100%"
						>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={300}
							/>
						</Box>
					) : (
						<>
							<ImageLightBox
								images={[floorPlanImage]}
								open={open}
								handleClose={handleClose}
								reactModalStyle={{
									zIndex: 100000,
								}}
							/>
							<CardMedia
								image={floorPlanImage}
								className={classes.fPlan}
								onClick={() => setOpen(true)}
							/>
						</>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Properties;
