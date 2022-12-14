import adminReducer from './admins/admins.reducer';
import builderReducer from './builder/builder.reducer';
import cityReducer from './city/city.reducer';
import { combineReducers } from 'redux';
import feedbackReducer from './feedback/feedbacj.reducer';
import kpiReducer from './kpi/kpi.reducer';
import kraReducer from './kra/kra.reducer';
import projectReducer from './project/project.reducer';
import propertyReducer from './property/property.reducer';
import queryReducer from './query/query.reducer';
import sidebarReducer from './sidebar/sidebar.reducer';
import uiReducer from './ui/ui.reducer';
import userReducer from './user/user.reducer';
import usersReducer from './users/users.reducer';

// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["cart"]
// };

const rootReducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	city: cityReducer,
	admins: adminReducer,
	property: propertyReducer,
	sidebar: sidebarReducer,
	builder: builderReducer,
	project: projectReducer,
	query: queryReducer,
	feedback: feedbackReducer,
	kra: kraReducer,
	kpi: kpiReducer,
	ui: uiReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
