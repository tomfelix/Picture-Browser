const ADD_CATEGORY = 'ADD_CATEGORY';
const SHOW_CATEGORY = 'SHOW_CATEGORY';
const SET_FILTER = 'SET_FILTER';

export const createCategory = (categoryName, pictures) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      categoryName,
      pictures
    }
  }
}

export const showCategory = (categoryName) => {
  return {
    type: SHOW_CATEGORY,
    payload: {
      categoryName
    }
  }
}

export const setFilters = (filter) => {
  return {
    type: SET_FILTER,
    filter
  }
}
