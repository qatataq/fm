import React, { Component } from 'react';
import Soundcloud from 'soundcloud';

import logo from './logo.svg';
import './App.css';
import apiConfig from '../apiConfig.json';

class App extends Component {
  constructor() {
    super();
    Soundcloud.initialize(apiConfig);
    this.state = {
      playlist: [],
      loading: true,
      error: null,
    };
  }

  componentWillMount() {
    Soundcloud.resolve('https://soundcloud.com/qatataq/sets/seleqta004-maazel-qatataq-birthday')
      .then(({ id }) => Soundcloud.get(`/playlists/${id}`))
      .then(({ tracks }) => {
        this.setState({
          playlist: tracks,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to qatataq radio!</h2>
        </div>
        <p className="App-intro">
          Soon available.
        </p>
      </div>
    );
  }
}

export default App;
