import { combineReducers } from 'redux';
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import userReducer from './user/user.reducer';
import usersReducer from './users/users.reducer';
import cityReducer from './city/city.reducer';
import adminReducer from './admins/admins.reducer';

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
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
