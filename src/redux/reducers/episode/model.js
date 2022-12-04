import { attr, fk, many } from 'redux-orm';
import {
	DELETE_EPISODE_SUCCESS,
	FETCH_EPISODES_SUCCESS,
	POST_EPISODES_SUCCESS,
	UPDATE_EPISODE_SUCCESS,
} from './action-types';

const { Model } = require('redux-orm');

class Episode extends Model {
	static reducer({ type, payload }, Episode, session) {
		switch (type) {
			case FETCH_EPISODES_SUCCESS:
				payload.data.forEach((series) => Episode.create(series));
				break;

			case POST_EPISODES_SUCCESS:
				Episode.create(payload.data);
				break;

			case DELETE_EPISODE_SUCCESS:
				Episode.withId(payload.id).delete();
				break;

			case UPDATE_EPISODE_SUCCESS:
				Episode.withId(payload.id).update(payload);
				break;
		}
	}
}

Episode.modelName = 'Episode';
Episode.fields = {
	id: attr(),
	name: attr(),
	season: fk({
		to: 'Season',
		as: 'seasons',
		relatedName: 'episodes',
	}),
	series: fk({
		to: 'Series',
		as: 'series',
		relatedName: 'episodes',
	}),
	ratings_factors: attr(),
};

export default Episode;
