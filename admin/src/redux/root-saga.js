import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.saga';
import { usersSagas } from './users/users.saga';
import { citySagas } from './city/city.saga';
import { adminsSagas } from './admins/admins.saga';
import { propertySagas } from './property/property.saga';
import { builderSagas } from './builder/builder.saga';
import { projectSagas } from './project/project.saga';

export default function* () {
	yield all([
		call(userSagas),
		call(usersSagas),
		call(citySagas),
		call(adminsSagas),
		call(propertySagas),
		call(builderSagas),
		call(projectSagas),
	]);
}
