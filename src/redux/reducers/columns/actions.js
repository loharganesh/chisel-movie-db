import {
	DELETE_COLUMN_FAILED,
	DELETE_COLUMN_START,
	DELETE_COLUMN_SUCCESS,
	FETCH_COLUMNS_FAILED,
	FETCH_COLUMNS_START,
	FETCH_COLUMNS_SUCCESS,
	POST_COLUMN_FAILED,
	POST_COLUMN_START,
	POST_COLUMN_SUCCESS,
	UPDATE_COLUMN_FAILED,
	UPDATE_COLUMN_START,
	UPDATE_COLUMN_SUCCESS,
} from './action-types';

// GET Columns
export const fetchColumnsStart = () => ({ type: FETCH_COLUMNS_START });

export const fetchColumnsSuccess = (episode) => ({
	type: FETCH_COLUMNS_SUCCESS,
	payload: episode,
});

export const fetchColumnsFailed = (error) => ({
	type: FETCH_COLUMNS_FAILED,
	payload: error,
});

// POST Columns
export const postColumnStart = (episode) => ({
	type: POST_COLUMN_START,
	payload: episode,
});

export const postColumnSuccess = (episode) => ({
	type: POST_COLUMN_SUCCESS,
	payload: episode,
});

export const postColumnFailed = (error) => ({
	type: POST_COLUMN_FAILED,
	payload: error,
});

// DELETE Columns
export const deleteColumnStart = (episode) => ({
	type: DELETE_COLUMN_START,
	payload: episode,
});

export const deleteColumnSuccess = (episode) => ({
	type: DELETE_COLUMN_SUCCESS,
	payload: episode,
});

export const deleteColumnFailed = (error) => ({
	type: DELETE_COLUMN_FAILED,
	payload: error,
});

// UPDATE Columns
export const updateColumnStart = (episode) => ({
	type: UPDATE_COLUMN_START,
	payload: episode,
});

export const updateColumnSuccess = (episode) => ({
	type: UPDATE_COLUMN_SUCCESS,
	payload: episode,
});

export const updateColumnFailed = (error) => ({
	type: UPDATE_COLUMN_FAILED,
	payload: error,
});
