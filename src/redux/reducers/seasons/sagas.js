import { all, put, takeLatest, call } from 'redux-saga/effects';
import { ENDP_SEASON } from '../../../utils/constants';
import {
	DELETE_SEASON_START,
	FETCH_SEASON_START,
	POST_SEASON_START,
	UPDATE_SEASON_START,
} from './action-types';
import {
	deleteSeasonFailed,
	deleteSeasonSuccess,
	fetchSeasonFailed,
	fetchSeasonSuccess,
	postSeasonFailed,
	postSeasonSuccess,
	updateSeasonFailed,
	updateSeasonSuccess,
} from './actions';

export function* fetchSeason() {
	try {
		const result = yield fetch('http://localhost:8080/seasons');
		const seasons = yield result.json();
		yield put(fetchSeasonSuccess(seasons));
	} catch (e) {
		yield put(fetchSeasonFailed(e));
	}
}

export function* startSeasonFetch() {
	yield takeLatest(FETCH_SEASON_START, fetchSeason);
}

// POST Season
export function* postSeason({ payload }) {
	try {
		const result = yield fetch(ENDP_SEASON, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const seasonCreated = yield result.json();
		yield put(postSeasonSuccess(seasonCreated));
	} catch (e) {
		yield put(postSeasonFailed(e));
	}
}

export function* startSeasonPost() {
	yield takeLatest(POST_SEASON_START, postSeason);
}

// DELETE Season
export function* deleteSeason({ payload }) {
	try {
		const result = yield fetch(`${ENDP_SEASON}/${payload}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		yield result.json();
		yield put(deleteSeasonSuccess({ id: payload }));
	} catch (e) {
		yield put(deleteSeasonFailed(e));
	}
}

export function* startSeasonDelete() {
	yield takeLatest(DELETE_SEASON_START, deleteSeason);
}

// UPDATE Season
export function* updateSeason({ payload }) {
	try {
		const result = yield fetch(`${ENDP_SEASON}/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload.updates),
		});
		const { data } = yield result.json();
		yield put(updateSeasonSuccess(data));
	} catch (e) {
		yield put(updateSeasonFailed(e));
	}
}

export function* startSeasonUpdate() {
	yield takeLatest(UPDATE_SEASON_START, updateSeason);
}

export default function* sagas() {
	yield all([
		call(startSeasonFetch),
		call(startSeasonPost),
		call(startSeasonDelete),
		call(startSeasonUpdate),
	]);
}
