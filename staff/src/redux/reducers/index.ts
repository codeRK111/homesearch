import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { repositoryReducer } from './repositories';
import { uiReducer } from './ui';

export const reducers = combineReducers({
	repositories: repositoryReducer,
	auth: authReducer,
	ui: uiReducer,
});

export type RootState = ReturnType<typeof reducers>;
