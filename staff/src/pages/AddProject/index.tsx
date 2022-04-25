import { Box, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import { AddBasicProjectInfoForm } from '../../components/Forms/Project/add-basic-info';
import { AddProjectUnitDetailsForm } from '../../components/Forms/Project/add-unit-details';

enum FormState {
	BasicDetails = 'basic-details',
	UnitConfig = 'unit-config',
}

const AddProjectPage = () => {
	const [formState, setFormState] = useState<FormState>(
		FormState.BasicDetails
	);
	return (
		<Container>
			<Box p="1rem">
				<Typography variant="h5" align="center">
					Add Project
				</Typography>
				<Box>
					<button
						onClick={() => setFormState(FormState.BasicDetails)}
					>
						Basic Details
					</button>
					<button onClick={() => setFormState(FormState.UnitConfig)}>
						Unit Config
					</button>
				</Box>
				{formState === FormState.BasicDetails ? (
					<AddBasicProjectInfoForm />
				) : (
					<AddProjectUnitDetailsForm />
				)}
			</Box>
		</Container>
	);
};

export default AddProjectPage;
