import { attr, fk } from 'redux-orm';
import {
	DELETE_SEASON_SUCCESS,
	FETCH_SEASON_SUCCESS,
	POST_SEASON_SUCCESS,
	UPDATE_SEASON,
	UPDATE_SEASON_SUCCESS,
} from './action-types';

const { Model } = require('redux-orm');

class Season extends Model {
	static reducer({ type, payload }, Season, session) {
		switch (type) {
			case UPDATE_SEASON:
				Season.withId(payload.id).update({
					ratings_factors: payload.updates,
				});
				break;
			case FETCH_SEASON_SUCCESS:
				const { data: seasons } = payload;
				seasons.forEach((season) => Season.create(season));
				break;

			case POST_SEASON_SUCCESS:
				Season.create(payload.data);
				break;

			case DELETE_SEASON_SUCCESS:
				Season.withId(payload.id).delete();
				break;

			case UPDATE_SEASON_SUCCESS:
				Season.withId(payload.id).update(payload);
				break;
		}
	}
}

Season.modelName = 'Season';
Season.fields = {
	id: attr(),
	name: attr(),
	series: fk({
		to: 'Series',
		as: 'series',
		relatedName: 'seasons',
	}),
	ratings_factors: attr(),
};

export default Season;
