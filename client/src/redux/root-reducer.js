import { combineReducers } from 'redux';

import cityReducer from './city/city.reducer';
import authReducer from './auth/auth.reducer';

const rootReducer = combineReducers({
	city: cityReducer,
	auth: authReducer,
});

export default rootReducer;
