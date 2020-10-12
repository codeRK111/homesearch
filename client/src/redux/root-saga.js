import { all, call } from 'redux-saga/effects';
import { citySagas } from './city/city.sagas';
import { authSagas } from './auth/auth.sagas';

export default function* () {
	yield all([call(citySagas), call(authSagas)]);
}
