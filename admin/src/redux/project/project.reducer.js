import { projectActionTypes } from './project.types';

const INITIAL_STATE = {
	addProjectFlatLoading: false,
	fetchProjectsLoading: false,
	fetchProjectDetailsLoading: false,
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
