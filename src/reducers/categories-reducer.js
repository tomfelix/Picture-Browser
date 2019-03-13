const categories = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          categoryName: action.payload.categoryName,
          pictures: action.payload.pictures
        }
      ]
    default:
      return state;
  }
}

export default categories;
