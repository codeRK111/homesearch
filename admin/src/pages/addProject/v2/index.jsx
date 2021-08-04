import { Box, Chip, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

import LoaderBackdrop from '../../../components/backdrop';
import ProjectInformation from './projectInformation';
import ProjectSteper from '../../../components/projectSteper';
import UnitConfig from './unitConfig';
import axios from 'axios';
import { getAddProjectPageInfo } from '../../../utils/asyncFunctions';
import useGlobalStyles from '../../../common.style';
import useStyles from '../addProject.style';

const AddProject = () => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const cancelToken = useRef(undefined);
	const [activeStep, setActiveStep] = React.useState(0);
	const [projectInfo, setProjectInfo] = React.useState({
		id: null,
		towers: 0,
	});
	const [helperData, setHelperData] = React.useState(null);
	const [projectType, setProjectType] = React.useState('flat');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleProjectType = (type) => () => {
		setProjectType(type);
	};

	useEffect(() => {
		cancelToken.current = axios.CancelToken.source();
		getAddProjectPageInfo(cancelToken.current, setLoading, setError).then(
			(data) => {
				setHelperData(data);
				console.log({ data });
			}
		);
	}, []);

	return (
		<Box className={classes.wrapper}>
			<LoaderBackdrop open={loading} />
			{error && (
				<Typography className={gClasses.errorColor} align="center">
					{error}
				</Typography>
			)}
			<Box>
				<ProjectSteper
					activeStep={activeStep}
					handleNext={handleNext}
					handleBack={handleBack}
					handleReset={handleReset}
				/>
			</Box>
			<Box p="1rem">
				{activeStep === 0 && (
					<Grid container spacing={0} justify="center">
						<h2 className={gClasses.flexCenter}>
							Select Project Type
						</h2>
						<Grid
							item
							xs={2}
							md={2}
							className={gClasses.justifyCenter}
						>
							<Chip
								label="Apartment"
								clickable
								onClick={handleProjectType('flat')}
								classes={{
									label: classes.chip,
									root: classes.chipRoot,
								}}
								color={
									projectType === 'flat'
										? 'primary'
										: 'default'
								}
							/>
						</Grid>
						<Grid
							item
							xs={2}
							md={2}
							className={gClasses.justifyCenter}
						>
							<Chip
								label="Villa"
								clickable
								onClick={handleProjectType('independenthouse')}
								classes={{
									label: classes.chip,
									root: classes.chipRoot,
								}}
								color={
									projectType === 'independenthouse'
										? 'primary'
										: 'default'
								}
							/>
						</Grid>
						<Grid
							item
							xs={2}
							md={2}
							className={gClasses.justifyCenter}
						>
							<Chip
								label="Land"
								clickable
								onClick={handleProjectType('land')}
								classes={{
									label: classes.chip,
									root: classes.chipRoot,
								}}
								color={
									projectType === 'land'
										? 'primary'
										: 'default'
								}
							/>
						</Grid>
					</Grid>
				)}
			</Box>
			{helperData && activeStep === 0 && (
				<ProjectInformation
					handleNext={handleNext}
					resources={helperData}
					projectType={projectType}
					setProjectInfo={setProjectInfo}
				/>
			)}
			{helperData && activeStep === 1 && (
				<UnitConfig
					handleNext={handleNext}
					resources={helperData}
					projectType={projectType}
					projectInfo={projectInfo}
				/>
			)}
		</Box>
	);
};
export default AddProject;
