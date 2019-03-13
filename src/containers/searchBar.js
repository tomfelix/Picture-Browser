import React, { Component } from 'react';
import '../styles/searchBar.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createCategory, showCategory } from '../actions/index';
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "appId",
  secret: "secret",
  callbackUrl: "http://localhost:3000/",
  headers: {
    "X-Custom-Header": "*"
  }
});


class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { term } = this.state;
    const { categories, createCategory, showCategory } = this.props;
    let categoriesNames = categories.map(category => {
      return category.categoryName
    });
    const whiteSpace = /^\s+$/;
    if (categoriesNames.indexOf(term.toLowerCase()) > -1) {
      alert('Category already exists!');
      this.setState({
        term: ''
      });
      return;
    } else if (term.length === 0 || whiteSpace.test(term)) {
      this.setState({
        term: ''
      });
      return;
    }

    unsplash.search.photos(term.toLowerCase(), 1, 20)
      .then(toJson)
      .then(json => {
        createCategory(term.toLowerCase(), json.results);
        showCategory(term.toLowerCase());
      })
      .catch(err => {
          console.error(err);
      });

    this.setState({
      term: ''
    });
  }

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit} className="input-group text-center">
          <input
            className="form-control rounded-right"
            value={this.state.term}
            onChange={this.handleChange}
            placeholder="Search for a photos"/>
            <button className="btn" type="submit">Search</button>
        </form>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCategory, showCategory }, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
