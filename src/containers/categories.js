import React, { Component } from 'react';
import '../styles/categories.css';
import { connect } from 'react-redux';
import { showCategory, setFilters } from '../actions/index';
import { bindActionCreators } from 'redux';

class Categories extends Component {
  
  render() {
    const { categories, showCategory } = this.props;
    if (categories.length === 0) {
      return (
        <div>
          <p>Categories</p>
          <ul className="nav"></ul>
        </div>
      )
    }
    return (
      <div>
        <p>Categories</p>
        <ul>
          {categories.map(category => {
            return (
              <li key={categories.indexOf(category)}><a onClick={() => showCategory(category.categoryName)}>{category.categoryName}</a></li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showCategory, setFilters }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
