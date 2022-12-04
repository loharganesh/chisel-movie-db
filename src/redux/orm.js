import { ORM } from 'redux-orm';
import Column from './reducers/columns/model';
import Episode from './reducers/episode/model';
import Season from './reducers/seasons/model';
import Series from './reducers/series/model';

const orm = new ORM({
	stateSelector: (state) => state.orm,
});

orm.register(Series);
orm.register(Season);
orm.register(Episode);
orm.register(Column);

const session = orm.session();

export default orm;
