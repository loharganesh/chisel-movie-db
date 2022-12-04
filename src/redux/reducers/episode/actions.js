import {
	DELETE_EPISODE_FAILED,
	DELETE_EPISODE_START,
	DELETE_EPISODE_SUCCESS,
	FETCH_EPISODES_FAILED,
	FETCH_EPISODES_START,
	FETCH_EPISODES_SUCCESS,
	POST_EPISODES_FAILED,
	POST_EPISODES_START,
	POST_EPISODES_SUCCESS,
	UPDATE_EPISODE_FAILED,
	UPDATE_EPISODE_START,
	UPDATE_EPISODE_SUCCESS,
} from './action-types';

// GET Episodes
export const fetchEpisodesStart = () => ({ type: FETCH_EPISODES_START });

export const fetchEpisodesSuccess = (episode) => ({
	type: FETCH_EPISODES_SUCCESS,
	payload: episode,
});

export const fetchEpisodesFailed = (error) => ({
	type: FETCH_EPISODES_FAILED,
	payload: error,
});

// POST Episodes
export const postEpisodesStart = (episode) => ({
	type: POST_EPISODES_START,
	payload: episode,
});

export const postEpisodesSuccess = (episode) => ({
	type: POST_EPISODES_SUCCESS,
	payload: episode,
});

export const postEpisodesFailed = (error) => ({
	type: POST_EPISODES_FAILED,
	payload: error,
});

// DELETE Episodes
export const deleteEpisodesStart = (episode) => ({
	type: DELETE_EPISODE_START,
	payload: episode,
});

export const deleteEpisodesSuccess = (episode) => ({
	type: DELETE_EPISODE_SUCCESS,
	payload: episode,
});

export const deleteEpisodesFailed = (error) => ({
	type: DELETE_EPISODE_FAILED,
	payload: error,
});

// UPDATE Episodes
export const updateEpisodeStart = (episode) => ({
	type: UPDATE_EPISODE_START,
	payload: episode,
});

export const updateEpisodeSuccess = (episode) => ({
	type: UPDATE_EPISODE_SUCCESS,
	payload: episode,
});

export const updateEpisodeFailed = (error) => ({
	type: UPDATE_EPISODE_FAILED,
	payload: error,
});
