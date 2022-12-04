import { all, put, takeLatest, call } from 'redux-saga/effects';
import { ENDP_EPISODE } from '../../../utils/constants';
import {
	DELETE_EPISODE_START,
	FETCH_EPISODES_START,
	POST_EPISODES_START,
	UPDATE_EPISODE_START,
} from './action-types';
import {
	deleteEpisodesFailed,
	deleteEpisodesSuccess,
	fetchEpisodesFailed,
	fetchEpisodesSuccess,
	postEpisodesFailed,
	postEpisodesSuccess,
	updateEpisodeFailed,
	updateEpisodeSuccess,
} from './actions';

// GET Episodes
export function* fetchEpisodes() {
	try {
		const result = yield fetch(ENDP_EPISODE);
		const series = yield result.json();
		yield put(fetchEpisodesSuccess(series));
	} catch (e) {
		yield put(fetchEpisodesFailed(e));
	}
}

export function* startEpisodesFetch() {
	yield takeLatest(FETCH_EPISODES_START, fetchEpisodes);
}

// POST Episodes
export function* postEpisodes({ payload }) {
	try {
		const result = yield fetch(ENDP_EPISODE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const seriesCreated = yield result.json();
		yield put(postEpisodesSuccess(seriesCreated));
	} catch (e) {
		yield put(postEpisodesFailed(e));
	}
}

export function* startEpisodesPost() {
	yield takeLatest(POST_EPISODES_START, postEpisodes);
}

// DELETE Episodes
export function* deleteEpisode({ payload }) {
	try {
		const result = yield fetch(`${ENDP_EPISODE}/${payload}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		yield result.json();
		yield put(deleteEpisodesSuccess({ id: payload }));
	} catch (e) {
		yield put(deleteEpisodesFailed(e));
	}
}

export function* startEpisodeDelete() {
	yield takeLatest(DELETE_EPISODE_START, deleteEpisode);
}

// UPDATE Episode
export function* updateEpisode({ payload }) {
	try {
		const result = yield fetch(`${ENDP_EPISODE}/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload.updates),
		});
		const { data } = yield result.json();
		yield put(updateEpisodeSuccess(data));
	} catch (e) {
		yield put(updateEpisodeFailed(e));
	}
}

export function* startEpisodeUpdate() {
	yield takeLatest(UPDATE_EPISODE_START, updateEpisode);
}

// Default Export
export default function* sagas() {
	yield all([
		call(startEpisodesFetch),
		call(startEpisodesPost),
		call(startEpisodeDelete),
		call(startEpisodeUpdate),
	]);
}
