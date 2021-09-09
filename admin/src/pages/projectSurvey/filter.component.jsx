import { Grid } from '@material-ui/core';
import React from 'react';
import SearchProjectByName from '../../components/search/project.component';
import SearchUserByName from '../../components/search/user.component';

const FilterSurvay = ({ project, setProject, user, setUser }) => {
	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={12} md={3}>
					<SearchProjectByName
						value={project}
						onSelect={setProject}
						padding={false}
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<SearchUserByName
						value={user}
						onSelect={setUser}
						padding={false}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default FilterSurvay;
