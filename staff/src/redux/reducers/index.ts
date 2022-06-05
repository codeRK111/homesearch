import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { cPAuthReducer } from './cp-auth';
import { uiReducer } from './ui';

export const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	cp: cPAuthReducer,
});

export type RootState = ReturnType<typeof reducers>;
