import { combineReducers } from 'redux';

import cityReducer from './city/city.reducer';
import authReducer from './auth/auth.reducer';
import actionTabReducer from './actionTab/actionTab.reducer';

const rootReducer = combineReducers({
	city: cityReducer,
	auth: authReducer,
	actionTab: actionTabReducer,
});

export default rootReducer;
