import { projectActionTypes } from './project.types';

const INITIAL_STATE = {
	addProjectFlatLoading: false,
	fetchProjectsLoading: false,
	fetchProjectDetailsLoading: false,
	updateProjectDetailsLoading: false,
	updateProjectPropertyDetailsLoading: false,
	removePropertyFloorplanLoading: false,
	projects: [],
};

const builderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case projectActionTypes.TOGGLE_ADD_PROJECT_FLAT_LOADING:
			return {
				...state,
				addProjectFlatLoading: action.payload,
			};
		case projectActionTypes.TOGGLE_FETCH_PROJECTS_LOADING:
			return {
				...state,
				fetchProjectsLoading: action.payload,
			};
		case projectActionTypes.TOGGLE_FETCH_PROJECT_DETAILS_LOADING:
			return {
				...state,
				fetchProjectDetailsLoading: action.payload,
			};
		case projectActionTypes.TOGGLE_UPDATE_PROJECT_DETAILS_LOADING:
			return {
				...state,
				updateProjectDetailsLoading: action.payload,
			};
		case projectActionTypes.TOGGLE_UPDATE_PROJECT_PROPERTY_DETAILS_LOADING:
			return {
				...state,
				updateProjectPropertyDetailsLoading: action.payload,
			};
		case projectActionTypes.TOGGLE_REMOVE_PROPERTY_FLOORPLAN_LOADING:
			return {
				...state,
				removePropertyFloorplanLoading: action.payload,
			};
		case projectActionTypes.SET_PROJECTS:
			return {
				...state,
				projects: action.payload,
			};

		default:
			return state;
	}
};

export default builderReducer;
