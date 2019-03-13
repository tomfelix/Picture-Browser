import React, { Component } from 'react';
import SearchBar from '../containers/searchBar';
import Categories from '../containers/categories';
import ShowPictures from '../containers/showPictures';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar />
        </header>
        <section>
          <nav>
            <Categories />
          </nav>
          <article>
            <ShowPictures />
          </article>
        </section>
      </div>
    );
  }
}

export default App;
