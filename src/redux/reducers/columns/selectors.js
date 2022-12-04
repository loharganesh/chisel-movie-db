import { createSelector } from 'redux-orm';
import orm from '../../orm';

export const selectColumns = createSelector(orm.Column);
