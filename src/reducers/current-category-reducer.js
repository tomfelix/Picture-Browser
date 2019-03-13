const currentCategoryName = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_CATEGORY':
      return action.payload.categoryName
    default:
      return state;
  }
}

export default currentCategoryName;
