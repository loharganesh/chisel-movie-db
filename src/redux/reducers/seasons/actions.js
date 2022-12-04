import {
	DELETE_EPISODE_START,
	DELETE_EPISODE_SUCCESS,
} from '../episode/action-types';
import {
	DELETE_SEASON_FAILED,
	DELETE_SEASON_START,
	DELETE_SEASON_SUCCESS,
	FETCH_SEASON_FAILED,
	FETCH_SEASON_START,
	FETCH_SEASON_SUCCESS,
	POST_SEASON_FAILED,
	POST_SEASON_START,
	POST_SEASON_SUCCESS,
	UPDATE_SEASON,
	UPDATE_SEASON_FAILED,
	UPDATE_SEASON_START,
	UPDATE_SEASON_SUCCESS,
} from './action-types';

export const updateSeason = (payload) => ({ type: UPDATE_SEASON, payload });

export const fetchSeasonStart = () => ({ type: FETCH_SEASON_START });

export const fetchSeasonSuccess = (season) => ({
	type: FETCH_SEASON_SUCCESS,
	payload: season,
});

export const fetchSeasonFailed = (error) => ({
	type: FETCH_SEASON_FAILED,
	payload: error,
});

// POST Season
export const postSeasonStart = (season) => ({
	type: POST_SEASON_START,
	payload: season,
});

export const postSeasonSuccess = (season) => ({
	type: POST_SEASON_SUCCESS,
	payload: season,
});

export const postSeasonFailed = (error) => ({
	type: POST_SEASON_FAILED,
	payload: error,
});

// DELETE Season
export const deleteSeasonStart = (season) => ({
	type: DELETE_SEASON_START,
	payload: season,
});

export const deleteSeasonSuccess = (season) => ({
	type: DELETE_SEASON_SUCCESS,
	payload: season,
});

export const deleteSeasonFailed = (error) => ({
	type: DELETE_SEASON_FAILED,
	payload: error,
});

// UPDATE Season
export const updateSeasonStart = (season) => ({
	type: UPDATE_SEASON_START,
	payload: season,
});

export const updateSeasonSuccess = (season) => ({
	type: UPDATE_SEASON_SUCCESS,
	payload: season,
});

export const updateSeasonFailed = (error) => ({
	type: UPDATE_SEASON_FAILED,
	payload: error,
});
