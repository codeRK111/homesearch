import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/auth.sagas';
import { citySagas } from './city/city.sagas';
import { contactSagas } from './contact/contact.sagas';
import { feedbackSagas } from './feedback/feedback.sagas';
import { propertySagas } from './property/property.sagas';

export default function* () {
	yield all([
		call(citySagas),
		call(authSagas),
		call(propertySagas),
		call(contactSagas),
		call(feedbackSagas),
	]);
}
