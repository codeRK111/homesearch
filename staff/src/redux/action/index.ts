import { ActionType } from '../actionTypes';

interface SearchRepositories {
	type: ActionType.SEARCH_REPOSITORIES;
}
interface SearchRepositoriesSuccess {
	type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
	payload: string[];
}
interface SearchRepositoriesError {
	type: ActionType.SEARCH_REPOSITORIES_ERROR;
	payload: string;
}

export type Action =
	| SearchRepositories
	| SearchRepositoriesSuccess
	| SearchRepositoriesError;
