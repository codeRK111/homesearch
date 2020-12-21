import actionTabReducer from './actionTab/actionTab.reducer';
import authReducer from './auth/auth.reducer';
import cityReducer from './city/city.reducer';
import { combineReducers } from 'redux';
import contactReducer from './contact/contact.reducer';
import feedbackReducer from './feedback/feedbacj.reducer';
import propertyReducer from './property/property.reducer';

const rootReducer = combineReducers({
	city: cityReducer,
	auth: authReducer,
	actionTab: actionTabReducer,
	property: propertyReducer,
	contact: contactReducer,
	feedback: feedbackReducer,
});

export default rootReducer;
