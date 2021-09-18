import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { uiReducer } from './ui';

export const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
});

export type RootState = ReturnType<typeof reducers>;
