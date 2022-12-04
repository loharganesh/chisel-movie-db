import { attr } from 'redux-orm';

import {
	DELETE_SERIES_SUCCESS,
	FETCH_SERIES_SUCCESS,
	POST_SERIES_SUCCESS,
	UPDATE_SERIES_SUCCESS,
} from './action-types';

const { Model } = require('redux-orm');

class Series extends Model {
	static reducer({ type, payload }, Series, session) {
		switch (type) {
			case FETCH_SERIES_SUCCESS:
				payload.data.forEach((series) => Series.create(series));
				break;

			case POST_SERIES_SUCCESS:
				Series.create(payload.data);
				break;

			case DELETE_SERIES_SUCCESS:
				Series.withId(payload.id).delete();
				break;

			case UPDATE_SERIES_SUCCESS:
				Series.withId(payload.id).update(payload);
				break;
		}
	}
}

Series.modelName = 'Series';
Series.fields = {
	id: attr(),
	name: attr(),
	ratings_factors: attr(),
};

export default Series;
