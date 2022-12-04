import { all, call } from 'redux-saga/effects';
import seriesSagas from './reducers/series/sagas';
import seasonSagas from './reducers/seasons/sagas';
import episodesSagas from './reducers/episode/sagas';
import columnsSagas from './reducers/columns/sagas';

export default function* sagas() {
	yield all([
		call(seriesSagas),
		call(seasonSagas),
		call(episodesSagas),
		call(columnsSagas),
	]);
}
