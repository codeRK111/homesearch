import { Action } from '../action/index';
import { ActionType } from '../actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

export const searchRepositories = (term: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.SEARCH_REPOSITORIES,
		});
		try {
			const { data } = await axios.get(
				`https://registry.npmjs.com/-/v1/search`,
				{
					params: {
						text: term,
					},
				}
			);
			const packageNames = data.objects.map(
				(result: any) => result.package.name
			);
			dispatch({
				type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
				payload: packageNames,
			});
		} catch (error) {
			dispatch({
				type: ActionType.SEARCH_REPOSITORIES_ERROR,
				payload: error.message,
			});
		}
	};
};
