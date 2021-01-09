import { all, call } from 'redux-saga/effects';

import { adminsSagas } from './admins/admins.saga';
import { builderSagas } from './builder/builder.saga';
import { citySagas } from './city/city.saga';
import { feedbackSagas } from './feedback/feedback.sagas';
import { kraSagas } from './kra/kra.sagas';
import { projectSagas } from './project/project.saga';
import { propertySagas } from './property/property.saga';
import { querySagas } from './query/query.sagas';
import { userSagas } from './user/user.saga';
import { usersSagas } from './users/users.saga';

export default function* () {
	yield all([
		call(userSagas),
		call(usersSagas),
		call(citySagas),
		call(adminsSagas),
		call(propertySagas),
		call(builderSagas),
		call(projectSagas),
		call(querySagas),
		call(feedbackSagas),
		call(kraSagas),
	]);
}
