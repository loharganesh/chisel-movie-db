import { createSelector } from 'redux-orm';
import orm from '../../orm';

export const seriesSelector = createSelector(orm, (session) =>
	session.Series.all().toModelArray()
);
export const seriesSeasonsSelector = createSelector(orm.Series.seasons);

// export const seriesWithEpisodes = createSelector(orm, (session) => {
// 	return session.Series.all()
// 		.toModelArray()
// 		.map((series) => {
// 			series.seasons.toModelArray().forEach((season) => {
// 				season.episodes.toRefArray().forEach((episode) => {
// 					if (episode.name.includes('Cat')) {
// 						const { ref } = series;
// 					}
// 				});
// 			});
// 		});
// });

export const seriesWithEpisodes = createSelector(orm, (session) => {
	return session.Series.all()
		.toModelArray()
		.map((series) => {
			series.seasons.toModelArray().forEach((season) => {
				season.episodes.toRefArray().forEach((episode) => {
					if (episode.name.includes('Cat')) {
						const { ref } = series;
					}
				});
			});
		});
});
