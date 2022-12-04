import { all, put, takeLatest, call } from 'redux-saga/effects';
import { ENDP_SERIES } from '../../../utils/constants';
import {
	DELETE_SERIES_START,
	FETCH_SERIES_START,
	POST_SERIES_START,
	UPDATE_SERIES_START,
} from './action-types';
import {
	deleteSeriesFailed,
	deleteSeriesSuccess,
	fetchSeriesFailed,
	fetchSeriesSuccess,
	postSeriesFailed,
	postSeriesSuccess,
	updateSeriesFailed,
	updateSeriesSuccess,
} from './actions';

// GET Series
export function* fetchSeries() {
	try {
		const result = yield fetch(ENDP_SERIES);
		const series = yield result.json();
		yield put(fetchSeriesSuccess(series));
	} catch (e) {
		yield put(fetchSeriesFailed(e));
	}
}

export function* startSeriesFetch() {
	yield takeLatest(FETCH_SERIES_START, fetchSeries);
}

// POST Series
export function* postSeries({ payload }) {
	try {
		const result = yield fetch(ENDP_SERIES, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const seriesCreated = yield result.json();
		yield put(postSeriesSuccess(seriesCreated));
	} catch (e) {
		yield put(postSeriesFailed(e));
	}
}

export function* startSeriesPost() {
	yield takeLatest(POST_SERIES_START, postSeries);
}

// DELETE Series
export function* deleteSeries({ payload }) {
	try {
		const result = yield fetch(`${ENDP_SERIES}/${payload}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		yield result.json();
		yield put(deleteSeriesSuccess({ id: payload }));
	} catch (e) {
		yield put(deleteSeriesFailed(e));
	}
}

export function* startSeriesDelete() {
	yield takeLatest(DELETE_SERIES_START, deleteSeries);
}

// UPDATE Series
export function* updateSeries({ payload }) {
	try {
		const result = yield fetch(`${ENDP_SERIES}/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload.updates),
		});
		const { data } = yield result.json();
		yield put(updateSeriesSuccess(data));
	} catch (e) {
		yield put(updateSeriesFailed(e));
	}
}

export function* startSeriesUpdate() {
	yield takeLatest(UPDATE_SERIES_START, updateSeries);
}

// Default Export
export default function* sagas() {
	yield all([
		call(startSeriesFetch),
		call(startSeriesPost),
		call(startSeriesDelete),
		call(startSeriesUpdate),
	]);
}
