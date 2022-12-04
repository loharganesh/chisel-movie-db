import { attr } from 'redux-orm';
import {
	DELETE_COLUMN_SUCCESS,
	FETCH_COLUMNS_SUCCESS,
	POST_COLUMN_SUCCESS,
	UPDATE_COLUMN_SUCCESS,
} from './action-types';

const { Model } = require('redux-orm');

class Column extends Model {
	static reducer({ type, payload }, Column, session) {
		switch (type) {
			case FETCH_COLUMNS_SUCCESS:
				payload.data.forEach((series) => Column.create(series));
				break;

			case POST_COLUMN_SUCCESS:
				Column.create(payload.data);
				break;

			case DELETE_COLUMN_SUCCESS:
				console.log(payload);
				Column.withId(payload).delete();
				break;

			case UPDATE_COLUMN_SUCCESS:
				Column.withId(payload.id).update(payload);
				break;
		}
	}
}

Column.modelName = 'Column';
Column.fields = {
	id: attr(),
	name: attr(),
};

export default Column;
