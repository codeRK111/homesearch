import { createSelector } from 'reselect';

const selectProject = (state) => state.project;

export const selectAddProjectFlatLoading = createSelector(
	[selectProject],
	(u) => u.addProjectFlatLoading
);
export const selectFetchProjectsLoading = createSelector(
	[selectProject],
	(u) => u.fetchProjectsLoading
);
export const selectProjects = createSelector(
	[selectProject],
	(u) => u.projects
);
