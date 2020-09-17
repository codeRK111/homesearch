import { projectActionTypes } from './project.types';

// fetch
export const fetchProjects = (payload) => ({
	type: projectActionTypes.FETCH_PROJECTS_START,
	payload,
});
// set

export const setProjects = (payload) => ({
	type: projectActionTypes.SET_PROJECTS,
	payload,
});

// toggle loading
export const toggleAddProjectFlatLoading = (status) => ({
	type: projectActionTypes.TOGGLE_ADD_PROJECT_FLAT_LOADING,
	payload: status,
});

export const toggleFetchProjectsLoading = (status) => ({
	type: projectActionTypes.TOGGLE_FETCH_PROJECTS_LOADING,
	payload: status,
});

// manage resources
export const addProjectFlat = (payload) => ({
	type: projectActionTypes.ADD_PROJECT_FLAT_START,
	payload,
});
