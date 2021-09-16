import { Action } from './../action/index';
import { ActionType } from './../actionTypes/index';

interface RepositoryState {
	loading: Boolean;
	error: string | null;
	data: string[];
}

const initialState = {
	loading: false,
	error: null,
	data: [],
};

export const repositoryReducer = (
	state: RepositoryState = initialState,
	action: Action
): RepositoryState => {
	switch (action.type) {
		case ActionType.SEARCH_REPOSITORIES:
			return { loading: true, error: null, data: [] };
		case ActionType.SEARCH_REPOSITORIES_SUCCESS:
			return { loading: false, error: null, data: action.payload };
		case ActionType.SEARCH_REPOSITORIES_ERROR:
			return { loading: false, error: action.payload, data: [] };

		default:
			return state;
	}
};
