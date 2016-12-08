import React, { Component } from 'react';
import Soundcloud from 'soundcloud';

import logo from './logo.svg';
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
          error: false
      }
  }
  /**
   * When the component will mount, for a playlist url we fetch the tracks of this playlist
   */
  componentWillMount() {
      Soundcloud.resolve('https://soundcloud.com/qatataq/sets/seleqta004-maazel-qatataq-birthday')
        .then(response => Soundcloud.get(`/playlists/${response.id}`))
        .then(response => {
            this.setState({
                playlist: response.tracks,
                loading: false
            });
        })
        .catch(error => {
            this.setState({
                loading: false,
                error: true
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
