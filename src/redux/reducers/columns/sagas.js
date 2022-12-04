import { all, put, takeLatest, call } from 'redux-saga/effects';
import { ENDP_COLUMN } from '../../../utils/constants';
import {
	DELETE_COLUMN_START,
	FETCH_COLUMNS_START,
	POST_COLUMN_START,
	UPDATE_COLUMN_START,
} from './action-types';
import {
	deleteColumnFailed,
	deleteColumnSuccess,
	fetchColumnsFailed,
	fetchColumnsSuccess,
	postColumnFailed,
	postColumnSuccess,
	updateColumnFailed,
	updateColumnSuccess,
} from './actions';

// GET Column
export function* fetchColumns() {
	try {
		const result = yield fetch(ENDP_COLUMN);
		const columns = yield result.json();
		yield put(fetchColumnsSuccess(columns));
	} catch (e) {
		yield put(fetchColumnsFailed(e));
	}
}

export function* startColumnFetch() {
	yield takeLatest(FETCH_COLUMNS_START, fetchColumns);
}

// POST Column
export function* postColumn({ payload }) {
	try {
		const result = yield fetch(ENDP_COLUMN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const columnCreated = yield result.json();
		yield put(postColumnSuccess(columnCreated));
	} catch (e) {
		yield put(postColumnFailed(e));
	}
}

export function* startColumnPost() {
	yield takeLatest(POST_COLUMN_START, postColumn);
}

// DELETE Column
export function* deleteColumn({ payload }) {
	try {
		const result = yield fetch(`${ENDP_COLUMN}/${payload}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		yield result.json();
		yield put(deleteColumnSuccess(payload));
	} catch (e) {
		yield put(deleteColumnFailed(e));
	}
}

export function* startColumnDelete() {
	yield takeLatest(DELETE_COLUMN_START, deleteColumn);
}

// UPDATE Column
export function* updateColumn({ payload }) {
	try {
		const result = yield fetch(`${ENDP_COLUMN}/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload.updates),
		});
		const { data } = yield result.json();
		yield put(updateColumnSuccess(data));
	} catch (e) {
		yield put(updateColumnFailed(e));
	}
}

export function* startColumnUpdate() {
	yield takeLatest(UPDATE_COLUMN_START, updateColumn);
}

// Default Export
export default function* sagas() {
	yield all([
		call(startColumnFetch),
		call(startColumnPost),
		call(startColumnUpdate),
		call(startColumnDelete),
	]);
}
