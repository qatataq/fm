import React, { Component } from 'react';
import Soundcloud from 'soundcloud';
import _ from 'lodash';

import logo from './logo.svg';
import Player from './Player';
import './App.css';
import apiConfig from '../apiConfig.json';

class App extends Component {
  /**
   * The constructor will init the SoundCloud library and set the initial state of the component
   */
  constructor() {
    super();
    Soundcloud.initialize(apiConfig);
    this.state = {
      playlist: [],
      loading: true,
      error: null,
  };
  }
  /**
   * When the component will mount, for a playlist url we fetch the tracks of this playlist
   */
  componentWillMount() {
    Soundcloud.resolve('https://soundcloud.com/qatataq/sets/seleqta004-maazel-qatataq-birthday')
      .then(({ id }) => Soundcloud.get(`/playlists/${id}`))
      .then(({ tracks }) => {
        this.setState({
          playlist: _.shuffle(tracks),
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
        <Player apiConfig={apiConfig} playlist={this.state.playlist}/>
      </div>
    );
  }
}

export default App;
