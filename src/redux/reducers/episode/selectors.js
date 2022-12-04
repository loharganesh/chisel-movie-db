import { createSelector } from 'redux-orm';
import orm from '../../orm';

export const seasonEpisodesSelector = createSelector(orm.Season.episodes);

export const selectSeasonAverageRatings = createSelector(
	orm.Season.episodes.map(orm.Episode.ratings_factors)
);
