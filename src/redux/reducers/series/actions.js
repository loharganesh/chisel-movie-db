import {
	DELETE_SERIES_FAILED,
	DELETE_SERIES_START,
	DELETE_SERIES_SUCCESS,
	FETCH_SERIES_FAILED,
	FETCH_SERIES_START,
	FETCH_SERIES_SUCCESS,
	POST_SERIES_FAILED,
	POST_SERIES_START,
	POST_SERIES_SUCCESS,
	UPDATE_SERIES_FAILED,
	UPDATE_SERIES_START,
	UPDATE_SERIES_SUCCESS,
} from './action-types';

// GET Series
export const fetchSeriesStart = () => ({ type: FETCH_SERIES_START });

export const fetchSeriesSuccess = (series) => ({
	type: FETCH_SERIES_SUCCESS,
	payload: series,
});

export const fetchSeriesFailed = (error) => ({
	type: FETCH_SERIES_FAILED,
	payload: error,
});

// POST Series
export const postSeriesStart = (series) => ({
	type: POST_SERIES_START,
	payload: series,
});

export const postSeriesSuccess = (series) => ({
	type: POST_SERIES_SUCCESS,
	payload: series,
});

export const postSeriesFailed = (error) => ({
	type: POST_SERIES_FAILED,
	payload: error,
});

// DELETE Series
export const deleteSeriesStart = (series) => ({
	type: DELETE_SERIES_START,
	payload: series,
});

export const deleteSeriesSuccess = (series) => ({
	type: DELETE_SERIES_SUCCESS,
	payload: series,
});

export const deleteSeriesFailed = (error) => ({
	type: DELETE_SERIES_FAILED,
	payload: error,
});

// PUT Series
export const updateSeriesStart = (series) => ({
	type: UPDATE_SERIES_START,
	payload: series,
});

export const updateSeriesSuccess = (series) => ({
	type: UPDATE_SERIES_SUCCESS,
	payload: series,
});

export const updateSeriesFailed = (error) => ({
	type: UPDATE_SERIES_FAILED,
	payload: error,
});
