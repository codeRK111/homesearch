import { combineReducers } from 'redux';
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import userReducer from './user/user.reducer';
import usersReducer from './users/users.reducer';
import cityReducer from './city/city.reducer';
import adminReducer from './admins/admins.reducer';
import propertyReducer from './property/property.reducer';

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
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
