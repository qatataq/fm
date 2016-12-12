import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Soundcloud from 'soundcloud';
import _ from 'lodash';

import Player from './Player';
import { Loader, Error } from './States';
import './App.css';
import apiConfig from '../apiConfig.json';

class App extends Component {
  /**
   * The constructor will init the SoundCloud library and set the initial state of the component
   */
  constructor(props) {
    super(props);
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
      <div className="app">
        <ReactCSSTransitionGroup
           transitionName="fade"
           transitionEnterTimeout={0}
           transitionLeaveTimeout={500}>
            { this.state.loading && (<Loader />)}
            { this.state.error && (<Error />)}
        </ReactCSSTransitionGroup>
        { !this.state.error && (<Player apiConfig={apiConfig} playlist={this.state.playlist}/>)}
        <footer>Project at <a href="https://github.com/qatataq/fm" target="_blank">GitHub</a>, using <span className="soundcloud-logo"></span></footer>
      </div>
    );
  }
}

export default App;