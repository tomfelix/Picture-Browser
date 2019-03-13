import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/showPictures.css';
import { setFilters } from '../actions/index';
import { bindActionCreators } from 'redux';

class ShowPictures extends Component {

  render() {
    const { categories, currentCategoryName, filter, setFilters } = this.props;
    if (currentCategoryName === '') {
      return (
        <div className="empty">Click on the category or look for a new one.</div>
      )
    }
    const currentCategory = categories.filter(category => {
      return category.categoryName === currentCategoryName;
    });

    const addPhotoToFavourites = (id) => {
      const photo = currentCategory[0].pictures.filter(picture => {
        return picture.id === id;
      });
      photo[0].favourite = true;
    }

    const filteredPictures = (filter) => {
      if (filter === 'created_at') {
        const filteredByCreatedAt = currentCategory[0].pictures.sort((a,b) => {
          if (a.created_at > b.created_at) {
            return -1;
          }
          if (a.created_at < b.created_at) {
            return 1;
          }
          return 0;
        });
        return filteredByCreatedAt;
      }

      if (filter === 'likes') {
        const filteredByLikes = currentCategory[0].pictures.sort((a,b) => {
          if (a.likes > b.likes) {
            return -1;
          }
          if (a.likes < b.likes) {
            return 1;
          }
          return 0;
        });
        return filteredByLikes;
      }
      if (filter === 'show_favourites') {
        const showFavourites = currentCategory[0].pictures.filter(picture => {
          return picture.favourite === true;
        });
        return showFavourites;
      }
      return currentCategory[0].pictures;
    }

    return (
      <div className="show-pictures">
        <div className="filters">
          <p onClick={() => {(filter === '' ? setFilters('show_favourites') : setFilters(''))}}>{(filter === 'show_favourites' ? 'Show All' : 'Show favourites')}</p>
          <p>Sort by:</p>
          <a onClick={() => setFilters('created_at')}>Date of create</a>
          <a onClick={() => setFilters('')}>Downloads</a>
          <a onClick={() => setFilters('likes')}>Likes</a>
        </div>
        <h1 className="title">{currentCategoryName}</h1>
        <div className="pictures">
          {filteredPictures(filter).map(picture => {
            const date = new Date(picture.created_at);
            let properDate = date.toISOString().substring(0, 10);

            return (
              <div key={picture.id} className="card">
                <img className="image" favourite="false" key={picture.id} src={picture.urls.small} alt={picture.description}></img>
                <div className="container">
                  <p>Likes: {picture.likes}</p>
                  <p>Created at: {properDate}</p>
                  <p onClick={() => addPhotoToFavourites(picture.id)}>&hearts;</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    categories: state.categories,
    currentCategoryName: state.currentCategoryName,
    filter: state.filter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilters }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPictures);
