import { Box, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { AddBasicProjectInfoForm } from '../../components/Forms/Project/add-basic-info';
import { AddProjectUnitDetailsForm } from '../../components/Forms/Project/add-unit-details';
import LoadingBackdrop from '../../components/Backdrop';
import { Project } from '../../model/project.interface';
import { asyncGetProjectDetails } from '../../API/project';

export enum ProjectFormState {
	BasicDetails = 'basic-details',
	UnitConfig = 'unit-config',
}

const AddProjectPage = () => {
	const [formState, setFormState] = useState<ProjectFormState>(
		ProjectFormState.BasicDetails
	);
	const [projectId, setProjectId] = useState<null | string>(null);
	const [projectDetails, setProjectDetails] = useState<{
		project: null | Project;
		properties: any[];
	}>({
		project: null,
		properties: [],
	});
	const [fetchProjectLoading, setFetchProjectLoading] = useState(false);

	const fetchProjectDetails = useCallback(async () => {
		if (projectId) {
			try {
				setFetchProjectLoading(true);
				const resp = await asyncGetProjectDetails(projectId);
				setProjectDetails(resp);
				setFetchProjectLoading(false);
			} catch (error) {
				setFetchProjectLoading(false);
			}
		}
	}, [projectId]);

	useEffect(() => {
		fetchProjectDetails();
	}, [fetchProjectDetails]);

	return (
		<Container>
			<LoadingBackdrop open={fetchProjectLoading} />
			<Box p="1rem">
				<Typography variant="h5" align="center">
					Add Project
				</Typography>
				<Box>
					<button
						onClick={() =>
							setFormState(ProjectFormState.BasicDetails)
						}
					>
						Basic Details
					</button>
					<button
						onClick={() =>
							setFormState(ProjectFormState.UnitConfig)
						}
					>
						Unit Config
					</button>
				</Box>
				{formState === ProjectFormState.BasicDetails ? (
					<AddBasicProjectInfoForm
						setProject={setProjectId}
						setFormState={setFormState}
					/>
				) : (
					<AddProjectUnitDetailsForm
						projectId={projectId}
						fetchProjectDetails={fetchProjectDetails}
						project={projectDetails.project}
						projectProperties={projectDetails.properties}
					/>
				)}
			</Box>
		</Container>
	);
};

export default AddProjectPage;
