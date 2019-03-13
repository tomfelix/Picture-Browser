import { combineReducers } from 'redux';
import categories from './categories-reducer';
import currentCategoryName from './current-category-reducer';
import filter from './filters-reducer';

const rootReducer = combineReducers({
  categories,
  currentCategoryName,
  filter
});

export default rootReducer;
