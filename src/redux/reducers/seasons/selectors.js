import { createSelector } from 'redux-orm';
import orm from '../../orm';

export const seasonsSelector = createSelector(
	orm,
	(session) => session.Season.episodes
);

export const selectEpisodes = createSelector(orm.Season.episodes);
