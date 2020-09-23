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
export const selectFetchProjectDetailsLoading = createSelector(
	[selectProject],
	(u) => u.fetchProjectDetailsLoading
);
export const selectUpdateProjectDetailsLoading = createSelector(
	[selectProject],
	(u) => u.updateProjectDetailsLoading
);
export const selectUpdateProjectPropertyDetailsLoading = createSelector(
	[selectProject],
	(u) => u.updateProjectPropertyDetailsLoading
);
export const selectProjects = createSelector(
	[selectProject],
	(u) => u.projects
);
