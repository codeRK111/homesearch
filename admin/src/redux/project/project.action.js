import { projectActionTypes } from './project.types';

// fetch
export const fetchProjects = (payload) => ({
	type: projectActionTypes.FETCH_PROJECTS_START,
	payload,
});
export const fetchProjectDetails = (payload) => ({
	type: projectActionTypes.FETCH_PROJECT_DETAILS,
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
export const toggleFetchProjectDetailsLoading = (status) => ({
	type: projectActionTypes.TOGGLE_FETCH_PROJECT_DETAILS_LOADING,
	payload: status,
});
export const toggleUpdateProjectDetailsLoading = (status) => ({
	type: projectActionTypes.TOGGLE_UPDATE_PROJECT_DETAILS_LOADING,
	payload: status,
});
export const toggleUpdateProjectPropertyDetailsLoading = (status) => ({
	type: projectActionTypes.TOGGLE_UPDATE_PROJECT_PROPERTY_DETAILS_LOADING,
	payload: status,
});
export const toggleremovePropertyFloorplansLoading = (status) => ({
	type: projectActionTypes.TOGGLE_REMOVE_PROPERTY_FLOORPLAN_LOADING,
	payload: status,
});

// manage resources
export const addProjectFlat = (payload) => ({
	type: projectActionTypes.ADD_PROJECT_FLAT_START,
	payload,
});
export const updateProjectDetails = (payload) => ({
	type: projectActionTypes.UPDATE_PROJECT_DETAILS,
	payload,
});
export const updateProjectPropertyDetails = (payload) => ({
	type: projectActionTypes.UPDATE_PROJECT_PROPERTY_DETAILS,
	payload,
});
export const removePropertyFloorplan = (payload) => ({
	type: projectActionTypes.REMOVE_PROPERTY_FLOORPLAN,
	payload,
});
