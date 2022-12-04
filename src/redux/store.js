import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createReducer } from 'redux-orm';
import orm from './orm';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);
// middlewares.push(logger);

const reducers = combineReducers({
	orm: createReducer(orm),
});

const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(sagas);

export default store;
